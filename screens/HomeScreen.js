import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import { View, Platform, StatusBar, Alert } from "react-native";
import HomeHeader from "../Components/HomeHeader";
import ListUsers from "../Components/ListUsers";
import { auth } from "../firebase";

export default function HomeScreen() {
  const navigation = useNavigation();
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        Alert.alert("Error", error?.message, [
          {
            text: "OK",
            style: "default",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      });
  };

  // Determine dynamic marginTop for Android
  const dynamicMarginTop =
    Platform.OS === "android" ? StatusBar.currentHeight || 40 : 0;
  const paddingTop = Platform.OS === "android" ? 20 : 0;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        marginTop: dynamicMarginTop,
        paddingTop: paddingTop,
      }}
    >
      <View></View>
      <HomeHeader />
      <ListUsers />
    </View>
  );
}
