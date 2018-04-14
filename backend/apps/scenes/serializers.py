from rest_framework import serializers
from rest_framework import exceptions

from .models import Scene


class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Scene
        extra_kwargs = {
            'name': {'validators': []},
        }


class DetailSceneSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'seal_set')
        model = Scene
        depth = 1
