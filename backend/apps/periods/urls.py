from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListPeriod.as_view()),
    path('<int:pk>/', views.DetailPeriod.as_view()),
]
