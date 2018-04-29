"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    re_path('admin/?', admin.site.urls),
    path('api/seal/', include('backend.apps.seals.urls')),
    path('api/user/', include('backend.apps.users.urls')),
    path('api/material/', include('backend.apps.materials.urls')),
    path('api/iconographicelement/',
         include('backend.apps.iconographic_elements.urls')),
    path('api/scene/', include('backend.apps.scenes.urls')),
    path('api/artstyle/', include('backend.apps.art_styles.urls')),
    path('api/period/', include('backend.apps.periods.urls')),
    path('api/publication/', include('backend.apps.publications.urls')),
    path('api/language/', include('backend.apps.languages.urls')),
    path('api/text/', include('backend.apps.texts.urls')),
    path('api/image/', include('backend.apps.images.urls')),
    path('api/historicalperson/', include('backend.apps.historical_persons.urls')),
    path('api/objecttype/', include('backend.apps.object_types.urls')),
    path('api/impression/', include('backend.apps.impressions.urls')),
    path('api/auth/token/obtain/', TokenObtainPairView.as_view()),
    path('api/auth/token/refresh/', TokenRefreshView.as_view()),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
