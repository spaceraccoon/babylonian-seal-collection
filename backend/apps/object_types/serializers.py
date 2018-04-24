from rest_framework import serializers

from .models import ObjectType


class ObjectTypeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = ObjectType
        extra_kwargs = {
            'name': {'validators': []},
        }
