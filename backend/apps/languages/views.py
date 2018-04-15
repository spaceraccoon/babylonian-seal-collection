from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Language
from .serializers import LanguageSerializer


class LanguageList(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
