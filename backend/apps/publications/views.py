from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Publication
from .serializers import PublicationSerializer


class PublicationList(generics.ListAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
