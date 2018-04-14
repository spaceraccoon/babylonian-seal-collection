from rest_framework import serializers
from rest_framework import exceptions

from .models import IconographicElement


class IconographicElementSerializer(serializers.ModelSerializer):
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
