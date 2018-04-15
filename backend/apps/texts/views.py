from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Text
from .serializers import TextSerializer


class TextList(generics.ListAPIView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
