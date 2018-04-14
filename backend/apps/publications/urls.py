from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListPublication.as_view()),
    path('<int:pk>/', views.DetailPublication.as_view()),
]
