import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig"; // Import your Firebase config
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AllMoves from "./pages/AllMoves";
import SelectMove from "./pages/SelectMove";
import MoveDetailPage from "./pages/movesPage/MoveDetailPage";

const firebaseApp = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="AllMoves" component={AllMoves} />
          <Stack.Screen name="SelectMove" component={SelectMove} />
          <Stack.Screen name="MoveDetailPage" component={MoveDetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
