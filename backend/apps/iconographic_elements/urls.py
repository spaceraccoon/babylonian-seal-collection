from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListIconographicElement.as_view()),
    path('<int:pk>/', views.DetailIconographicElement.as_view()),
]
