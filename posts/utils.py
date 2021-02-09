import datetime
import numpy as np
from .models import *
from profiles.utils import *


def process_posts_relevance(profile, posts):
    authors = [post.details.author for post in posts]

    authors_relevance = process_authors_relevance(profile, authors)
    date_points = np.array([datetime.date.toordinal(post.details.created) for post in posts])
    date_points = np.true_divide(date_points, np.amax(date_points))
    like_points = np.array([len(post.details.likes_profile_id) for post in posts])
    like_points = np.true_divide(like_points, np.amax(like_points))

    posts_relevance = np.vstack(tuple([authors_relevance, like_points, date_points])).T

    return posts_relevance


def get_weighted_points(profile, data):
    print(data)
    if profile.weights is not None:
        data[0][0] *= profile.weights.profile.interest_weight
        data[0][1] *= profile.weights.profile.age_weight
        data[0][2] *= profile.weights.profile.friends_weight
        data[0][3] *= profile.weights.profile.is_friend_weight

        data[0] = np.sum(data[0]) * profile.weights.post.author_weight
        data[1] *= profile.weights.post.likes_weight
        data[2] *= profile.weights.post.date_weight
    else:
        data[0] *= 1/4

        data[0] = np.sum(data[0]) * 1/3
        data[1] *= 1/3
        data[2] *= 1/3

    data = np.sum(data)
    return data


def sort_posts_by_relevance(profile, posts=None):
    posts_id = [post.details.id for post in (posts if posts is not None else Post.objects.all())]

    posts_relevance = process_posts_relevance(profile, posts if posts is not None else Post.objects.all())
    posts_relevance = np.concatenate((np.array([posts_id]), posts_relevance.T), axis=0).T
    print(posts_relevance)
    posts_relevance = sorted(posts_relevance, key=lambda data: get_weighted_points(profile, data[1:]), reverse=True)
    print(posts_relevance)

    return posts_relevance
        