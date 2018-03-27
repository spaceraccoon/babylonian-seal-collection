from rest_framework import serializers
from .models import Seal

class SealSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
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