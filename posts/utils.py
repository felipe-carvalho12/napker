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


def process_authors_relevance(profile, authors):
    if profile.post_weights is not None:
        INTERST_WEIGHT = profile.post_weights.interest
        AGE_WEIGHT = profile.post_weights.age
        FRIENDS_WEIGHT = profile.post_weights.friends
        IS_FRIEND_WEIGHT = profile.post_weights.is_friend
    else:
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


def get_post_relevance(profile, post, authors_relevance):
    author_points = authors_relevance[[author_relevance[0] for author_relevance in authors_relevance].index(post.author)][1]

    views_authors = post.views.exclude(user=profile.user)
    likes_authors = [like.profile for like in post.all_likes().all()]

    likes_points = [
        author_relevance[1] if author_relevance[0] in likes_authors else -author_relevance[1] for author_relevance in process_authors_relevance(profile, views_authors)
    ]

    likes_points = sum(likes_points)

    post_relevance_dict = {
        "author_points" : author_points,
        "likes_points" : likes_points,
    }

    return post_relevance_dict


def process_posts_relevance(profile):
    AUTHOR_WEIGHT = 0.5
    LIKES_WEIGHT = 0.5

    posts = Post.objects.all()
    post_relevance_lists = {
        "author_list" : ([], AUTHOR_WEIGHT),
        "likes_list" : ([], LIKES_WEIGHT),
    }

    authors_relevance = process_authors_relevance(profile, [post.author for post in posts])
    
    for post in posts:
        data = get_post_relevance(profile, post, authors_relevance)
        post_relevance_lists["author_list"][0].append(data["author_points"])
        post_relevance_lists["likes_list"][0].append(data["likes_points"])
    
    for key in post_relevance_lists:
        if key == 'likes_list':
            minimun = min(post_relevance_lists[key][0])
            for (i, value) in enumerate(post_relevance_lists[key][0]):
                post_relevance_lists[key][0][i] += abs(minimun)
        maximum = max(post_relevance_lists[key][0]) if len(post_relevance_lists[key][0]) else 1
        post_relevance_lists[key] = [post_relevance_lists[key][1] * (point / maximum if maximum else 1) for point in post_relevance_lists[key][0]]
        post_relevance_lists[key][0]

    post_relevance_list = []
    
    for element in post_relevance_lists["author_list"]:
        i = post_relevance_lists["author_list"].index(element)
        post_relevance_list.append(
            post_relevance_lists["author_list"][i] +
            post_relevance_lists["likes_list"][i]
        )

    post_relevance_list = list(zip(posts, post_relevance_list))

    return post_relevance_list


def sort_posts_by_relevance(profile):
    posts_relevance = process_posts_relevance(profile)

    posts_by_relevance = [post_relevance[0] for post_relevance in sorted(posts_relevance, key=lambda p: p[1])]
    posts_by_relevance.reverse()

    return posts_by_relevance
