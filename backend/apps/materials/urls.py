from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListMaterial.as_view()),
    path('<int:pk>/', views.DetailMaterial.as_view()),
]
