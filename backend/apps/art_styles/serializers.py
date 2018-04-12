from rest_framework import serializers
from rest_framework import exceptions

from .models import ArtStyle


class ArtStyleSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        if ArtStyle.objects.filter(name=validated_data['name']).exists():
            raise exceptions.ValidationError(
                exceptions._get_error_details({
                    'art_styles': {
                        'name': ['art style with this name already exists.']
                    }
                })
            )
        return ArtStyle.objects.create(**validated_data)

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
