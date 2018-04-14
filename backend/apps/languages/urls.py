from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListLanguage.as_view()),
    path('<int:pk>/', views.DetailLanguage.as_view()),
]
