import React, { Component } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import CheckBox from "../components/CheckBox";
import SafeAreaView from "../components/SafeAreaView";
import Row from "../components/Row";

import { stages } from "../data/games";

import {
  getSelectedLayer,
  updateChildren,
  updateParents,
} from "../functions/GameSelect";

export default class GamePart extends Component<PartProps, StateProps> {
  //TODO react state update on unmounted
  state: StateProps = {
    stageName: "",
    selectedLevelString: "",
    selected: {},
  };
  async componentDidMount() {
    const { levelTreasures, levelName } = this.props.route.params;
    let { stageName } = this.props.route.params;

    //checks to see if treasures or level is selected and updates state accordingly
    let selectedLevelString = "";
    selectedLevelString = stageName + " " + levelName;
    await getSelectedLayer.bind(this, {
      currentName: selectedLevelString,
      childNames: Object.keys(levelTreasures),
    })();

    this.setState({ stageName, selectedLevelString });
  }
  render() {
    const {
      levelTreasures,
      levelName,
      gameTreasures,
    } = this.props.route.params;
    const { stageName, selectedLevelString } = this.state;
    const allSelected = this.state.selected[selectedLevelString];
    if (!stageName) return null;
    //A stage dependent background with a list of treasures and level name, all being selectable
    return (
      <ImageBackground
        source={stages[stageName].image}
        style={styles.image}
        blurRadius={10}
      >
        <SafeAreaView>
          <ScrollView>
            <Row>
              <CheckBox
                selected={allSelected}
                onPress={async (value: Boolean) => {
                  //updates treasures and stage potentially once level's selected quality updated
                  let newSelected = await updateChildren.bind(this, {
                    currentName: stageName + " " + levelName,
                    value,
                    childNames: gameTreasures[stageName][levelName],
                    selected: this.state.selected,
                  })();
                  const data = await updateParents.bind(this, {
                    currentName: stageName,
                    currentNameObject: gameTreasures[stageName],
                    selected: newSelected,
                  })();
                  newSelected = data.selected;
                  this.setState({ selected: newSelected });
                }}
              />
              <AppText
                propStyles={["label", "white", "center"]}
                style={{ width: "80%" }}
                text={levelName}
              />
            </Row>
            {Object.keys(levelTreasures)
              .sort()
              .map((treasure: string) => {
                const selectedTreasureString =
                  selectedLevelString + " " + treasure;
                const selected = this.state.selected[selectedTreasureString];
                return (
                  <View key={treasure}>
                    <Row>
                      <CheckBox
                        selected={selected}
                        onPress={async (value: Boolean) => {
                          //updateChildren called to apply selection to oneself
                          let newSelected = await updateChildren.bind(this, {
                            currentName: selectedTreasureString,
                            value,
                            childNames:
                              gameTreasures[stageName][levelName][treasure],
                            selected: this.state.selected,
                          })();
                          const data = await updateParents.bind(this, {
                            currentName: stageName,
                            currentNameObject: gameTreasures[stageName],
                            selected: newSelected,
                          })();
                          newSelected = data.selected;
                          this.setState({ selected: newSelected });
                        }}
                      />
                      <AppText
                        propStyles={["subLabel", "white"]}
                        text={treasure}
                      />
                    </Row>
                    <AppText
                      propStyles={["text", "white"]}
                      text={levelTreasures[treasure]}
                    />
                  </View>
                );
              })}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

interface ParamsProps {
  levelTreasures: { [key: string]: string };
  levelName: string;
  gameTreasures: {
    [key: string]: { [key: string]: { [key: string]: string } };
  };
  stageLinked: boolean;
  stageName: string;
}

interface RouteProps {
  params: ParamsProps;
}

interface PartProps {
  navigation: any;
  route: RouteProps;
}

interface StateProps {
  stageName: string;
  selectedLevelString: string;
  selected: { [key: string]: Boolean };
}
