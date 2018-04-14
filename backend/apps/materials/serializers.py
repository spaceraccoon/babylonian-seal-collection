from rest_framework import serializers
from rest_framework import exceptions

from .models import Material


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Material
        extra_kwargs = {
            'name': {'validators': []},
        }


class DetailMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'seal_set')
        model = Material
        depth = 1
