import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph } from 'react-native-chart-kit'

export default function Graph({navigation}) {

    // Get final emotion at end of day
    // For each day, read emotion and add to count
    // Array / results = [3, 5, 4] happy, neutral, sad
    // happy = results[0], neutral = results[1], sad = results[2]

    const data = [
        {
          name: "Happy",
          count: 21500000,
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Neutral",
          count: 2800000,
          color: "blue",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Sad",
          count: 5207612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
      ];

    return (
        <View>
            <Text>Bezier Line Chart</Text>
            <PieChart
                data={data}
                width={Dimensions.get("window").width}
                height={220}
                accessor="count"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
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