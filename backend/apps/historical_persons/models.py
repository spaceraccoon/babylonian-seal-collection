from django.db import models


class HistoricalPerson(models.Model):
    creator = models.ForeignKey(
        'auth.User', related_name='historical_persons', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    remarks = models.TextField(blank=True)

    def __str__(self):
        """A string representation of the model."""
        return self.name
