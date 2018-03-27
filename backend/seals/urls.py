from django.urls import path

from . import views

urlpatterns = [
    path('seal/', views.ListSeal.as_view()),
    path('seal/<int:pk>/', views.DetailSeal.as_view()),
]