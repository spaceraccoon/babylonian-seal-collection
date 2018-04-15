from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import IconographicElement
from .serializers import IconographicElementSerializer


class IconographicElementList(generics.ListAPIView):
    queryset = IconographicElement.objects.all()
    serializer_class = IconographicElementSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
