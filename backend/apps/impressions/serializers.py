from rest_framework import serializers

from .models import Impression
from ..seals.models import Seal
from ..materials.models import Material
from ..periods.models import Period
from ..texts.models import Text
from ..languages.models import Language
from ..images.models import Image
from ..historical_persons.models import HistoricalPerson
from ..historical_relationships.models import HistoricalRelationship
from ..object_types.models import ObjectType
from ..materials.serializers import MaterialSerializer
from ..periods.serializers import PeriodSerializer
from ..texts.serializers import TextSerializer
from ..languages.serializers import LanguageSerializer
from ..images.serializers import ImageSerializer
from ..historical_relationships.serializers import HistoricalRelationshipSerializer
from ..object_types.serializers import ObjectTypeSerializer


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


class RelatedSealSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    name = serializers.ReadOnlyField()

    class Meta:
        fields = (
            'id',
            'name',
        )
        model = Seal


class ListImpressionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    can_edit = serializers.SerializerMethodField()
    creator_username = serializers.ReadOnlyField(source='creator.username')
    name = serializers.ReadOnlyField()

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
        model = Impression


class ImpressionSerializer(serializers.ModelSerializer):
    can_edit = serializers.SerializerMethodField()
    creator_username = serializers.ReadOnlyField(source='creator.username')
    surface_preservation_text = serializers.SerializerMethodField()
    texts = TextSerializer(many=True)
    historical_relationships = HistoricalRelationshipSerializer(
        many=True)
    materials = MaterialSerializer(many=True)
    periods = PeriodSerializer(many=True)
    images = ImageSerializer(many=True)
    languages = LanguageSerializer(many=True)
    object_types = ObjectTypeSerializer(many=True)
    seals = RelatedSealSerializer(many=True)

    def get_can_edit(self, obj):
        user = self.context['request'].user
        return obj.creator == user or user.is_staff or user.is_superuser

    def get_surface_preservation_text(self, obj):
        return obj.get_surface_preservation_display()

    class Meta:
        fields = (
            'id',
            'can_edit',
            'creator_username',
            'created_at',
            'updated_at',
            'name',
            'cdli_number',
            'museum_number',
            'accession_number',
            'publication_number',
            'collection',
            'seals',
            'length',
            'thickness',
            'width',
            'weight',
            'materials',
            'surface_preservation',
            'surface_preservation_text',
            'condition',
            'physical_remarks',
            'periods',
            'provenance',
            'provenance_remarks',
            'excavation_number',
            'languages',
            'historical_relationships',
            'texts',
            'images',
            'object_types'
        )
        model = Impression

    def create(self, validated_data):
        materials = map_objects_by_name(
            'materials', Material, validated_data)
        periods = map_objects_by_name(
            'periods', Period, validated_data)
        languages = map_objects_by_name(
            'languages', Language, validated_data)
        object_types = map_objects_by_name(
            'object_types', ObjectType, validated_data)

        user = self.context['request'].user

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

        seals = list(map(lambda x: Seal.objects.get(
            id=x['id']), validated_data.pop('seals')))

        impression = Impression.objects.create(**validated_data)
        impression.materials.set(materials)
        impression.periods.set(periods)
        impression.languages.set(languages)
        impression.texts.set(texts)
        impression.images.set(images)
        impression.historical_relationships.set(historical_relationships)
        impression.object_types.set(object_types)
        impression.seals.set(seals)
        impression.save()
        return impression

    def update(self, instance, validated_data):
        instance.materials.set(map_objects_by_name(
            'materials', Material, validated_data))
        instance.periods.set(map_objects_by_name(
            'periods', Period, validated_data))
        instance.languages.set(map_objects_by_name(
            'languages', Language, validated_data))
        instance.object_types.set(map_objects_by_name(
            'object_types', ObjectType, validated_data))

        user = self.context['request'].user

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

        instance.seals.set(list(map(lambda x: Seal.objects.get(
            id=x['id']), validated_data.get('seals'))))

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
        instance.length = validated_data.get('length', instance.length)
        instance.thickness = validated_data.get(
            'thickness', instance.thickness)
        instance.width = validated_data.get('width', instance.width)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.surface_preservation = validated_data.get(
            'surface_preservation', instance.surface_preservation)
        instance.condition = validated_data.get(
            'condition', instance.condition)
        instance.physical_remarks = validated_data.get(
            'physical_remarks', instance.physical_remarks)
        instance.provenance = validated_data.get(
            'provenance', instance.provenance)
        instance.provenance_remarks = validated_data.get(
            'provenance_remarks', instance.provenance_remarks)
        instance.excavation_number = validated_data.get(
            'excavation_number', instance.excavation_number)
        instance.save()
        return instance
