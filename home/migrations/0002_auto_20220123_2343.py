# Generated by Django 3.2.9 on 2022-01-23 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='date',
            field=models.DateField(default='Null', null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='desc',
            field=models.TextField(default='Null', null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.BooleanField(default='Null', null=True),
        ),
    ]
