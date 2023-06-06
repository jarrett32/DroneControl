import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useSendDataToNano from '../sendData';
import {DroneContext} from '../DroneProvider';

const DroneStatus = {
  UNARMED: 'unarmed',
  ARMED: 'armed',
  FLYING: 'flying',
  LANDING: 'landing',
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DroneButton = ({title, onPress, ...props}) => (
  <View style={styles.buttonContainer}>
    <Button title={title} onPress={onPress} {...props} />
  </View>
);

const ControlScreen = () => {
  const navigation = useNavigation();
  const sendDataToNano = useSendDataToNano();
  const context = useContext(DroneContext);
  const [droneStatus, setDroneStatus] = useState(DroneStatus.UNARMED);

  const handleArmDisarm = () => {
    if (droneStatus === DroneStatus.UNARMED) {
      setDroneStatus(DroneStatus.ARMED);
      sendDataToNano('arm', {});
    } else {
      setDroneStatus(DroneStatus.UNARMED);
      sendDataToNano('disarm', {});
    }
  };

  const handleLand = () => {
    if (
      droneStatus === DroneStatus.ARMED ||
      droneStatus === DroneStatus.FLYING
    ) {
      setDroneStatus(DroneStatus.LANDING);
      sendDataToNano('land', {});
    }
  };

  return (
    <View style={styles.container}>
      {context.connected ? (
        <TouchableOpacity
          style={styles.connectionStatus}
          onPress={() => navigation.navigate('Connection')}>
          <View style={styles.connectedDot} />
          <Text style={styles.text}>{context.name}</Text>
          <Text style={styles.subtext}>{context.ip}</Text>
        </TouchableOpacity>
      ) : null}
      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Drone Status:</Text>
          <Text style={styles.statusValue}>{droneStatus}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <DroneButton
            title={droneStatus === DroneStatus.UNARMED ? 'Arm' : 'Disarm'}
            onPress={handleArmDisarm}
          />
          <DroneButton title="Land" onPress={handleLand} />
          <DroneButton
            title="Status"
            onPress={() => navigation.navigate('Status')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginLeft: 10,
  },
  subtext: {
    fontSize: 18,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  statusValue: {
    fontSize: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    width: '90%',
  },
  connectedDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green',
  },
});

export default ControlScreen;
