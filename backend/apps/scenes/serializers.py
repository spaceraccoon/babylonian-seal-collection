from rest_framework import serializers

from .models import Scene


class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Scene
        extra_kwargs = {
            'name': {'validators': []},
        }
