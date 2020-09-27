import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export default function Row(props: RowProps) {
  return <View style={[styles.row, props.style]}>{props.children}</View>;
}

interface RowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
