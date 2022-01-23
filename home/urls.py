from django.urls import path,include
from . import views
urlpatterns = [
    path('',views.home),
    path('get-data/',views.getdata),
    path('create-data/',views.createdata),
    path('update-data/<str:pk>/',views.updatedata),
    path('delete-data/<str:pk>/',views.deletedata),
    path('api/',views.api),
    path('api-auth/', include('rest_framework.urls')),
]
