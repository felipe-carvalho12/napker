import datetime
import numpy as np
from .models import *
from profiles.utils import *


def get_post_relevance(profile, post):
    likes_authors = [like.profile for like in post.details.likes.all()]

    if len(likes_authors):
        author_points = process_authors_relevance(profile, likes_authors)
        return np.mean(author_points) + 0.5
    return 0


def process_posts_relevance(profile, posts):
    authors = [post.details.author for post in posts]

    authors_relevance = process_authors_relevance(profile, authors)
    like_points = np.array([get_post_relevance(profile, post) for post in posts])
    like_points = like_points / np.amax(like_points)

    posts_relevance = np.vstack((like_points, authors_relevance))

    posts_relevance = list(zip(posts, posts_relevance))

    return posts_relevance


def sort_posts_by_relevance(profile, posts=None):
    posts_relevance = process_posts_relevance(profile, posts if posts is not None else Post.objects.all())

    posts_by_relevance = [post_relevance[0] for post_relevance in sorted(posts_relevance, key=lambda p: p[1][0] + p[1][1])]
    posts_by_relevance.reverse()

    return posts_by_relevance
        
