import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import ScreenContext from '../ScreenContext';

const ConnectionScreen = () => {
  const [devices, setDevices] = useState([]);
  const [manager, setManager] = useState(null);
  const {setScreen} = useContext(ScreenContext);

  useEffect(() => {
    if (!manager) {
      setManager(new BleManager());
    }
  }, [manager]);

  const scanForDevices = () => {
    if (!manager) return;

    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('Scanning error:', error);
            return;
          }

          if (device && device.name) {
            setDevices(prevDevices => {
              const existingDevice = prevDevices.find(d => d.id === device.id);
              if (!existingDevice) {
                return [...prevDevices, {id: device.id, name: device.name}];
              }
              return prevDevices;
            });
          }
        });
      }
    }, true);

    return () => {
      subscription.remove();
      manager.stopDeviceScan();
    };
  };

  const connectToDevice = async device => {
    if (!manager) return;

    console.log('Connecting to:', device.name);

    try {
      const connectedDevice = await manager.connectToDevice(device.id);
      console.log('Connected to device:', connectedDevice);
    } catch (error) {
      console.log('Connection error:', error);
    }
  };

  const onConnect = () => {
    setScreen('Control');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect to Drone</Text>
      <TouchableOpacity onPress={scanForDevices} style={styles.scanButton}>
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableOpacity>
      <FlatList
        data={devices}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            style={styles.deviceItem}
            onPress={() => connectToDevice(item)}>
            <Text style={styles.deviceName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#F5FCFF',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    width: 200,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  scanButtonText: {
    marginLeft: 5,
    fontSize: 18,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
  },
  deviceName: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ConnectionScreen;
