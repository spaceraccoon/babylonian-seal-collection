from django.db import models

from ..materials.models import Material
from ..iconographic_elements.models import IconographicElement
from ..scenes.models import Scene
from ..art_styles.models import ArtStyle
from ..periods.models import Period
from ..publications.models import Publication
from ..texts.models import Text
from ..languages.models import Language
from ..object_types.models import ObjectType


class Seal(models.Model):
    # metadata
    creator = models.ForeignKey(
        'auth.User', related_name='seals', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # identification
    name = models.CharField(max_length=255)
    cdli_number = models.CharField(blank=True, max_length=255)
    museum_number = models.CharField(blank=True, max_length=255)
    accession_number = models.CharField(blank=True, max_length=255)
    publication_number = models.CharField(blank=True, max_length=255)
    collection = models.CharField(blank=True, max_length=255)

    # physical
    height = models.FloatField(blank=True, null=True)
    thickness = models.FloatField(blank=True, null=True)
    width = models.FloatField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    drill_hole_diameter = models.FloatField(blank=True, null=True)
    perforations = models.CharField(blank=True, max_length=255)
    materials = models.ManyToManyField(Material, blank=True)
    POOR = 0
    FAIR = 1
    GOOD = 2
    EXCELLENT = 3
    SURFACE_PRESERVATION_CHOICES = (
        (POOR, 'Poor'),
        (FAIR, 'Fair'),
        (GOOD, 'Good'),
        (EXCELLENT, 'Excellent'),
    )
    surface_preservation = models.IntegerField(
        blank=True,
        null=True,
        choices=SURFACE_PRESERVATION_CHOICES,
    )
    condition = models.TextField(blank=True)
    is_recarved = models.NullBooleanField(blank=True, null=True)
    physical_remarks = models.TextField(blank=True)
    object_type = models.ForeignKey(
        ObjectType, on_delete=models.SET_NULL, blank=True, null=True)

    # provenance
    periods = models.ManyToManyField(Period, blank=True)
    provenance = models.TextField(blank=True)
    provenance_remarks = models.TextField(blank=True)
    excavation_number = models.CharField(blank=True, max_length=255)

    # content
    languages = models.ManyToManyField(Language, blank=True)
    texts = models.ManyToManyField(Text, blank=True)

    # impressions
    # impressions

    # design
    FIG = 'FIGURATIVE'
    GEO = 'GEOMETRIC'
    DESIGN_CHOICES = (
        (FIG, 'Figurative'),
        (GEO, 'Geometric'),
    )
    design = models.CharField(
        blank=True,
        max_length=10,
        choices=DESIGN_CHOICES,
    )
    design_remarks = models.TextField(blank=True)
    scenes = models.ManyToManyField(Scene, blank=True)
    art_styles = models.ManyToManyField(ArtStyle, blank=True)
    iconographic_elements = models.ManyToManyField(
        IconographicElement, blank=True)

    # bibliography
    publications = models.ManyToManyField(
        Publication, blank=True)

    def __str__(self):
        """A string representation of the model."""
        return self.name
