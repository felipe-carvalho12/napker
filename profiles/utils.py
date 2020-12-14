import datetime
from .models import *

def get_profile_list(profile):
    profiles = []
    shared_interests_quantity = []
    for interest in profile.interests.all():
        for p in Profile.objects.filter(interests__title__contains=interest.title).exclude(user=profile.user):
            if p in profiles:
                shared_interests_quantity[profiles.index(p)] += 1
                continue
            if p.user in profile.friends.all():
                continue
            if p.user in profile.blocked_users.all():
                continue
            if profile.user in p.blocked_users.all():
                continue
            if p in [i.receiver for i in Relationship.objects.invitations_sent(profile)]:
                continue
            if p in [i.sender for i in Relationship.objects.invitations_received(profile)]:
                continue
            profiles.append(p)
            shared_interests_quantity.append(1)
    if len(profiles):
        profiles = list(zip(profiles, shared_interests_quantity))
        interest_profile_dict = {}
        for i_quantity in set(shared_interests_quantity):
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
    else:
        for p in Profile.objects.all().exclude(user=profile.user):
            if p.user in profile.friends.all():
                continue
            if p.user in profile.blocked_users.all():
                continue
            if profile.user in p.blocked_users.all():
                continue
            if p in [i.receiver for i in Relationship.objects.invitations_sent(profile)]:
                continue
            if p in [i.sender for i in Relationship.objects.invitations_received(profile)]:
                continue
            profiles.append(p)
        random.shuffle(profiles)
    return profiles
