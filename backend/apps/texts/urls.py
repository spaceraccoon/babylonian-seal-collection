from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListText.as_view()),
    path('<int:pk>/', views.DetailText.as_view()),
]
