from django.db import models

from ..languages.models import Language


class Text(models.Model):
    title = models.CharField(max_length=255)
    creator = models.ForeignKey(
        'auth.User', related_name='texts', on_delete=models.CASCADE)
    languages = models.ManyToManyField(Language, blank=True)
    transliteration = models.TextField(blank=True)
    translation = models.TextField(blank=True)

    def __str__(self):
        """A string representation of the model."""
        return self.title
