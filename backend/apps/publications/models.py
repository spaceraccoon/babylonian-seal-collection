from django.db import models
from isbn_field import ISBNField


class Publication(models.Model):
    creator = models.ForeignKey(
        'auth.User', related_name='publications', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    author = models.CharField(blank=True, max_length=255)
    year = models.PositiveSmallIntegerField(blank=True, null=True)
    isbn = ISBNField(blank=True, max_length=255)

    def __str__(self):
        """A string representation of the model."""
        return self.title
