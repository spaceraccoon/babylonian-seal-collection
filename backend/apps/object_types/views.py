from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import ObjectType
from .serializers import ObjectTypeSerializer


class ObjectTypeList(generics.ListAPIView):
    queryset = ObjectType.objects.all()
    serializer_class = ObjectTypeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
