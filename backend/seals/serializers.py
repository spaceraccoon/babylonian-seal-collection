from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

from .models import Seal


class SealSerializer(serializers.ModelSerializer):
    is_creator = serializers.SerializerMethodField()
    creator_username = serializers.ReadOnlyField(source='creator.username')
    creator_id = serializers.ReadOnlyField(source='creator.id')

    def get_is_creator(self, obj):
        return obj.creator == self.context['request'].user

    class Meta:
        fields = (
            'id',
            'is_creator',
            'creator_id',
            'creator_username',
            'created_at',
            'updated_at',
            'name',
            'cdli_number',
            'museum_number',
            'accession_number',
            'publication_number',
            'collection',
            'height',
            'thickness',
            'width',
            'weight',
            'drill_hole_diameter',
            'perforations',
            'surface_preservation',
            'condition',
            'is_recarved',
            'physical_remarks',
            'provenance',
            'provenance_remarks',
            'excavation_number',
            'design',
            'design_remarks',
        )
        model = Seal


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8)
    seals = serializers.PrimaryKeyRelatedField(required=False,
                                               many=True, queryset=Seal.objects.all())

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
                                        validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'seals')
