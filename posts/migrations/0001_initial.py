# Generated by Django 3.1.3 on 2021-01-26 04:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hashtag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visualized', models.BooleanField(default=False)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('profile', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='profiles.profile')),
            ],
            options={
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='PublicationDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('layer', models.IntegerField(default=0)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='publications', to='profiles.profile')),
                ('likes', models.ManyToManyField(blank=True, related_name='publication', to='posts.Like')),
                ('views', models.ManyToManyField(related_name='post_views', to='profiles.Profile')),
            ],
            options={
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(max_length=100000)),
                ('image', models.ImageField(blank=True, null=True, upload_to='post/')),
                ('video', models.CharField(blank=True, max_length=1000, null=True)),
                ('details', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='post', to='posts.publicationdetails')),
                ('hashtags', models.ManyToManyField(blank=True, related_name='posts', to='posts.Hashtag')),
                ('interest_set', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='posts', to='profiles.interestset')),
                ('tagged_users', models.ManyToManyField(blank=True, related_name='post_mentions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notifications_number', models.IntegerField(default=0)),
                ('publication', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='notification', to='posts.publicationdetails')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(max_length=100000)),
                ('visualized', models.BooleanField(default=False)),
                ('details', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='posts.publicationdetails')),
                ('hashtags', models.ManyToManyField(blank=True, related_name='comments', to='posts.Hashtag')),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='posts.publicationdetails')),
                ('tagged_users', models.ManyToManyField(blank=True, related_name='comment_mentions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
