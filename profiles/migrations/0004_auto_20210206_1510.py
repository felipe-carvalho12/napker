# Generated by Django 3.1.3 on 2021-02-06 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_auto_20210206_1421'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interestset',
            name='interests',
            field=models.ManyToManyField(related_name='interest_sets', to='profiles.Interest'),
        ),
    ]
