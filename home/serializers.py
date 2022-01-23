from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from .models import Task

class Taskserializers(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'