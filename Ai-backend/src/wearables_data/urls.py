from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WearableDataViewSet, connect_device

router = DefaultRouter()
router.register(r'wearables', WearableDataViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('connect-device/', connect_device, name='connect_device'),
]