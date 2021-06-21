import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Text, View } from 'react-native';
import Dashboard from "./src/screens/Dashboard"
import StartScreen from "./src/screens/StartScreen"
import LoginScreen from "./src/screens/LoginScreen"
import MagicNumber from './src/screens/MagicNumber'
import QuickWord from './src/screens/QuickWord'

const Stack = createStackNavigator()


export default function App() {
  return (
    
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="MagicNumber" component={MagicNumber} />
          <Stack.Screen name="QuickWord" component={QuickWord} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
