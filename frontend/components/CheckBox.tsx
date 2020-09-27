import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import { TouchableOpacity, StyleSheet } from "react-native";

const CheckBox = ({
  selected,
  onPress,
  size = 30,
  color = "#EEE",
  text = "",
  ...props
}: BoxProps) => (
  <TouchableOpacity onPress={() => onPress(!selected)} {...props}>
    <Icon
      size={size}
      color={color}
      name={selected ? "check-box" : "check-box-outline-blank"}
    />
  </TouchableOpacity>
);

export default CheckBox;

interface BoxProps {
  selected: Boolean;
  onPress: Function;
  size?: Number;
  color?: String;
  text?: String;
}
