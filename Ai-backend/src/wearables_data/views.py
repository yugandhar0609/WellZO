from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import WearableData
from .serializers import WearableDataSerializer
from .ble_service import BLEService
import asyncio
from bleak import BleakClient
import json
from rest_framework.decorators import api_view
class WearableDataViewSet(viewsets.ModelViewSet):
    queryset = WearableData.objects.all()
    serializer_class = WearableDataSerializer
    ble_service = BLEService()

    @action(detail=False, methods=['GET'])
    def scan_nordic_devices(self, request):
        devices = asyncio.run(self.ble_service.scan_devices())
        return Response(devices)

    @action(detail=False, methods=['POST'])
    def collect_nrf_data(self, request):
        device_address = request.data.get('device_address')
        if not device_address:
            return Response(
                {'error': 'Device address required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        data = asyncio.run(self.ble_service.connect_and_read(device_address))
        if 'error' in data:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        # Parse the received data - adjust parsing based on your data format
        try:
            parsed_data = self.parse_nrf_data(data['data'])
            wearable_data = WearableData.objects.create(
                device_id=device_address,
                **parsed_data
            )
            return Response(
                WearableDataSerializer(wearable_data).data, 
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': f'Data parsing failed: {str(e)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    def parse_nrf_data(self, data_list):
        # Customize this based on your nRF Connect data format
        # Example: assuming data is JSON string with sensor values
        parsed_data = {}
        for data_str in data_list:
            try:
                data = json.loads(data_str)
                if 'heart_rate' in data:
                    parsed_data['heart_rate'] = data['heart_rate']
                if 'temperature' in data:
                    parsed_data['temperature'] = data['temperature']
                if 'steps' in data:
                    parsed_data['steps'] = data['steps']
            except json.JSONDecodeError:
                # Handle non-JSON data if needed
                pass
        return parsed_data
    

    from bleak import BleakClient

@api_view(['POST'])
async def connect_device(request):
    address = request.data.get('address')
    if not address:
        return Response({'error': 'Address required'}, status=400)
    
    try:
        async with BleakClient(address) as client:
            # Check if connected
            if client.is_connected:
                # Read some characteristic (example UUID)
                data = await client.read_gatt_char("6E400003-B5A3-F393-E0A9-E50E24DCCA9E")
                return Response({
                    'status': 'connected',
                    'data': data.decode() if data else None
                })
    except Exception as e:
        return Response({'error': str(e)}, status=400)