from rest_framework import serializers
from rest_framework import exceptions

from .models import Material


class MaterialSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        if Material.objects.filter(name=validated_data['name']).exists():
            raise exceptions.ValidationError(
                exceptions._get_error_details({
                    'materials': {
                        'name': ['material with this name already exists.']
                    }
                })
            )
        return Material.objects.create(**validated_data)

    class Meta:
        fields = ('id', 'name')
        model = Material
        extra_kwargs = {
            'name': {'validators': []},
        }
