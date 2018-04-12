from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.validators import UniqueValidator

from .models import Period
from .serializers import PeriodSerializer, DetailPeriodSerializer


class ListPeriod(generics.ListCreateAPIView):
    queryset = Period.objects.all()
    serializer_class = PeriodSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class DetailPeriod(generics.RetrieveUpdateDestroyAPIView):
    queryset = Period.objects.all()
    serializer_class = DetailPeriodSerializer
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
