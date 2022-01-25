from django.db import models

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField(null=True)
    desc = models.TextField(null=True)
    status = models.BooleanField(null=True)

   

    