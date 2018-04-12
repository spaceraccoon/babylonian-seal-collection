from rest_framework import serializers
from rest_framework import exceptions

from .models import Scene


class SceneSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        if Scene.objects.filter(name=validated_data['name']).exists():
            raise exceptions.ValidationError(
                exceptions._get_error_details({
                    'scenes': {
                        'name': ['scene with this name already exists.']
                    }
                })
            )
        return Scene.objects.create(**validated_data)

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
