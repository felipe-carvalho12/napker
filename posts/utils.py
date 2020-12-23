import datetime
import numpy as np
from .models import *
from profiles.utils import *


def get_post_relevance(profile, post):

    views_authors = process_authors_relevance(profile, post.views.exclude(user=profile.user).all() if len(post.views.exclude(user=profile.user).all()) else [profile])

    likes_authors = [like.profile for like in post.all_likes().all()]

    likes_points = np.array([
        (author_relevance[1] if author_relevance[0] in likes_authors else -author_relevance[1]) for author_relevance in views_authors
    ])

    likes_points = sum(likes_points)

    return likes_points


def process_posts_relevance(profile):
    AUTHOR_WEIGHT = 0.5
    LIKES_WEIGHT = 0.5

    posts = Post.objects.all()

    WEIGHTS = [AUTHOR_WEIGHT, LIKES_WEIGHT]

    authors = [post.author for post in posts]

    authors_relevance = np.array([lekinho[1] for lekinho in process_authors_relevance(profile, authors)])

    like_points = np.array([get_post_relevance(profile, post) for post in posts])

    minimum = np.amin(like_points)

    like_points += minimum

    post_relevance = np.array([authors_relevance, like_points])

    post_relevance = np.sum(np.array([np.true_divide(column, (np.amax(column) if np.amax(column) else 1) / WEIGHTS[i]) for i, column in enumerate(post_relevance)]), axis=0)

    post_relevance = list(zip(posts, post_relevance))

    return post_relevance


def sort_posts_by_relevance(profile):
    posts_relevance = process_posts_relevance(profile)

    posts_by_relevance = [post_relevance[0] for post_relevance in sorted(posts_relevance, key=lambda p: p[1])]
    posts_by_relevance.reverse()

    return posts_by_relevance