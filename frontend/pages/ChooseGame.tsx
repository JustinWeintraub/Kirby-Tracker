import AppText from "../components/AppText";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Table from "../components/Table";
import SafeAreaView from "../components/SafeAreaView";

import { games } from "../data/games";

function _onSubmit(navigation: any, game: GameProps) {
  navigation.navigate("GameDetails", { game: game });
}
function Child(props: ChildProps) {
  const { navigation, object } = props;
  const game = object;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={game.name}
      onPress={() => {
        _onSubmit(navigation, game);
      }}
    >
      <Image style={styles.image} source={game.image} />
    </TouchableOpacity>
  );
}
export default function ChooseGame(props: Props) {
  return (
    <ImageBackground
      source={require("../assets/sky.jpeg")}
      style={{ width: "100%", height: "100%" }}
      blurRadius={5}
    >
      <SafeAreaView style={styles.container}>
        <AppText
          propStyles={["label", "white", "center"]}
          text={"Pick a Game You're Playing"}
        />
        <Table
          columns={2}
          Child={Child}
          objects={games}
          navigation={props.navigation}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});

interface Props {
  navigation: any; //TODO
}
interface GameProps {
  image: number;
  name: string;
}
interface ChildProps {
  object: GameProps;
  navigation: any;
}
