import React from 'react';
import {View, StyleSheet, Dimensions, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ControlScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topRightButton}>
        <Button
          title="Control"
          onPress={() => navigation.navigate('Control')}
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
  },
  topRightButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ControlScreen;
