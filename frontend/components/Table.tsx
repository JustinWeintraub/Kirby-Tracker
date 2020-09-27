import React from "react";
import { StyleSheet, View } from "react-native";
import Row from "./Row";

export default function Table(props: TableProps) {
  const { columns, objects, navigation, Child } = props;
  const splitObjects = [];
  const tempObjects = [...objects];
  while (
    tempObjects.length > 0 //splits objects up based on columns
  ) {
    splitObjects.push(tempObjects.splice(0, columns));
  }
  return (
    <View style={styles.container}>
      {splitObjects.map((objectGroup, index) => {
        return (
          <Row
            key={"table " + index}
            style={{ justifyContent: "space-around" }}
          >
            {objectGroup.map((object, index2) => {
              return (
                <Child
                  key={"table " + index + " " + index2}
                  object={object}
                  navigation={navigation}
                />
              );
            })}
          </Row>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  image: {
    width: 200,
    height: 200,
  },
});

interface TableProps {
  columns: number;
  objects: Array<any>;
  navigation: any;
  Child: Function;
}
