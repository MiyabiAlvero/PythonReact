# Generated by Django 4.2.11 on 2024-07-08 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_students_age_remove_students_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='students',
            name='birthday',
            field=models.DateField(),
        ),
    ]
