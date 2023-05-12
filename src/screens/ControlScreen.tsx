import React from 'react';
import {View, StyleSheet, Dimensions, Button} from 'react-native';
import {KorolJoystick} from 'korol-joystick';
import {useNavigation} from '@react-navigation/native';
import sendDataToNano from '../sendData';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const handleMove = data => {
  sendDataToNano(data);
};

const ControlScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topRightButton}>
        <Button title="Status" onPress={() => navigation.navigate('Status')} />
      </View>
      <View style={styles.joystickContainer}>
        <KorolJoystick color="#06b6d4" radius={125} onMove={handleMove} />
        <KorolJoystick color="#06b6d4" radius={125} onMove={handleMove} />
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
  },
  topRightButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  joystickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    verticalAlign: 'center',
  },
});

export default ControlScreen;
