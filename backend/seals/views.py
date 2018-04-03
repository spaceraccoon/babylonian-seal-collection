from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

from . import models
from . import serializers
from .permissions import IsCreatorOrReadOnly


class ListSeal(generics.ListCreateAPIView):
    queryset = models.Seal.objects.all()
    serializer_class = serializers.SealSerializer
    permission_classes = (IsCreatorOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class DetailSeal(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Seal.objects.all()
    serializer_class = serializers.SealSerializer
    permission_classes = (IsCreatorOrReadOnly,)


class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)
