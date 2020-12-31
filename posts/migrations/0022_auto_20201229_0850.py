# Generated by Django 3.1.3 on 2020-12-29 11:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0024_auto_20201229_0801'),
        ('posts', '0021_auto_20201109_2157'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-created']},
        ),
        migrations.AddField(
            model_name='post',
            name='views',
            field=models.ManyToManyField(related_name='post_views', to='profiles.Profile'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='post/'),
        ),
        migrations.CreateModel(
            name='Hashtag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('posts', models.ManyToManyField(related_name='hashtags', to='posts.Post')),
            ],
        ),
    ]
