from rest_framework import generics

from .models import Text
from .serializers import TextSerializer, DetailTextSerializer
from .permissions import IsCreatorOrAdminOrReadOnly


class ListText(generics.ListCreateAPIView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class DetailText(generics.RetrieveUpdateDestroyAPIView):
    queryset = Text.objects.all()
    serializer_class = DetailTextSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)
