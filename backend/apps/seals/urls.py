from django.urls import path

from . import views


urlpatterns = [
    path('', views.SealList.as_view()),
    path('<int:pk>/', views.SealDetail.as_view()),
]
