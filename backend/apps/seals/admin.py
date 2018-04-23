from django.contrib import admin

from .models import Seal
from ..images.models import Image
from ..historical_relationships.models import HistoricalRelationship


class ImageInline(admin.StackedInline):
    model = Image
    extra = 0


class HistoricalRelationshipInline(admin.StackedInline):
    model = HistoricalRelationship
    extra = 0


class SealAdmin(admin.ModelAdmin):
    inlines = [
        ImageInline,
        HistoricalRelationshipInline,
    ]


admin.site.register(Seal, SealAdmin)
