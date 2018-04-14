from rest_framework import serializers
from rest_framework import exceptions

from .models import Period


class PeriodSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Period
        extra_kwargs = {
            'name': {'validators': []},
        }


class DetailPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'seal_set')
        model = Period
        depth = 1
