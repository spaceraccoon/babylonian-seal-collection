from django.urls import path

from . import views


urlpatterns = [
    path('', views.ArtStyleList.as_view()),
]
