import datetime
from .models import *
import numpy as np

def get_author_relevance(profile, author):
    interest_points = 0
    age_points = 0
    friends_points = 0
    is_friend_boolean = 0

    if author.user in Invitation.objects.friends(profile): is_friend_boolean = 1

    try:
        age_points = datetime.date(2200, 1, 1).toordinal() - abs(datetime.date.toordinal(profile.birth_date) - datetime.date.toordinal(author.birth_date))
    except:
        age_points = 0

    friends_points = len(set(Invitation.objects.friends(profile)).intersection(Invitation.objects.friends(author)))

    if not author == profile: interest_points = len(set(profile.interest_set.interests.all()).intersection(author.interest_set.interests.all()))
    else: interest_points = 0.5

    return np.array([interest_points, age_points, friends_points, is_friend_boolean])


def process_authors_relevance(profile, authors):
    authors_relevance = np.vstack(tuple(get_author_relevance(profile, author) for author in authors))
    authors_relevance = np.array([np.true_divide(authors_relevance.T[i], np.amax(column) if np.amax(column) else 1) for i, column in enumerate(authors_relevance.T)])

    return authors_relevance

    
def get_profile_list(profile):
    profiles = []

    for p in Profile.objects.exclude(user=profile.user):
        if not p.user.is_active: continue
        if p in profile.blocked_profiles: continue
        if p in Invitation.objects.friends(profile): continue
        if profile in p.blocked_profiles: continue
        if p.id in [i.details.receiver for i in Invitation.objects.invitations_sent(profile)]: continue
        if p in [i.details.sender for i in Invitation.objects.invitations_received(profile)]: continue
        profiles.append(p)

    points = process_authors_relevance(profile, profiles)
    profiles = [(profile, sum(points[i])) for i, profile in enumerate(profiles)]

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