from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import ArtStyle
from .serializers import ArtStyleSerializer


class ArtStyleList(generics.ListAPIView):
    queryset = ArtStyle.objects.all()
    serializer_class = ArtStyleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
