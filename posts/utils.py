import datetime
import numpy as np
from .models import *
from profiles.utils import *


def get_post_relevance(profile, post, authors_relevance):
    author_points = np.array(authors_relevance[[author_relevance[0] for author_relevance in authors_relevance].index(post.author)][1])

    views_authors = list(post.views.exclude(user=profile.user))
    likes_authors = list([like.profile for like in post.all_likes().all()])

    likes_points = np.array([
        (author_relevance[1] if author_relevance[0] in likes_authors else -author_relevance[1]) for author_relevance in authors_relevance
    ])

    likes_points = sum(likes_points)

    print(likes_points)
    print(author_points)

    post_relevance_array = np.array([author_points, likes_points])
    
    print(author_points)

    return post_relevance_array


def process_posts_relevance(profile):
    AUTHOR_WEIGHT = 0.5
    LIKES_WEIGHT = 0.5

    posts = Post.objects.all()

    WEIGHTS = [AUTHOR_WEIGHT, LIKES_WEIGHT]

    authors_relevance = np.array(process_authors_relevance(profile, [post.author for post in posts]))
    
    post_relevance = np.array([get_post_relevance(profile, post, authors_relevance) for post in posts])

    minimum = min(post_relevance.T[1])
    post_relevance.T[1] + minimum

    post_relevance = np.sum(np.array([np.true_divide(column, (np.amax(column) if np.amax(column) else 1) / WEIGHTS[i]) for i, column in enumerate(authors_relevance.T)]), axis=0)

    post_relevance = list(zip(posts, post_relevance))

    return post_relevance


def sort_posts_by_relevance(profile):
    posts_relevance = process_posts_relevance(profile)

    posts_by_relevance = [post_relevance[0] for post_relevance in sorted(posts_relevance, key=lambda p: p[1])]
    posts_by_relevance.reverse()

    return posts_by_relevance