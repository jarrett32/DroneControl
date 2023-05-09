import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ControlScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drone Control</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ControlScreen;
