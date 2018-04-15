from rest_framework import serializers

from .models import ArtStyle


class ArtStyleSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = ArtStyle
        extra_kwargs = {
            'name': {'validators': []},
        }
