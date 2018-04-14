from rest_framework import serializers
from rest_framework import exceptions

from .models import ArtStyle


class ArtStyleSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = ArtStyle
        extra_kwargs = {
            'name': {'validators': []},
        }


class DetailArtStyleSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'seal_set')
        model = ArtStyle
        depth = 1
