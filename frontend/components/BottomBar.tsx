import React from "react";
import { Platform, StyleSheet, Text, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function BottomBar(props) {
  //const navigation = useNavigation();
  if (Platform.OS === "android") return null;
  return (
    <View style={styles.container}>
      <Icon
        size={50}
        style={styles.icon}
        name={"keyboard-backspace"}
        onPress={() => {
          const navigation = props.navigation.current;
          if (navigation.canGoBack()) props.navigation.current.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#eeeeee",
    height: 70,
    right: 0,
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
    alignSelf: "center",
  },
});
