from rest_framework import serializers
from rest_framework import exceptions

from .models import Text
from ..languages.serializers import LanguageSerializer


class TextSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    can_edit = serializers.SerializerMethodField()
    languages = LanguageSerializer(many=True)

    def get_can_edit(self, obj):
        return obj.creator == self.context['request'].user or self.context['request'].user.is_staff or self.context['request'].user.is_superuser

    class Meta:
        fields = ('id', 'can_edit', 'title', 'languages',
                  'transliteration', 'translation')
        model = Text


class DetailTextSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'can_edit', 'title', 'languages',
                  'transliteration', 'translation', 'seal_set')
        model = Text
        depth = 1
