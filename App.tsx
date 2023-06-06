import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConnectionScreen from './src/screens/ConnectionScreen';
import ControlScreen from './src/screens/ControlScreen';
import StatusScreen from './src/screens/StatusScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DroneProvider} from './src/DroneProvider';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <DroneProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Connection">
            <Stack.Screen name="Connection" component={ConnectionScreen} />
            <Stack.Screen name="Control" component={ControlScreen} />
            <Stack.Screen name="Status" component={StatusScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </DroneProvider>
  );
}

export default App;
