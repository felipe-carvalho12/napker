# Generated by Django 3.1.3 on 2020-12-30 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0022_auto_20201229_0850'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='layer',
            field=models.IntegerField(default=0),
        ),
    ]
