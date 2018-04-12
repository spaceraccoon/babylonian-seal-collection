from rest_framework import serializers
from rest_framework import exceptions

from .models import IconographicElement


class IconographicElementSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        if IconographicElement.objects.filter(name=validated_data['name']).exists():
            raise exceptions.ValidationError(
                exceptions._get_error_details({
                    'IconographicElements': {
                        'name': ['iconographic element with this name already exists.']
                    }
                })
            )
        return IconographicElement.objects.create(**validated_data)

    class Meta:
        fields = ('id', 'name')
        model = IconographicElement
        extra_kwargs = {
            'name': {'validators': []},
        }


class DetailIconographicElementSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'seal_set')
        model = IconographicElement
        depth = 1
