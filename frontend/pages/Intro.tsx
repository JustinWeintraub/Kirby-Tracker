import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

//import functions from "@react-native-firebase/functions";
import AppText from "../components/AppText";

function _onSubmit(props: any) {
  props.navigation.navigate("ChooseGame");
}

export default function Intro(props: any) {
  return (
    <View>
      <ImageBackground
        source={require("../assets/sky.jpeg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={[styles.object, styles.backdrop]}>
            <Text style={styles.text}>Welcome to Kirby Tracker!</Text>
          </View>
          <View>
            <Image source={require("../assets/kirby.png")} />
          </View>
          <View style={styles.object}>
            <TouchableOpacity
              onPress={() => _onSubmit(props)}
              style={styles.selectionButton}
            >
              <AppText
                propStyles={["subText", "white", "center"]}
                text={"Pick a Game You're Playing"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  object: {
    width: "50%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#DDDDDD",
    fontSize: 50,
    textAlign: "center",
  },
  backdrop: {
    backgroundColor: "#884444",
    borderRadius: 30,
    width: "100%",
  },
  selectionButton: {
    backgroundColor: "#4444FF",
    borderRadius: 50,
    height: 50,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
