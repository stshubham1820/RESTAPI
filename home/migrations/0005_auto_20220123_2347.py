# Generated by Django 3.2.9 on 2022-01-23 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_alter_task_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='desc',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.BooleanField(null=True),
        ),
    ]
