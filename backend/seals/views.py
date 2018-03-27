from rest_framework import generics

from . import models
from . import serializers


class ListSeal(generics.ListCreateAPIView):
    queryset = models.Seal.objects.all()
    serializer_class = serializers.SealSerializer


class DetailSeal(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Seal.objects.all()
    serializer_class = serializers.SealSerializer