from rest_framework import generics

from .models import Publication
from .serializers import PublicationSerializer, DetailPublicationSerializer
from .permissions import IsCreatorOrAdminOrReadOnly


class ListPublication(generics.ListCreateAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class DetailPublication(generics.RetrieveUpdateDestroyAPIView):
    queryset = Publication.objects.all()
    serializer_class = DetailPublicationSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)
