import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import { View } from "react-native";
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
      }}
    >
      <View></View>
      <HomeHeader />
      <ListUsers />
    </View>
  );
}
