from django.urls import path

from . import views


urlpatterns = [
    path('', views.SceneList.as_view()),
]
