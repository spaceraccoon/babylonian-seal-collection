from django.urls import path

from . import views


urlpatterns = [
    path('', views.IconographicElementList.as_view()),
]
