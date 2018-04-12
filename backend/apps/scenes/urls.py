from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListScene.as_view()),
    path('<int:pk>/', views.DetailScene.as_view()),
]
