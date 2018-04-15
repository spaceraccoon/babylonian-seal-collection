from django.urls import path

from . import views


urlpatterns = [
    path('', views.PublicationList.as_view()),
]
