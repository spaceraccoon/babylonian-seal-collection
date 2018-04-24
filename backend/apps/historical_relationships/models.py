from django.db import models
from ..seals.models import Seal
from ..impressions.models import Impression
from ..historical_persons.models import HistoricalPerson


class HistoricalRelationship(models.Model):
    creator = models.ForeignKey(
        'auth.User', related_name='historical_relationships', on_delete=models.CASCADE)
    remarks = models.TextField(blank=True)
    seal = models.ForeignKey(
        Seal, related_name='historical_relationships', blank=True, null=True, on_delete=models.SET_NULL)
    impression = models.ForeignKey(
        Impression, related_name='historical_relationships', blank=True, null=True, on_delete=models.SET_NULL)
    historical_person = models.ForeignKey(
        HistoricalPerson, related_name='historical_relationships', on_delete=models.CASCADE)

    def __str__(self):
        """A string representation of the model."""
        return self.name
