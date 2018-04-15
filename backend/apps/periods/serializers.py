from rest_framework import serializers

from .models import Period


class PeriodSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Period
        extra_kwargs = {
            'name': {'validators': []},
        }
