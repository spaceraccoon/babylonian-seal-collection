# Generated by Django 2.0.4 on 2018-04-25 00:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('impressions', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('seals', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('source', models.CharField(blank=True, max_length=255)),
                ('description', models.TextField(blank=True)),
                ('s3_key', models.CharField(max_length=1024)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to=settings.AUTH_USER_MODEL)),
                ('impression', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='images', to='impressions.Impression')),
                ('seal', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='images', to='seals.Seal')),
            ],
        ),
    ]