# Generated by Django 3.1.3 on 2021-02-03 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='mention',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
