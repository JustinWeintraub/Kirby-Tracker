import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { NavigationContext } from "@react-navigation/native";

import AppText from "../../components/AppText";
import SafeAreaView from "../../components/SafeAreaView";

import StageDetails from "./StageDetails";

import axios from "axios";

export default class GameDetails extends Component<DetailsProps, DetailsState> {
  static contextType = NavigationContext;

  state: Readonly<DetailsState> = {
    levelNames: {},
    gameTreasures: {},
    extraOrder: [],
    extraNames: {},
    extraTreasures: {},
    gameName: "",
    selectedOrder: {},
    stageOrder: [],
  };
  componentDidMount() {
    this.navigatedTo();
  }
  navigatedTo() {
    const game = this.props.route.params.game;
    const gameName = game.name;
    const stageOrder = game.stageOrder;
    this.setState({ gameName, stageOrder });

    //checks to see if the game has extra data then adds to checks accordingly
    const extraOrder = game.extraOrder;
    if (extraOrder != undefined) this.setState({ extraOrder });
    const url = gameName.split(" ").join("%20");
    const checks = ["Game"];
    if (gameName === "Kirby Star Allies") checks.push("Extras");

    //sets data of game data and extra data by calling database
    for (const check of checks) {
      axios
        .get(
          "https://us-central1-kirbytracker.cloudfunctions.net/get" +
            check +
            "/?game=" +
            url
        )
        .then((res) => {
          this.setData(res.data.data.storedData, check);
        })
        .catch((err) => {
          console.log(err);
          console.log("Error retrieving data");
        });
    }
  }

  setData(gameTreasures: TreasureData, type: String) {
    //levelNames is a list of levelNames
    //selectedOrder converts gameTreasures into a list of stages that are dictionaries of levels
    let levelNames: GameData = {};

    for (const stage of Object.keys(gameTreasures)) {
      //gets levelNames from treasure list
      levelNames[stage] = Object.keys(gameTreasures[stage]);
    }

    for (const stage in levelNames) {
      //removing data-less levels from treasures
      const tempNames = levelNames;
      for (const level in tempNames[stage]) {
        const levelName = levelNames[stage][level];
        if (Object.keys(gameTreasures[stage][levelName]).length === 0) {
          levelNames[stage].splice(Number(level), 1);
        }
      }
    }
    if (type == "Game") this.setState({ levelNames, gameTreasures });
    if (type == "Extras")
      this.setState({ extraNames: levelNames, extraTreasures: gameTreasures });
  }

  render() {
    const {
      levelNames,
      stageOrder,
      gameTreasures,
      extraOrder,
      extraNames,
      extraTreasures,
    } = this.state;

    //creates background then displays gameData and extraData in tables
    return (
      <ImageBackground
        source={require("../../assets/sky.jpeg")}
        style={{ width: "100%", height: "100%" }}
        blurRadius={10}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {stageOrder.length === 0 && (
              <AppText
                text={"Loading"}
                propStyles={["label", "white", "center"]}
              />
            )}
            {stageOrder.map((stage) => {
              if (!levelNames[stage]) return null;
              return (
                <StageDetails
                  key={stage}
                  levelNames={levelNames[stage]}
                  gameTreasures={gameTreasures}
                  stageName={stage}
                />
              );
            })}
            {extraOrder.length !== 0 && (
              <AppText
                text={"Extras"}
                propStyles={["subLabel", "white", "center"]}
              />
            )}
            {extraOrder.length !== 0 &&
              extraOrder.map((extra) => {
                if (!extraNames[extra]) return null;
                return (
                  <StageDetails
                    key={extra}
                    levelNames={extraNames[extra]}
                    gameTreasures={extraTreasures}
                    stageName={extra}
                  />
                );
              })}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
  },
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});

interface DetailsProps {
  navigation: any;
  route: any;
}

interface DetailsState {
  gameName: String;
  levelNames: GameData;
  gameTreasures: TreasureData;
  selectedOrder: SelectedOrderProps;
  stageOrder: Array<string>;
  extraOrder: Array<string>;
  extraNames: GameData;
  extraTreasures: TreasureData;
}

interface GameData {
  [key: string]: Array<string>;
}
interface TreasureData {
  [key: string]: { [key: string]: string | { [key: string]: string } };
}
interface SelectedOrderProps {
  [key: string]: { [key: string]: { [key: string]: string } };
}
