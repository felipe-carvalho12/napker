# Generated by Django 3.1.3 on 2020-12-05 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0019_auto_20201204_2233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='photo',
            field=models.ImageField(default='profile_avatar.jpeg', upload_to='profile/'),
        ),
    ]
