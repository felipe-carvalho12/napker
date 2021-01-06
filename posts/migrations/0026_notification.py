# Generated by Django 3.1.3 on 2021-01-05 14:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0025_auto_20210105_0901'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comments', models.ManyToManyField(to='posts.Comment')),
                ('likes', models.ManyToManyField(to='posts.PostLike')),
                ('post', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='notification', to='posts.post')),
            ],
        ),
    ]
