from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Impression
from .serializers import ListImpressionSerializer, ImpressionSerializer
from .permissions import IsCreatorOrAdminOrReadOnly


class ImpressionList(generics.ListCreateAPIView):
    """
    get:
    Return a list of all the existing impressions with minimal
    ListImpressionSerializer.

    post:
    Create a new impression instance.
    """

    queryset = Impression.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)
    filter_fields = {
        'name': ['exact', 'icontains'],
    }

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListImpressionSerializer
        return ImpressionSerializer

    def perform_create(self, serializer):
        """
        Saves the request's user as the creator.
        """
        serializer.save(creator=self.request.user)


class ImpressionDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
    Return the given impression.

    patch:
    Update the given impression.

    delete:
    Delete the given impression.
    """

    queryset = Impression.objects.all()
    serializer_class = ImpressionSerializer
    permission_classes = (IsCreatorOrAdminOrReadOnly,)
