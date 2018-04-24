from django.urls import path

from . import views


urlpatterns = [
    path('', views.ImpressionList.as_view()),
    path('<int:pk>/', views.ImpressionDetail.as_view()),
]
