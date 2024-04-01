import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

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
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={logOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
