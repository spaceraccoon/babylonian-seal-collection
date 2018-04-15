from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Scene
from .serializers import SceneSerializer


class SceneList(generics.ListAPIView):
    queryset = Scene.objects.all()
    serializer_class = SceneSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
