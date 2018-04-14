from rest_framework import serializers
from rest_framework import exceptions

from .models import Language


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Language
        extra_kwargs = {
            'name': {'validators': []},
        }


class DetailLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'text_set')
        model = Language
        depth = 1
