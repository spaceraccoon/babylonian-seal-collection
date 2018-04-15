from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Period
from .serializers import PeriodSerializer


class PeriodList(generics.ListAPIView):
    queryset = Period.objects.all()
    serializer_class = PeriodSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
