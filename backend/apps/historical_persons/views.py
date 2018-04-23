from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import HistoricalPerson
from .serializers import HistoricalPersonSerializer


class HistoricalPersonList(generics.ListAPIView):
    queryset = HistoricalPerson.objects.all()
    serializer_class = HistoricalPersonSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
