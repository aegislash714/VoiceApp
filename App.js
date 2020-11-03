import React from "react";
import { Image, StyleSheet, Button,  Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mood from "./source/components/Mood.js"
import Voice from "./source/components/Voice.js"
import Graph from "./source/components/Graph.js"
import moment from 'moment';

const Tab = createBottomTabNavigator();

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

let moodSubmitted = retrieveData(date); // either null or true
console.log('moodSubmitted', moodSubmitted);

function MyTabs() {
  // "Mood" if moodSubmitted else "Graph"
  return (
  moodSubmitted
  ?
  <Tab.Navigator initialRouteName={"Graph"}>
    <Tab.Screen name="Mood" component={Mood} />
    <Tab.Screen name="Voice" component={Voice} />
    <Tab.Screen name="Graph" component={Graph} />
  </Tab.Navigator>
  :
  <Tab.Navigator initialRouteName={"Mood"}>
    <Tab.Screen name="Mood" component={Mood} />
    <Tab.Screen name="Voice" component={Voice} />
    <Tab.Screen name="Graph" component={Graph} />
  </Tab.Navigator>
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
      <MyTabs />
    </NavigationContainer>
  );
}
