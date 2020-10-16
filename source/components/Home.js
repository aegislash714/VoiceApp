import React, { useState } from "react";
import { Image, StyleSheet, Button, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {
    const [count, setCount] = useState(0);
    const onPress = () => setCount(prevCount => prevCount + 1);
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{count}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          >
            <Image source={{uri:"https://reactnative.dev/img/tiny_logo.png"}}></Image>
          </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({

    count: {
      justifyContent: "center",
      paddingHorizontal: 10
    },
  
    button: {
      alignItems: "center",
      padding: 10,
      backgroundColor: "#DDDDDD",
      borderRadius: 20
    }
  })

