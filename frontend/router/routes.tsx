import React from "react";
import { View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../pages/Intro";
import ChooseGame from "../pages/ChooseGame";
import GameDetails from "../pages/GameDetails/GameDetails";
import GamePart from "../pages/GamePart";

import BottomBar from "../components/BottomBar";

import { navigationRef } from "./rootNavigation";

const Stack = createStackNavigator();

const Routes = (props: any) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="ChooseGame" component={ChooseGame} />
        <Stack.Screen name="GameDetails" component={GameDetails} />
        <Stack.Screen name="GamePart" component={GamePart} />
      </Stack.Navigator>
      {props.children}
      <BottomBar navigation={navigationRef} />
    </NavigationContainer>
  );
};
export default Routes;
