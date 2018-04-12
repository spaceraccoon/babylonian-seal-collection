from rest_framework import serializers
from rest_framework import exceptions

from .models import Period


class PeriodSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        if Period.objects.filter(name=validated_data['name']).exists():
            raise exceptions.ValidationError(
                exceptions._get_error_details({
                    'periods': {
                        'name': ['period with this name already exists.']
                    }
                })
            )
        return Period.objects.create(**validated_data)

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
