from django.db import models


class Material(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        """A string representation of the model."""
        return self.name
