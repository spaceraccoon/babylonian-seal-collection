from django.urls import path

from . import views


urlpatterns = [
    path('sign-s3/', views.SignS3.as_view()),
]
