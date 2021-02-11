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
    if profile.weights is not None:
        profile_weights_obj = profile.weights.profile
        profile_weights = [
            profile_weights_obj.interest_weight,
            profile_weights_obj.age_weight,
            profile_weights_obj.friends_weight,
            profile_weights_obj.is_friend_weight
        ]
        response = np.array(
            np.sum([
                np.sum([x * profile_weights[i] for i, x in enumerate(data[0:4])]) * profile.weights.post.author_weight,
                data[4] * profile.weights.post.date_weight,
                data[5] * profile.weights.post.likes_weight
            ])
        )
    else:
        response = np.sum([np.sum(data[0:4]) /4, data[4], data[5]]) / 3

    return response


def sort_posts_by_relevance(profile, posts=None):
    posts_id = [post.details.id for post in (posts if posts is not None else Post.objects.all())]

    posts_relevance = process_posts_relevance(profile, posts if posts is not None else Post.objects.all())
    posts_relevance = np.concatenate((np.array([posts_id]), posts_relevance.T), axis=0).T
    posts_relevance = sorted(posts_relevance, key=lambda data: get_weighted_points(profile, data[1:]), reverse=True)

    return posts_relevance
        