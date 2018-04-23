from django.urls import path

from . import views


urlpatterns = [
    path('', views.HistoricalPersonList.as_view()),
]
