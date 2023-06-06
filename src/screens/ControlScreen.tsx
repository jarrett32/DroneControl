import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Button, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useSendDataToNano from '../sendData';

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
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default ControlScreen;
