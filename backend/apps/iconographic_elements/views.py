from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly

from .models import IconographicElement
from .serializers import IconographicElementSerializer, DetailIconographicElementSerializer


class ListIconographicElement(generics.ListCreateAPIView):
    queryset = IconographicElement.objects.all()
    serializer_class = IconographicElementSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class DetailIconographicElement(generics.RetrieveUpdateDestroyAPIView):
    queryset = IconographicElement.objects.all()
    serializer_class = DetailIconographicElementSerializer
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
