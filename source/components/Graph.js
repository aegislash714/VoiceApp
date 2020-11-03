import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, AsyncStorage, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph } from 'react-native-chart-kit'

export default function Graph({route, navigation}) {
    // Get final emotion at end of day
    // For each day, read emotion and add to count
    // Array / results = [3, 5, 4] happy, neutral, sad
    // happy = results[0], neutral = results[1], sad = results[2]

    const [finalData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataChanged, setDataChanged] = useState(false);

    const showAllData = async () => {
      let data = {};
      let allKeys = await AsyncStorage.getAllKeys(); // ['10/23/2020', '10/24/2020']
      let stores = await AsyncStorage.multiGet(allKeys); // [['10/23/2020', 'happy'], ['10/24/2020', 'happy']]
      stores.forEach((store) => {
        let dateString = store[0];
        let mood = store[1];
        data[dateString] = mood;
      });
      return data;
    }

    const count = async () => {
      let counts = {
        "happy": 0,
        "sad": 0,
        "neutral": 0
      }

      let moodsByDay = await showAllData(); // finish loading data BEFORE counting it

      await Object.entries(moodsByDay).forEach(([date, mood]) => {
        counts[mood] += 1
      });
      return counts;
    }

    useEffect(() => {
      console.log("routeParams", route.params, !!route.params);
      setDataChanged(route.params ? !dataChanged : dataChanged); // true : false
    }, []); // won't work, only running once

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);

        let counts = await count();
        const data = [
            {
              name: "Happy",
              count: counts["happy"],
              color: "green",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "Neutral",
              count: counts["neutral"],
              color: "blue",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "Sad",
              count: counts["sad"],
              color: "red",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
          ];

        // console.log(data);
        setData(data);
        setLoading(false);
      }

      fetchData();
    }, [dataChanged]); // only run when dataChanged updates

    return (
      loading
      ?
      <View>
        <Text>Loading...</Text>
      </View>
      :
      <View style={styles.pieChart}>
        <Text style={styles.pieTitle}>Mood Chart</Text>
        <PieChart
          data={finalData}
          width={Dimensions.get("window").width}
          height={220}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {borderRadius: 16},
          propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
              }
          }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pieTitle: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "400",
    color: "purple",
    fontFamily: "Times New Roman",
  },

  pieChart: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      backgroundColor: "pink",
  }
})
