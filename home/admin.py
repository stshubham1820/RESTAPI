from django.contrib import admin
from .models import *
# Register your models here.
class task(admin.ModelAdmin):
    list_display = ('name','date','desc','status')
    def __str__(self) -> str:
        return self.name
admin.site.register(Task,task)