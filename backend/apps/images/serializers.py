from rest_framework import serializers

from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    can_edit = serializers.SerializerMethodField()

    def get_can_edit(self, obj):
        return obj.creator == self.context['request'].user or self.context['request'].user.is_staff or self.context['request'].user.is_superuser

    class Meta:
        fields = ('id', 'can_edit', 'created_at', 'updated_at', 'name',
                  'seal', 'source', 'description', 's3_key')
        model = Image
