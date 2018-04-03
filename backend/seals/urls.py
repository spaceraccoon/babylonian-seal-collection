from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('seal/', views.ListSeal.as_view()),
    path('seal/<int:pk>/', views.DetailSeal.as_view()),
    path('user/', views.CreateUser.as_view()),
    path('auth/token/obtain/', TokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
]
