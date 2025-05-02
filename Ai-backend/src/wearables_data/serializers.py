from rest_framework import serializers
from .models import WearableData

class WearableDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WearableData
        fields = '__all__'