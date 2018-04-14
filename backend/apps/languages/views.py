from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly

from .models import Language
from .serializers import LanguageSerializer, DetailLanguageSerializer


class ListLanguage(generics.ListCreateAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class DetailLanguage(generics.RetrieveUpdateDestroyAPIView):
    queryset = Language.objects.all()
    serializer_class = DetailLanguageSerializer
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
