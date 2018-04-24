from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Impression
from .serializers import ListImpressionSerializer, ImpressionSerializer
from .permissions import IsCreatorOrAdminOrReadOnly


class ImpressionList(generics.ListCreateAPIView):
    queryset = Impression.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)
    filter_fields = {
        'name': ['exact', 'icontains'],
    }

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListImpressionSerializer
        return ImpressionSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class ImpressionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Impression.objects.all()
    serializer_class = ImpressionSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)
