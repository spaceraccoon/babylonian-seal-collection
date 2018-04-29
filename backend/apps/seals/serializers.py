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


def get_or_create_or_update(instance_id, defaults, model, user):
    """Gets, creates, or updates instance.

    If instance with instance_id exists, updates instance if user has correct 
    permissions. Otherwise, simply returns instance. If instance does not
    exist, creates a new instance.

    Args:
        instance_id (int): ID of instance.
        defaults (:obj:): Data of object if creating or updating.
        model (Model): Model of instance.
        user (User): User information associated with request.

    Returns:
        Model instance.
    """

    try:
        obj = model.objects.get(id=instance_id)
        if obj.creator == user or user.is_staff or user.is_superuser:
            model.objects.filter(id=obj.id).update(**defaults)
            return model.objects.get(id=obj.id)
        else:
            return obj
    except model.DoesNotExist:
        return model.objects.create(**defaults, creator=user)


def map_objects_by_name(field_name, model, validated_data):
    """Gets or creates model instances from list.

    If instance with name exists, gets instance, otherwise creates new instance.

    Args:
        field_name (str): Name of field that contains list of data.
        model (Model): Model of instance.
        validated_data (:obj:): Validated data from request.

    Returns:
        List of Model instances.
    """

    data = validated_data.pop(field_name)
    return list(map(lambda x: model.objects.get_or_create(name=x['name'])[0], data))


class RelatedImpressionSerializer(serializers.ModelSerializer):
    """
    Minimal Impression serializer that only serializes id and name.
    """

    id = serializers.IntegerField()
    name = serializers.ReadOnlyField()

    class Meta:
        fields = (
            'id',
            'name',
        )
        model = Impression


class RelatedSealSerializer(serializers.ModelSerializer):
    """
    Minimal Seal serializer that only serializes id and name.
    """

    id = serializers.IntegerField()
    name = serializers.ReadOnlyField()

    class Meta:
        fields = (
            'id',
            'name',
        )
        model = Seal


class ListSealSerializer(serializers.ModelSerializer):
    """
    Minimal Seal serializer that only serializes a few fields.
    """

    id = serializers.IntegerField()
    can_edit = serializers.SerializerMethodField()
    creator_username = serializers.ReadOnlyField(source='creator.username')
    name = serializers.ReadOnlyField()

    def get_can_edit(self, obj):
        """
        Returns boolean specifying whether user from request has edit
        permissions for the instance.
        """
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
    """
    Detailed Seal serializer that handles creating and updating seals.
    """

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
    object_types = ObjectTypeSerializer(many=True)
    impressions = RelatedImpressionSerializer(many=True)
    related_seals = RelatedSealSerializer(many=True)

    def get_can_edit(self, obj):
        """
        Returns boolean specifying whether user from request has edit
        permissions for the instance.
        """
        user = self.context['request'].user
        return obj.creator == user or user.is_staff or user.is_superuser

    def get_surface_preservation_text(self, obj):
        """
        Returns string corresponding to the value of the enum rather than
        the key for the options.
        """
        return obj.get_surface_preservation_display()

    def get_design_text(self, obj):
        """
        Returns string corresponding to the value of the enum rather than
        the key for the options.
        """
        return obj.get_design_display()

    def validate_related_seals(self, value):
        """
        Validates related_seals by ensuring that serializer does not accept
        a seal listing itself as a related seal.
        """
        if self.instance is not None:
            for related_seal in value:
                if self.instance.id == related_seal['id']:
                    raise serializers.ValidationError(
                        "Cannot assign self as a related seal.")
        return value

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
            'object_types',
            'impressions',
            'related_seals'
        )
        model = Seal

    def create(self, validated_data):
        """Overrides default create method.

        Handles list/nested fields with deep serializers like texts.
        """

        # Uses `map_objects_by_name` for simpler nested fields with only a
        # `name` field.
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
        object_types = map_objects_by_name(
            'object_types', ObjectType, validated_data)

        # Since `impressions` and `related_seals` do not expect nested data or
        # creating new instances, it is sufficient to use `get` over the IDs.
        impressions = list(map(lambda x: Impression.objects.get(
            id=x['id']), validated_data.pop('impressions')))
        related_seals = list(map(lambda x: Seal.objects.get(
            id=x['id']), validated_data.pop('related_seals')))

        user = self.context['request'].user

        # Since `publication` does not have nested ManyToMany fields, it is
        # sufficient to map `get_or_create` with the other fields.
        publication_data = validated_data.pop('publications')
        publications = list(map(lambda x: Publication.objects.get_or_create(
            id=x['id'],
            defaults={'creator': user, 'title': x['title'], 'author': x.get('author', ''), 'year': x['year'], 'isbn': x['isbn']})[0], publication_data))

        # Since `text` contains a nested ManyToMany field `languages`, it is
        # necessary to run `map_objects_by_name` on each `text`'s `languages`
        # field as well.
        text_data = validated_data.pop('texts')
        texts = []
        for text in text_data:
            new_text = Text.objects.get_or_create(
                id=text['id'],
                defaults={'creator': user, 'title': text['title'], 'transliteration': text.get('transliteration', ''), 'translation': text.get('translation', '')})[0]
            new_text.languages.set(
                map_objects_by_name('languages', Language, text))
            new_text.save()
            texts.append(new_text)

        # Since `images` are meant to be create-only, it maps using `create`
        # instead of `get_or_create`.
        image_data = validated_data.pop('images')
        images = list(map(lambda x: Image.objects.create(
            **{'creator': user, 'name': x['name'], 'source': x['source'], 'description': x['description'], 's3_key': x['s3_key']}), image_data))

        # Since `historical_relationship` contains a nested many-to-one field
        # `historical_person`, it is necessary to run `get_or_create_or_update`
        # on each `historical_relationship`'s `historical_person` field.
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

        # Finally creates the Seal instance and sets/saves the nested fields.
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
        seal.object_types.set(object_types)
        seal.impressions.set(impressions)
        seal.related_seals.set(related_seals)
        seal.save()
        return seal

    def update(self, instance, validated_data):
        """Overrides default update method.

        Handles list/nested fields with deep serializers like texts.
        """

        # Sets the simple nested fields that do not require deep parsing
        # or creation.
        instance.materials.set(map_objects_by_name(
            'materials', Material, validated_data))
        instance.iconographic_elements.set(map_objects_by_name(
            'iconographic_elements', IconographicElement, validated_data))
        instance.scenes.set(map_objects_by_name(
            'scenes', Scene, validated_data))
        instance.art_styles.set(map_objects_by_name(
            'art_styles', ArtStyle, validated_data))
        instance.periods.set(map_objects_by_name(
            'periods', Period, validated_data))
        instance.languages.set(map_objects_by_name(
            'languages', Language, validated_data))
        instance.object_types.set(map_objects_by_name(
            'object_types', ObjectType, validated_data))
        instance.impressions.set(list(map(lambda x: Impression.objects.get(
            id=x['id']), validated_data.pop('impressions'))))
        instance.related_seals.set(list(map(lambda x: Seal.objects.get(
            id=x['id']), validated_data.pop('related_seals'))))

        user = self.context['request'].user

        # For the more complex nested data, the processes are similar to in the
        # `create` method, except it also supports updating.
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

        # Updates the Seal instance with the rest of the non-nested fields.
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
