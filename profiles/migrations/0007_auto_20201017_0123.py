# Generated by Django 3.1.1 on 2020-10-17 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0006_profile_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relationship',
            name='status',
            field=models.CharField(choices=[('sent', 'sent'), ('accepted', 'accepted')], max_length=8),
        ),
    ]
