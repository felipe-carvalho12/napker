# Generated by Django 3.1.3 on 2021-01-07 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0028_auto_20210106_0703'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='video',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
