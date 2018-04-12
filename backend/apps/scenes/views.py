from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.validators import UniqueValidator

from .models import Scene
from .serializers import SceneSerializer, DetailSceneSerializer


class ListScene(generics.ListCreateAPIView):
    queryset = Scene.objects.all()
    serializer_class = SceneSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class DetailScene(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scene.objects.all()
    serializer_class = DetailSceneSerializer
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
