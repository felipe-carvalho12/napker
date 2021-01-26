import datetime
import numpy as np
from .models import *
from profiles.utils import *


def get_post_relevance(profile, post):
    authors = post.views.exclude(user=profile.user).all() if len(post.views.exclude(user=profile.user).all()) else [profile]
    points = []

    author_points = process_authors_relevance(profile, authors)

    likes_authors = [like.profile for like in post.all_likes().all()]

    for i, author in enumerate(authors):
        if author in likes_authors:
            points.append(author_points[i])
        else:
            points.append(-author_points[i])

    return np.mean(points) + 0.5


def process_posts_relevance(profile, posts):
    if profile.weights is not None:
        raw_weights = np.array([profile.weights.post.details.author_weight, profile.weights.post.likes_weight])
    else:
        raw_weights = np.array([0.5, 0.5])

    WEIGHTS = raw_weights / np.sum(raw_weights)

    authors = [post.details.author for post in posts]

    authors_relevance = process_authors_relevance(profile, authors) * WEIGHTS[0]

    like_points = np.array([get_post_relevance(profile, post) for post in posts])
    like_points = (like_points + abs(np.amin(like_points))) * WEIGHTS[1]
    like_points = like_points / np.amax(like_points)

    post_relevance = np.sum(np.vstack(tuple([like_points, authors_relevance])), axis=0)

    post_relevance = list(zip(posts, post_relevance))

    return post_relevance


def sort_posts_by_relevance(profile, posts=None):
    try:
        posts_relevance = process_posts_relevance(profile, posts if posts is not None else Post.objects.all())

        posts_by_relevance = [post_relevance[0] for post_relevance in sorted(posts_relevance, key=lambda p: p[1])]
        posts_by_relevance.reverse()

        return posts_by_relevance
    except:
        return []