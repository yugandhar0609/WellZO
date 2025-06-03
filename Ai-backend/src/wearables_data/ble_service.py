import asyncio
from bleak import BleakScanner, BleakClient

class BLEService:
    # Standard Nordic UART Service (NUS) UUIDs
    NUS_SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
    NUS_RX_CHAR_UUID = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"  # Write
    NUS_TX_CHAR_UUID = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"  # Notify

    def __init__(self):
        self.received_data = []
        
    def notification_handler(self, sender, data):
        """Handle incoming data from BLE device"""
        decoded_data = data.decode('utf-8')
        self.received_data.append(decoded_data)
        print(f"Received: {decoded_data}")

    async def scan_devices(self):
        devices = await BleakScanner.discover()
        nordic_devices = [
            {
                'address': d.address,
                'name': d.name or 'Unknown',
                'rssi': d.rssi
            }
            for d in devices
            if d.name and ('Nordic' in d.name or 'nRF' in d.name)
        ]
        return nordic_devices

    async def connect_and_read(self, device_address):
        try:
            async with BleakClient(device_address) as client:
                # Clear previous data
                self.received_data = []

                # Enable notifications
                await client.start_notify(
                    self.NUS_TX_CHAR_UUID, 
                    self.notification_handler
                )

                # Write command to request data (customize based on your needs)
                command = "READ_DATA\n"
                await client.write_gatt_char(
                    self.NUS_RX_CHAR_UUID, 
                    command.encode('utf-8')
                )

                # Wait for data
                await asyncio.sleep(2)

                # Stop notifications
                await client.stop_notify(self.NUS_TX_CHAR_UUID)

                return {
                    'data': self.received_data,
                    'device_id': device_address
                }

        except Exception as e:
            return {'error': str(e)}