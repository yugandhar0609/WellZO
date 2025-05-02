from django.db import models

class WearableData(models.Model):
    device_id = models.CharField(max_length=100)
    heart_rate = models.IntegerField(null=True)
    steps = models.IntegerField(null=True)
    temperature = models.FloatField(null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    battery_level = models.IntegerField(null=True)
    
    class Meta:
        ordering = ['-timestamp']