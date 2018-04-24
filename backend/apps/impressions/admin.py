from django.contrib import admin

from .models import Impression
from ..images.models import Image
from ..historical_relationships.models import HistoricalRelationship


class ImageInline(admin.StackedInline):
    model = Image
    extra = 0


class HistoricalRelationshipInline(admin.StackedInline):
    model = HistoricalRelationship
    extra = 0


class ImpressionAdmin(admin.ModelAdmin):
    inlines = [
        ImageInline,
        HistoricalRelationshipInline,
    ]


admin.site.register(Impression, ImpressionAdmin)
