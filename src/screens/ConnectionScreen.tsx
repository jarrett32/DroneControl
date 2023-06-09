import React, {useState, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useSendDataToNano from '../sendData';
import {DroneContext} from '../DroneProvider';

const ConnectionScreen = () => {
  const navigation = useNavigation();
  const sendDataToNano = useSendDataToNano();
  const context = useContext(DroneContext);

  const [ip, setIp] = useState('');

  const connectToDrone = async (newIp: string, newName: string) => {
    try {
      console.log('Connecting to drone...' + newIp);
      await sendDataToNano('connect-app', {}, newIp);
      context.setConnected(true);
      context.setName(newName);
      context.setIp(newIp);
      console.log('Connected to drone, ' + newIp);
      navigation.navigate('Control');
    } catch (error) {
      context.setConnected(false);
      console.log(error);
    }
  };

  const disconnectFromDrone = async () => {
    try {
      console.log('Disconnecting from drone...' + context.ip);
      await sendDataToNano('disconnect-app', {}, context.ip);
      context.setConnected(false);
      context.setName('');
      context.setIp('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {context.connected ? (
        <TouchableOpacity
          style={styles.connectionStatus}
          onPress={disconnectFromDrone}>
          <View style={styles.connectedDot} />
          <Text style={styles.text}>{context.name}</Text>
          <Text style={styles.subtext}>{context.ip}</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>Connect</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => connectToDrone('192.168.12.108', 'Home')}>
          <Text style={styles.buttonText}>Home</Text>
          <Text style={styles.subtext}>192.168.12.108</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => connectToDrone('172.20.10.9', 'Hotspot')}>
          <Text style={styles.buttonText}>Hotspot</Text>
          <Text style={styles.subtext}>172.20.10.9</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.inputLabel}>Other IP:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter IP"
          onChangeText={setIp}
          value={ip}
        />
        <Button
          title="Submit"
          onPress={() => {
            connectToDrone(ip, 'Other');
            setIp('');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    marginLeft: 10,
  },
  subtext: {
    fontSize: 18,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  button: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    width: '100%',
  },
  connectedDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green',
  },
});

export default ConnectionScreen;
