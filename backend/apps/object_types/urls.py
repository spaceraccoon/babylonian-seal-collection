from django.urls import path

from . import views


urlpatterns = [
    path('', views.ObjectTypeList.as_view()),
]
