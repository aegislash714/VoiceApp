import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Button,  Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Mood from "./source/components/Mood.js"
import Graph from "./source/components/Graph.js"
import moment from 'moment';

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 300,
  },
};

let date = moment()
  .format("MM-DD-YYYY");

// 10/23/2020
const retrieveData = async (date) => {
  try {
    const value = await AsyncStorage.getItem(date);
    return value; // the value is either a mood for the day, or is null (empty)
  } catch (error) {
  }
};

function MyStack() {
  const [submitted, setSubmitted] = useState(retrieveData(date));

  // useEffect(() => {
  //   const wrapper = async () => {
  //     let result = await retrieveData(date);
  //     console.log("moodSubmitted", result);
  //     setSubmitted(result); // true or false
  //   }
  //
  //   wrapper();
  // });

  return (
  <Stack.Navigator initialRouteName={"Mood"}>
    <Stack.Screen name="Mood" component={Mood} />
    <Stack.Screen
      name="Graph"
      component={Graph}
    />
  </Stack.Navigator>
  )

  // <Tab.Navigator initialRouteName={moodSubmitted ? "Graph" : "Mood"}> // does not work
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
      <MyStack />
    </NavigationContainer>
  );
}
