from rest_framework import serializers

from .models import HistoricalRelationship
from ..historical_persons.serializers import HistoricalPersonSerializer


class HistoricalRelationshipSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    can_edit = serializers.SerializerMethodField()
    historical_person = HistoricalPersonSerializer()

    def get_can_edit(self, obj):
        return obj.creator == self.context['request'].user or self.context['request'].user.is_staff or self.context['request'].user.is_superuser

    class Meta:
        fields = ('id', 'can_edit', 'remarks', 'historical_person')
        model = HistoricalRelationship
        depth = 1
