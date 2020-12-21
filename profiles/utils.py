import datetime
from .models import *

def get_author_relevance(profile, author):
    interest_points = 0
    age_points = 0
    friends_points = 0
    is_friend_boolean = 0

    if author.user in profile.friends.all(): is_friend_boolean = 1

    age_points = abs(datetime.date.toordinal(profile.birth_date) - datetime.date.toordinal(author.birth_date))

    friends_points = len(set(profile.friends.all()).intersection(author.friends.all()))

    if not author == profile: interest_points = len(set([i.title for i in profile.interests.all()]).intersection([i.title for i in author.interests.all()])) 
    else: interest_points = 0.5

    author_relevance_dict = {
        "interest_points" : interest_points,
        "age_points" : age_points,
        "friends_points" : friends_points,
        "is_friend_boolean" : is_friend_boolean,
    }

    return author_relevance_dict


def process_authors_relevance(profile, authors, friends=True):
    if profile.post_weights is not None:
        INTERST_WEIGHT = profile.post_weights.interest
        AGE_WEIGHT = profile.post_weights.age
        FRIENDS_WEIGHT = profile.post_weights.friends if friends else 0
        IS_FRIEND_WEIGHT = profile.post_weights.is_friend if friends else 0
    else:
        INTERST_WEIGHT = 0.25
        AGE_WEIGHT = 0.25
        FRIENDS_WEIGHT = 0.25 if friends else 0
        IS_FRIEND_WEIGHT = 0.25 if friends else 0

    author_relevance_lists = {
        "interest_list" : ([], INTERST_WEIGHT),
        "age_list" : ([], AGE_WEIGHT),
        "friends_list" : ([], FRIENDS_WEIGHT),
        "is_friend_list" : ([], IS_FRIEND_WEIGHT),
    }

    for author in authors:
        data = get_author_relevance(profile, author)
        author_relevance_lists["interest_list"][0].append(data["interest_points"])
        author_relevance_lists["age_list"][0].append(data["age_points"])
        author_relevance_lists["friends_list"][0].append(data["friends_points"])
        author_relevance_lists["is_friend_list"][0].append(data["is_friend_boolean"])

    for key in author_relevance_lists:
        points_sum = sum(author_relevance_lists[key][0]) if sum(author_relevance_lists[key][0]) else 0
        maximum = max(author_relevance_lists[key][0]) if len(author_relevance_lists[key][0]) and points_sum else 1
        author_relevance_lists[key] = [author_relevance_lists[key][1] * (point / maximum) for point in author_relevance_lists[key][0]]
        if key == "age_list":
            author_relevance_lists[key] = [1 - value for value in author_relevance_lists[key]]

    authors_relevance_list = []

    for element in author_relevance_lists["interest_list"]:
        i = author_relevance_lists["interest_list"].index(element)
        authors_relevance_list.append(
            author_relevance_lists["interest_list"][i] +
            author_relevance_lists["age_list"][i] +
            author_relevance_lists["friends_list"][i] +
            author_relevance_lists["is_friend_list"][i]
        )

    authors_relevance_list = list(zip(authors, authors_relevance_list))

    return authors_relevance_list

    
def get_profile_list(profile):

    profiles = process_authors_relevance(profile, Profile.objects.all(), friends=False)
    interest_profile_dict = {}
    for i_quantity in set([item[1] for item in profiles]):
        interest_profile_dict[i_quantity] = [p[0] for p in profiles if p[1] == i_quantity]
    for key in interest_profile_dict:
        interest_profile_dict[key] = sorted(
            interest_profile_dict[key],
            key=lambda p: abs(datetime.date.toordinal(profile.birth_date) - datetime.date.toordinal(p.birth_date))
        )
    profiles.clear()
    for key in interest_profile_dict:
        profile_list = interest_profile_dict[key]
        profile_list.reverse()
        profiles.extend(profile_list)
    profiles.reverse()

    return profiles