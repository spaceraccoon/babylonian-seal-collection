from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListArtStyle.as_view()),
    path('<int:pk>/', views.DetailArtStyle.as_view()),
]
