from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListSeal.as_view()),
    path('<int:pk>/', views.DetailSeal.as_view()),
]
