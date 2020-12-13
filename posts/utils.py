import datetime
from .models import Post

def get_author_relevance(profile, author):
    interest_points = 0
    age_points = 0
    friends_points = 0
    is_friend_boolean = 0

    if author.user in profile.friends.all(): is_friend_boolean = 1

    age_points = abs(datetime.date.toordinal(profile.birth_date) - datetime.date.toordinal(author.birth_date))

    friends_points = len(set(profile.friends.all()).intersection(author.friends.all()))

    if not author == profile: interest_points = len(set(profile.interests.all()).intersection(author.interests.all())) 
    else: interest_points = 0.5

    author_relevance_dict = {
        "interest_points" : interest_points,
        "age_points" : age_points,
        "friends_points" : friends_points,
        "is_friend_boolean" : is_friend_boolean,
    }

    return author_relevance_dict


def process_author_relevance(profile, authors):
    INTERST_WEIGHT = 0.25
    AGE_WEIGHT = 0.25
    FRIENDS_WEIGHT = 0.25
    IS_FRIEND_WEIGHT = 0.25

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
        maximum = max(author_relevance_lists[key][0])
        author_relevance_lists[key] = [author_relevance_lists[key][1] * (point / maximum) for point in author_relevance_lists[key][0]]
        if key == "age_list":
            author_relevance_lists[key].reverse

    author_relevance_list = []

    for element in author_relevance_lists["interest_list"]:
        i = author_relevance_lists["interest_list"].index(element)
        author_relevance_list.append(
            author_relevance_lists["interest_list"][i] +
            author_relevance_lists["age_list"][i] +
            author_relevance_lists["friends_list"][i] +
            author_relevance_lists["is_friend_list"][i]
        )

    author_relevance_list = list(zip(authors, author_relevance_list))

    return author_relevance_list


def process_post_relevance(profile):
    authors = [post.author for post in Post.objects.all()]

    author_relevance_list = process_author_relevance(profile, authors)

    posts_by_relevance = []

    for post in Post.objects.all():
        points = [item[1] for item in author_relevance_list if post.author in item]
        posts_by_relevance.append((post,points))

    posts_by_relevance = [item[0] for item in sorted(posts_by_relevance, key=lambda p: p[1])]
    posts_by_relevance.reverse()

    return posts_by_relevance