from django.db import models

from ..seals.models import Seal


class Image(models.Model):
    creator = models.ForeignKey(
        'auth.User', related_name='images', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, blank=True)
    seal = models.ForeignKey(
        Seal, blank=True, null=True, on_delete=models.SET_NULL)
    source = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    s3_key = models.CharField(max_length=1024)

    def __str__(self):
        """A string representation of the model."""
        return self.name
