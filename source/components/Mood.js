import React from "react";
import { Pressable, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function Mood({navigation}) {

  const storeData = async (date, mood) => {
      try {
        // console.log(date)
        // const jsonObject = {date, mood};
        // const jsonString = JSON.stringify(jsonObject);
        await AsyncStorage.setItem(date, mood);
      } catch (error) {}
    };

    const clearData = async () => {
      AsyncStorage.clear();
    }

    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(date);
        if (value !== null) {
          console.log(value);
        }
      } catch (error) {
      }
    };

    let date = moment()
      .format("MM-DD-YYYY");
      console.log(date);

    const onPressMood = (mood) => {
      storeData(date, mood);
      navigation.navigate("Graph", { updated: true });
    }

// <Pressable onPress={clearData} style={({ pressed }) => [ { opacity: pressed ? '0.5' : '1.0' }, styles.button ]}>
// <Fontisto name="frowning" size={36} color="purple" style={{height: 38}}/>
// </Pressable>

    return (
      <View style={styles.container}>
          <View>
            <Text style={styles.title}>
                How are you feeling today?
            </Text>
          </View>
          <View style={styles.buttonrow}>
            <Pressable onPress={() => onPressMood("happy")} style={({ pressed }) => [ { opacity: pressed ? '0.5' : '1.0' }, styles.button ]}>
              <Fontisto name="smiley" size={36} color="purple" style={{height: 38}}/>
            </Pressable >
            <Pressable onPress={() => onPressMood("neutral")} style={({ pressed }) => [ { opacity: pressed ? '0.5' : '1.0' }, styles.button ]}>
              <Fontisto name="neutral" size={38} color="purple" style={{height: 40}}/>
            </Pressable>
            <Pressable onPress={() => onPressMood("sad")} style={({ pressed }) => [ { opacity: pressed ? '0.5' : '1.0' }, styles.button ]}>
              <Fontisto name="frowning" size={36} color="purple" style={{height: 38}}/>
            </Pressable>
          </View>
      </View>
    );
  }

  const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink"
    },

    title: {
        alignItems: "center",
        textAlign: "center",
        fontSize: 26,
        fontWeight: "400",
        color: "purple",
        fontFamily: "Times New Roman"
    },

    button: {
        alignItems: "center",
        padding: 10,
        borderRadius: 50
    },

    image: {
        height: 50,
        width: 50
    },

    buttonrow: {
        flexDirection: "row"
    }
  })
