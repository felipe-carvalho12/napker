# Generated by Django 3.1.3 on 2020-12-15 06:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0020_auto_20201204_2301'),
    ]

    operations = [
        migrations.CreateModel(
            name='PostWeights',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interest_weight', models.FloatField()),
                ('age_weight', models.FloatField()),
                ('friends_weight', models.FloatField()),
                ('is_friend_weight', models.FloatField()),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='post_weights',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='profiles', to='profiles.postweights'),
        ),
    ]
