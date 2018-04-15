from django.urls import path

from . import views


urlpatterns = [
    path('', views.PeriodList.as_view()),
]
