import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConnectionScreen from './src/screens/ConnectionScreen';
import ControlScreen from './src/screens/ControlScreen';
import StatusScreen from './src/screens/StatusScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Control">
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="Control" component={ControlScreen} />
        <Stack.Screen name="Status" component={StatusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
