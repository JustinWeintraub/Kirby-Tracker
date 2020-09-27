import React from "react";
import { View, ViewStyle, Text, StyleSheet } from "react-native";

export default function AppText(props: TextProps) {
  const { propStyles, style, text } = props;
  return (
    <View style={style}>
      <Text
        style={propStyles.map((exStyle: string) => {
          return styles[exStyle];
        })}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create<StyleProps>({
  text: {
    fontSize: 30,
    color: "black",
  },
  subText: {
    fontSize: 20,
    color: "black",
  },
  label: {
    fontSize: 50,
    color: "black",
  },
  subLabel: {
    fontSize: 40,
    color: "black",
  },
  white: {
    color: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: "black",
    textShadowRadius: 3,
  },
  center: {
    textAlign: "center",
  },
});

interface StyleProps {
  [key: string]: ViewStyle;
}
interface TextProps {
  propStyles: Array<string>;
  style?: ViewStyle;
  text: string;
}
