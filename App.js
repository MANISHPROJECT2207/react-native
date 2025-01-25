import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import CategoryPage from './pages/CategoryPage';
import { StyleSheet, Text, View } from 'react-native';
import myhome from './pages/myhome'
import Cart from './pages/Cart';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={myhome}  options={{ headerShown: false }} />
        <Stack.Screen name="Category" component={CategoryPage} />
        <Stack.Screen name="Cart" component={Cart}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
