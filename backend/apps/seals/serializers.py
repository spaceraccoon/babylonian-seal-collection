from rest_framework import serializers

from .models import Seal
from ..materials.models import Material
from ..iconographic_elements.models import IconographicElement
from ..scenes.models import Scene
from ..art_styles.models import ArtStyle
from ..periods.models import Period
from ..materials.serializers import MaterialSerializer
from ..iconographic_elements.serializers import IconographicElementSerializer
from ..scenes.serializers import SceneSerializer
from ..art_styles.serializers import ArtStyleSerializer
from ..periods.serializers import PeriodSerializer


def map_objects_by_name(name, model, validated_data):
    data = validated_data.pop(name)
    return list(map(lambda x: model.objects.get_or_create(name=x['name'])[0], data))


class SealSerializer(serializers.ModelSerializer):
    can_edit = serializers.SerializerMethodField()
    creator_username = serializers.ReadOnlyField(source='creator.username')
    creator_id = serializers.ReadOnlyField(source='creator.id')
    surface_preservation_text = serializers.SerializerMethodField()
    design_text = serializers.SerializerMethodField()
    materials = MaterialSerializer(many=True)
    iconographic_elements = IconographicElementSerializer(many=True)
    scenes = SceneSerializer(many=True)
    art_styles = ArtStyleSerializer(many=True)
    periods = PeriodSerializer(many=True)

    def get_can_edit(self, obj):
        return obj.creator == self.context['request'].user or self.context['request'].user.is_staff or self.context['request'].user.is_superuser

    def get_surface_preservation_text(self, obj):
        return obj.get_surface_preservation_display()

    def get_design_text(self, obj):
        return obj.get_design_display()

    class Meta:
        fields = (
            'id',
            'can_edit',
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
            'materials',
            'surface_preservation',
            'surface_preservation_text',
            'condition',
            'is_recarved',
            'physical_remarks',
            'periods',
            'provenance',
            'provenance_remarks',
            'excavation_number',
            'design',
            'design_text',
            'design_remarks',
            'scenes',
            'art_styles',
            'iconographic_elements',
        )
        model = Seal

    def create(self, validated_data):
        materials = map_objects_by_name(
            'materials', Material, validated_data)
        iconographic_elements = map_objects_by_name(
            'iconographic_elements', IconographicElement, validated_data)
        scenes = map_objects_by_name(
            'scenes', Scene, validated_data)
        art_styles = map_objects_by_name(
            'art_styles', ArtStyle, validated_data)
        periods = map_objects_by_name(
            'periods', Period, validated_data)

        seal = Seal.objects.create(**validated_data)
        seal.materials.set(materials)
        seal.iconographic_elements.set(iconographic_elements)
        seal.scenes.set(scenes)
        seal.art_styles.set(art_styles)
        seal.periods.set(periods)
        seal.save()
        return seal

    def update(self, instance, validated_data):
        materials = map_objects_by_name(
            'materials', Material, validated_data)
        iconographic_elements = map_objects_by_name(
            'iconographic_elements', IconographicElement, validated_data)
        scenes = map_objects_by_name(
            'scenes', Scene, validated_data)
        art_styles = map_objects_by_name(
            'art_styles', ArtStyle, validated_data)
        periods = map_objects_by_name(
            'periods', Period, validated_data)
        instance.materials.set(materials)
        instance.iconographic_elements.set(iconographic_elements)
        instance.scenes.set(scenes)
        instance.art_styles.set(art_styles)
        instance.periods.set(periods)

        instance.name = validated_data.get('name', instance.name)
        instance.cdli_number = validated_data.get(
            'cdli_number', instance.cdli_number)
        instance.museum_number = validated_data.get(
            'museum_number', instance.museum_number)
        instance.accession_number = validated_data.get(
            'accession_number', instance.accession_number)
        instance.publication_number = validated_data.get(
            'publication_number', instance.publication_number)
        instance.collection = validated_data.get(
            'collection', instance.collection)
        instance.height = validated_data.get('height', instance.height)
        instance.thickness = validated_data.get(
            'thickness', instance.thickness)
        instance.width = validated_data.get('width', instance.width)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.drill_hole_diameter = validated_data.get(
            'drill_hole_diameter', instance.drill_hole_diameter)
        instance.perforations = validated_data.get(
            'perforations', instance.perforations)
        instance.surface_preservation = validated_data.get(
            'surface_preservation', instance.surface_preservation)
        instance.condition = validated_data.get(
            'condition', instance.condition)
        instance.is_recarved = validated_data.get(
            'is_recarved', instance.is_recarved)
        instance.physical_remarks = validated_data.get(
            'physical_remarks', instance.physical_remarks)
        instance.provenance = validated_data.get(
            'provenance', instance.provenance)
        instance.provenance_remarks = validated_data.get(
            'provenance_remarks', instance.provenance_remarks)
        instance.excavation_number = validated_data.get(
            'excavation_number', instance.excavation_number)
        instance.design = validated_data.get('design', instance.design)
        instance.design_remarks = validated_data.get(
            'design_remarks', instance.design_remarks)
        instance.save()
        return instance
