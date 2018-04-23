from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import HistoricalRelationship
from .serializers import HistoricalRelationshipSerializer


class HistoricalRelationshipList(generics.ListAPIView):
    queryset = HistoricalRelationship.objects.all()
    serializer_class = HistoricalRelationshipSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
