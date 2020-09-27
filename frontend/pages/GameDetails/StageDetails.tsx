import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

import { NavigationContext } from "@react-navigation/native";

import AppText from "../../components/AppText";
import CheckBox from "../../components/CheckBox";
import Row from "../../components/Row";
import Table from "../../components/Table";

import { stages } from "../../data/games";

import {
  updateChildren,
  updateParents,
  getSelectedLayer,
} from "../../functions/GameSelect";

function _onSubmit(
  levelName: string,
  gameTreasures: TreasureData,
  navigation: any,
  stageName: string
) {
  let levelTreasures = {};
  if (!stageName) levelTreasures = gameTreasures[levelName];
  else levelTreasures = gameTreasures[stageName][levelName];
  //passing level data to game part
  navigation.navigate("GamePart", {
    levelName,
    gameTreasures,
    levelTreasures,
    stageName,
  });
}

function Child(this: any, props: ChildProps) {
  //displaying a row in a table with selectable level/part names

  const { object, navigation } = props;
  const completeLevel = object;
  const { gameTreasures, stageName } = this.props;
  const { stageLinked } = this.state;

  let levelKey = ""; //getting name of level based on if all the levels have the same name scheme
  if (stageLinked) {
    levelKey = completeLevel.split(/(\d+)/)[1];
  } else {
    levelKey = completeLevel;
  }

  //selectedString to check if level selected in recursive algorithm
  let selectedString = stageName + " " + completeLevel;
  const selected = this.state.selected[selectedString];
  return (
    <Row>
      <CheckBox
        selected={selected}
        onPress={async (value: Boolean) => {
          //updates other attributes (ie: treasure, stage) selected property
          let newSelected = await updateChildren.bind(this, {
            currentName: selectedString,
            value,
            childNames: gameTreasures[stageName][completeLevel],
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
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          _onSubmit(completeLevel, gameTreasures, navigation, stageName);
        }}
        style={{ width: stageLinked ? 150 : 350 }}
      >
        <AppText text={levelKey} propStyles={["subLabel", "white", "center"]} />
      </TouchableOpacity>
    </Row>
  );
}
export default class GameDetails extends Component<DetailsProps, DetailsState> {
  static contextType = NavigationContext;

  state: Readonly<DetailsState> = {
    selected: {},
    stageLinked: true,
  };
  async componentDidMount() {
    const navigation = this.context;
    await this.changeSelected();
    navigation.addListener("focus", async () => {
      await this.changeSelected();
    });
  }
  async changeSelected() {
    const { levelNames, stageName } = this.props;
    for (let i = 0; i < levelNames.length - 1; i++) {
      //check to see if the same stage name scheme by checking if each level starts with the same string (ie, Patched Plains)
      //if goes through entire loop, stageLinked
      if (levelNames[i].split(" ")[0] != levelNames[i + 1].split(" ")[0]) {
        await this.setState({ stageLinked: false });
        break;
      }
    }
    //checks to see if the stage was selected or it's levels and sets state accordingly
    await getSelectedLayer.bind(this, {
      currentName: stageName,
      childNames: levelNames,
    })();
  }
  render() {
    const navigation = this.context;
    const { gameTreasures, stageName } = this.props;
    const { stageLinked } = this.state;

    let { levelNames } = this.props;
    const levelOrder = stages[stageName].levelOrder;
    if (levelOrder) levelNames = levelOrder;
    else levelNames = levelNames.sort();

    let selected = this.state.selected[stageName];

    if (Object.keys(gameTreasures).length === 0) return null;
    return (
      <View style={{ height: stageLinked ? 400 : 800 }} key={stageName}>
        <Row>
          <CheckBox
            selected={selected}
            onPress={async (value: Boolean) => {
              const newSelected = await updateChildren.bind(this, {
                currentName: stageName,
                value,
                childNames: gameTreasures[stageName],
                selected: this.state.selected,
              })();
              this.setState({ selected: newSelected });
            }}
          />
          <AppText
            text={stageName}
            propStyles={["text", "center", "white"]}
            style={{ width: "95%" }}
          />
        </Row>
        <View
          style={[
            {
              backgroundColor: stages[stageName].color,
            },
            styles.tableStyle,
          ]}
        >
          <Table
            columns={stageLinked ? 2 : 1}
            Child={Child.bind(this)}
            objects={[...levelNames]}
            navigation={navigation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tableStyle: {
    flex: 1,
    borderColor: "black",
    borderWidth: 3,
    margin: 5,
  },
});

interface ChildProps {
  object: string;
  navigation: any;
}

interface DetailsProps {
  levelNames: Array<string>;
  stageName: string;
  gameTreasures: TreasureData;
}

interface DetailsState {
  selected: { [key: string]: Boolean };
  stageLinked: boolean;
}

interface TreasureData {
  [key: string]: { [key: string]: string | { [key: string]: string } };
}
