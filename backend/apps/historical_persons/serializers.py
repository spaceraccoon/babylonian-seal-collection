from rest_framework import serializers

from .models import HistoricalPerson


class HistoricalPersonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    can_edit = serializers.SerializerMethodField()

    def get_can_edit(self, obj):
        return obj.creator == self.context['request'].user or self.context['request'].user.is_staff or self.context['request'].user.is_superuser

    class Meta:
        fields = ('id', 'can_edit', 'name', 'remarks')
        model = HistoricalPerson
        extra_kwargs = {
            'name': {'validators': []},
        }
