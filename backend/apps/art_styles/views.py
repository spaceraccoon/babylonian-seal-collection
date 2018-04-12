from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.validators import UniqueValidator

from .models import ArtStyle
from .serializers import ArtStyleSerializer, DetailArtStyleSerializer


class ListArtStyle(generics.ListCreateAPIView):
    queryset = ArtStyle.objects.all()
    serializer_class = ArtStyleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class DetailArtStyle(generics.RetrieveUpdateDestroyAPIView):
    queryset = ArtStyle.objects.all()
    serializer_class = DetailArtStyleSerializer
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
