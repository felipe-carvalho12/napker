import datetime
import numpy as np
from .models import *
from profiles.utils import *


def get_post_relevance(profile, post, authors_relevance):
    author_points = authors_relevance[[author_relevance[0] for author_relevance in authors_relevance].index(post.author)][1]

    views_authors = post.views.exclude(user=profile.user)
    likes_authors = np.array([like.profile for like in post.all_likes().all()])

    author_relevance_matrix = process_authors_relevance(profile, views_authors)

    likes_points = np.array([
        author_relevance[1] if author_relevance[0] in likes_authors else -author_relevance[1] for author_relevance in author_relevance_matrix
    ])

    likes_points = sum(likes_points)

    post_relevance_array = np.array([author_points, likes_points])

    return post_relevance_array


def process_posts_relevance(profile):
    AUTHOR_WEIGHT = 0.5
    LIKES_WEIGHT = 0.5

    posts = Post.objects.all()

    WEIGHTS = [AUTHOR_WEIGHT, LIKES_WEIGHT]

    authors_relevance = process_authors_relevance(profile, [post.author for post in posts])
    
    post_relevance = np.array([get_post_relevance(profile, post, authors_relevance) for post in posts])
    print(post_relevance)

    minimum = min(post_relevance.T[1])
    post_relevance.T[1] + minimum

    print(post_relevance)

    for i, column in enumerate(post_relevance.T):
        maximum = max(column)
        post_relevance.T[i] = np.array([WEIGHTS[i] * (point / maximum if maximum else 1) for point in column])

    post_relevance_list = []
    
    for element in authors_relevance.T[1]:
        i, j = np.where(authors_relevance.T, element)
        post_relevance_list.append(
            authors_relevance[i][j] +
            post_relevance[j]
        )

    post_relevance_list = list(zip(posts, post_relevance_list))

    return post_relevance_list


def sort_posts_by_relevance(profile):
    posts_relevance = process_posts_relevance(profile)

    posts_by_relevance = [post_relevance[0] for post_relevance in sorted(posts_relevance, key=lambda p: p[1])]
    posts_by_relevance.reverse()

    return posts_by_relevance