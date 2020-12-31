# Generated by Django 3.1.3 on 2020-12-30 19:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0023_comment_layer'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentRelationship',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comment_relationship', to='posts.comment')),
                ('parent_comment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='parent_comment_relationship', to='posts.comment')),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='comments',
            field=models.ManyToManyField(blank=True, related_name='_comment_comments_+', through='posts.CommentRelationship', to='posts.Comment'),
        ),
    ]
