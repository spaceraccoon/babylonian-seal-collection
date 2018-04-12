from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.validators import UniqueValidator

from .models import Material
from .serializers import MaterialSerializer, DetailMaterialSerializer


class ListMaterial(generics.ListCreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class DetailMaterial(generics.RetrieveUpdateDestroyAPIView):
    queryset = Material.objects.all()
    serializer_class = DetailMaterialSerializer
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
