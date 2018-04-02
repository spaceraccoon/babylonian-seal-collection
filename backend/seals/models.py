from django.db import models


class Seal(models.Model):
    # metadata
    # created_by
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

    # material
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
    # type

    # chronology
    # period

    # provenance
    provenance = models.TextField(blank=True)
    provenance_remarks = models.TextField(blank=True)
    excavation_number = models.CharField(blank=True, max_length=255)

    # content
    # text
    # historical_relationships

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
    # scene
    # artistic_style
    # iconographic_elements

    # images
    # images

    # bibliography
    # publications

    def __str__(self):
        """A string representation of the model."""
        return self.name
