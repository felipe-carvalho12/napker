# Generated by Django 3.1.3 on 2021-02-03 18:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0002_auto_20210126_1125'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(max_length=100000)),
                ('visualized', models.BooleanField(default=False)),
            ],
        ),
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
            name='NotificationDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notifications_number', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(max_length=100000)),
                ('image', models.ImageField(blank=True, null=True, upload_to='post/')),
                ('video', models.CharField(blank=True, max_length=1000, null=True)),
            ],
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
            name='PostNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('details', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='post_notification', to='posts.notificationdetails')),
                ('post', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='notification', to='posts.post')),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='details',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='post', to='posts.publicationdetails'),
        ),
        migrations.AddField(
            model_name='post',
            name='hashtags',
            field=models.ManyToManyField(blank=True, related_name='posts', to='posts.Hashtag'),
        ),
        migrations.AddField(
            model_name='post',
            name='interest_set',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='posts', to='profiles.interestset'),
        ),
        migrations.CreateModel(
            name='Mention',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visualized', models.BooleanField(default=False)),
                ('publication', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mentions', to='posts.publicationdetails')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mentions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CommentNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='notification', to='posts.comment')),
                ('details', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='comment_notification', to='posts.notificationdetails')),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='details',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='posts.publicationdetails'),
        ),
        migrations.AddField(
            model_name='comment',
            name='hashtags',
            field=models.ManyToManyField(blank=True, related_name='comments', to='posts.Hashtag'),
        ),
        migrations.AddField(
            model_name='comment',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='posts.publicationdetails'),
        ),
    ]
