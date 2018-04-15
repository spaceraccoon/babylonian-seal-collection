from rest_framework import serializers

from .models import IconographicElement


class IconographicElementSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = IconographicElement
        extra_kwargs = {
            'name': {'validators': []},
        }
