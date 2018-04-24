from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Seal
from .serializers import ListSealSerializer, SealSerializer
from .permissions import IsCreatorOrAdminOrReadOnly


class SealList(generics.ListCreateAPIView):
    queryset = Seal.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)
    filter_fields = {
        'name': ['exact', 'icontains'],
    }

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListSealSerializer
        return SealSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class SealDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Seal.objects.all()
    serializer_class = SealSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)
