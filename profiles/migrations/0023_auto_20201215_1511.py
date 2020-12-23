# Generated by Django 3.1.3 on 2020-12-15 18:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0022_auto_20201215_0339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='post_weights',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='profiles', to='profiles.postweights'),
        ),
    ]
