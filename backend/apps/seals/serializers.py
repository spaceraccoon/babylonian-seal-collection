from rest_framework import serializers

from .models import Seal
from ..materials.models import Material
from ..iconographic_elements.models import IconographicElement
from ..scenes.models import Scene
from ..art_styles.models import ArtStyle
from ..periods.models import Period
from ..publications.models import Publication
from ..texts.models import Text
from ..languages.models import Language
from ..images.models import Image
from ..historical_persons.models import HistoricalPerson
from ..historical_relationships.models import HistoricalRelationship
from ..object_types.models import ObjectType
from ..impressions.models import Impression
from ..materials.serializers import MaterialSerializer
from ..iconographic_elements.serializers import IconographicElementSerializer
from ..scenes.serializers import SceneSerializer
from ..art_styles.serializers import ArtStyleSerializer
from ..periods.serializers import PeriodSerializer
from ..publications.serializers import PublicationSerializer
from ..texts.serializers import TextSerializer
from ..languages.serializers import LanguageSerializer
from ..images.serializers import ImageSerializer
from ..historical_relationships.serializers import HistoricalRelationshipSerializer
from ..object_types.serializers import ObjectTypeSerializer
from ..impressions.serializers import ListImpressionSerializer


def get_or_create_or_update(obj_id, defaults, model, user):
    try:
        obj = model.objects.get(id=obj_id)
        if obj.creator == user or user.is_staff or user.is_superuser:
            model.objects.filter(id=obj.id).update(**defaults)
            return model.objects.get(id=obj.id)
        else:
            return obj
    except model.DoesNotExist:
        return model.objects.create(**defaults, creator=user)


def map_objects_by_name(name, model, validated_data):
    data = validated_data.pop(name)
    return list(map(lambda x: model.objects.get_or_create(name=x['name'])[0], data))


class ListSealSerializer(serializers.ModelSerializer):
    can_edit = serializers.SerializerMethodField()
    creator_username = serializers.ReadOnlyField(source='creator.username')

    def get_can_edit(self, obj):
        user = self.context['request'].user
        return obj.creator == user or user.is_staff or user.is_superuser

    class Meta:
        fields = (
            'id',
            'can_edit',
            'creator_username',
            'updated_at',
            'name',
        )
        model = Seal


class SealSerializer(serializers.ModelSerializer):
    can_edit = serializers.SerializerMethodField()
    creator_username = serializers.ReadOnlyField(source='creator.username')
    creator_id = serializers.ReadOnlyField(source='creator.id')
    surface_preservation_text = serializers.SerializerMethodField()
    texts = TextSerializer(many=True)
    historical_relationships = HistoricalRelationshipSerializer(
        many=True)
    design_text = serializers.SerializerMethodField()
    materials = MaterialSerializer(many=True)
    iconographic_elements = IconographicElementSerializer(many=True)
    scenes = SceneSerializer(many=True)
    art_styles = ArtStyleSerializer(many=True)
    periods = PeriodSerializer(many=True)
    images = ImageSerializer(many=True)
    publications = PublicationSerializer(many=True)
    languages = LanguageSerializer(many=True)
    object_type = ObjectTypeSerializer(allow_null=True)
    impressions = ListImpressionSerializer(many=True)

    def get_can_edit(self, obj):
        user = self.context['request'].user
        return obj.creator == user or user.is_staff or user.is_superuser

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
            'languages',
            'historical_relationships',
            'texts',
            'design',
            'design_text',
            'design_remarks',
            'scenes',
            'art_styles',
            'iconographic_elements',
            'images',
            'publications',
            'object_type',
            'impressions'
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
        languages = map_objects_by_name(
            'languages', Language, validated_data)

        object_type_data = validated_data.pop('object_type')
        if object_type_data != None:
            object_type = ObjectType.objects.get_or_create(
                name=object_type_data['name'])[0]

        user = self.context['request'].user

        publication_data = validated_data.pop('publications')
        publications = list(map(lambda x: Publication.objects.get_or_create(
            id=x['id'],
            defaults={'creator': user, 'title': x['title'], 'author': x.get('author', ''), 'year': x['year'], 'isbn': x['isbn']})[0], publication_data))

        text_data = validated_data.pop('texts')
        texts = []
        for text in text_data:
            new_text = Text.objects.get_or_create(
                id=text['id'],
                defaults={'creator': user, 'title': text['title'], 'transliteration': text.get('transliteration', ''), 'translation': text.get('translation', '')})[0]
            text_languages = text['languages']
            for text_language in text_languages:
                new_text_language = Language.objects.get_or_create(
                    name=text_language['name'])[0]
                new_text.languages.add(new_text_language)
            new_text.save()
            texts.append(new_text)

        image_data = validated_data.pop('images')
        images = list(map(lambda x: Image.objects.create(
            **{'creator': user, 'name': x['name'], 'source': x['source'], 'description': x['description'], 's3_key': x['s3_key']}), image_data))

        historical_relationships_data = validated_data.pop(
            'historical_relationships')
        historical_relationships = []
        for historical_relationship_data in historical_relationships_data:
            historical_person_data = historical_relationship_data.pop(
                'historical_person')
            historical_person = get_or_create_or_update(
                historical_person_data.get('id', None),
                {
                    'name': historical_person_data['name'], 'remarks': historical_person_data['remarks']},
                HistoricalPerson,
                user)
            historical_relationship = HistoricalRelationship.objects.create(
                creator=user, remarks=historical_relationship_data['remarks'], historical_person=historical_person)
            historical_relationships.append(historical_relationship)

        seal = Seal.objects.create(**validated_data)
        seal.materials.set(materials)
        seal.iconographic_elements.set(iconographic_elements)
        seal.scenes.set(scenes)
        seal.art_styles.set(art_styles)
        seal.periods.set(periods)
        seal.languages.set(languages)
        seal.publications.set(publications)
        seal.texts.set(texts)
        seal.images.set(images)
        seal.historical_relationships.set(historical_relationships)
        if object_type_data != None:
            seal.object_type = object_type
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
        languages = map_objects_by_name(
            'languages', Language, validated_data)
        instance.materials.set(materials)
        instance.iconographic_elements.set(iconographic_elements)
        instance.scenes.set(scenes)
        instance.art_styles.set(art_styles)
        instance.periods.set(periods)
        instance.languages.set(languages)

        object_type_data = validated_data.pop('object_type')
        if object_type_data:
            object_type = ObjectType.objects.get_or_create(
                name=object_type_data['name'])[0]
            instance.object_type = object_type

        user = self.context['request'].user

        publication_data = validated_data.pop('publications')
        publications = list(map(lambda x: get_or_create_or_update(
            x['id'],
            {'title': x['title'], 'author': x.get(
                'author', ''), 'year': x['year'], 'isbn': x['isbn']},
            Publication,
            user), publication_data))
        instance.publications.set(publications)

        text_data = validated_data.pop('texts')
        texts = []
        for text in text_data:
            text_languages = []
            for text_language in text['languages']:
                text_languages.append(Language.objects.get_or_create(
                    name=text_language['name'])[0])
            try:
                old_text = Text.objects.get(id=text['id'])
                if old_text.creator == user or user.is_staff or user.is_superuser:
                    old_text.languages.set(text_languages)
                    old_text.save()
                    Text.objects.filter(id=text['id']).update(title=text['title'],
                                                              transliteration=text.get(
                        'transliteration', ''),
                        translation=text.get('translation', ''))
                    texts.append(Text.objects.get(id=text['id']))
                else:
                    texts.append(old_text)
            except Text.DoesNotExist:
                new_text = Text.objects.create(creator=user, title=text['title'], transliteration=text.get(
                    'transliteration', ''), translation=text.get('translation', ''))
                new_text.languages.set(text_languages)
                new_text.save()
                texts.append(new_text)
        instance.texts.set(texts)

        image_data = validated_data.pop('images')
        images = list(map(lambda x: get_or_create_or_update(
            x['id'],
            {'name': x['name'], 'source': x['source'],
                'description': x['description'], 's3_key': x['s3_key']},
            Image,
            user), image_data))
        instance.images.set(images)

        historical_relationships_data = validated_data.pop(
            'historical_relationships')
        historical_relationships = []
        for historical_relationship_data in historical_relationships_data:
            historical_person_data = historical_relationship_data.pop(
                'historical_person')
            historical_person = get_or_create_or_update(
                historical_person_data.get('id', None),
                {
                    'name': historical_person_data['name'], 'remarks': historical_person_data['remarks']
                },
                HistoricalPerson,
                user)
            historical_relationship = get_or_create_or_update(
                historical_relationship_data.get('id', None),
                {
                    'remarks': historical_relationship_data['remarks'],
                    'historical_person': historical_person
                },
                HistoricalRelationship,
                user)
            historical_relationships.append(historical_relationship)
        instance.historical_relationships.set(historical_relationships)

        instance.impressions.set(list(map(lambda x: Impression.objects.get(
            id=x['id']), validated_data.pop('impressions'))))

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
