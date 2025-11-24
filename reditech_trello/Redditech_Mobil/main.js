import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddList from "./components/AddList";
import CreateList from "./components/CreateList";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Liste">
        <Stack.Screen name="AddListe" component={AddList} />
        <Stack.Screen name="CreateList" component={CreateList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
