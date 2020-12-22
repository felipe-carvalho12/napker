import datetime
from .models import *
import numpy as np

def get_author_relevance(profile, author):
    interest_points = 0
    age_points = 0
    friends_points = 0
    is_friend_boolean = 0

    if author.user in profile.friends.all(): is_friend_boolean = 1

    age_points = datetime.date.toordinal(year = 100) - abs(datetime.date.toordinal(profile.birth_date) - datetime.date.toordinal(author.birth_date))

    friends_points = len(set(profile.friends.all()).intersection(author.friends.all()))

    if not author == profile: interest_points = len(set([i.title for i in profile.interests.all()]).intersection([i.title for i in author.interests.all()])) 
    else: interest_points = 0.5

    return np.array([interest_points, age_points, friends_points, is_friend_boolean])


def process_authors_relevance(profile, authors):
    if profile.post_weights is not None:
        raw_weights = np.array([profile.post_weights.interest, profile.post_weights.age, profile.post_weights.friends, profile.post_weights.is_friend])
    else:
        raw_weights = np.array([0.25, 0.25, 0.25, 0.25])

    WEIGHTS = raw_weights / np.sum(raw_weights)

    authors_relevance = np.vstack(tuple(get_author_relevance(profile, author) for author in authors))

    print(authors_relevance)

    authors_relevance = np.sum(np.array([np.true_divide(authors_relevance.T[i], (np.amax(column) if np.amax(column) else 1) / WEIGHTS[i]) for i, column in enumerate(authors_relevance.T)]), axis=0)

    print(authors_relevance)
    
    authors_relevance_list = list(zip(authors, authors_relevance))

    return authors_relevance_list

    
def get_profile_list(profile):
    profiles = []

    for p in Profile.objects.exclude(user=profile.user):
        '''
        if p.user in profile.blocked_users.all(): continue
        if p.user in profile.friends.all(): continue
        if profile.user in p.blocked_users.all(): continue
        if p in [i.receiver for i in Relationship.objects.invitations_sent(profile)]: continue
        if p in [i.sender for i in Relationship.objects.invitations_received(profile)]: continue
        '''
        profiles.append(p)

    profiles = process_authors_relevance(profile, profiles)

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