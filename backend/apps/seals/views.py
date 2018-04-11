from rest_framework import generics

from .models import Seal
from .serializers import SealSerializer
from .permissions import IsCreatorOrAdminOrReadOnly


class ListSeal(generics.ListCreateAPIView):
    queryset = Seal.objects.all()
    serializer_class = SealSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class DetailSeal(generics.RetrieveUpdateDestroyAPIView):
    queryset = Seal.objects.all()
    serializer_class = SealSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)
