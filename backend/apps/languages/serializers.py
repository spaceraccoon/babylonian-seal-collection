from rest_framework import serializers

from .models import Language


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Language
        extra_kwargs = {
            'name': {'validators': []},
        }
