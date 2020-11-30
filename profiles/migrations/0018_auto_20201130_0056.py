# Generated by Django 3.1.1 on 2020-11-30 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0017_auto_20201113_0658'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.TextField(default='Sem bio...', max_length=100),
        ),
        migrations.AlterField(
            model_name='profile',
            name='photo',
            field=models.ImageField(default='avatar.png', upload_to='profile/'),
        ),
    ]
