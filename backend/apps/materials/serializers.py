from rest_framework import serializers

from .models import Material


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Material
        extra_kwargs = {
            'name': {'validators': []},
        }
