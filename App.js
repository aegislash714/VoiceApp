import React from "react";
import { Image, StyleSheet, Button,  Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mood from "./source/components/Mood.js"
import Voice from "./source/components/Voice.js"
import Graph from "./source/components/Graph.js"

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mood" component={Mood} />
      <Tab.Screen name="Voice" component={Voice} />
      <Tab.Screen name="Graph" component={Graph} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

  button: {
    padding: 10,
    backgroundColor: "#DDDDDD",
  }
})

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}