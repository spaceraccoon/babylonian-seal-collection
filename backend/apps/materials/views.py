from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Material
from .serializers import MaterialSerializer


class MaterialList(generics.ListAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
