import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../theme";
import HomeHeader from "../Components/HomeHeader";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import UpdateProfile from "./UpdateProfile";

const ProfileScreen = () => {
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
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HomeHeader />
      <TouchableOpacity
        onPress={logOut}
        style={{
          backgroundColor: theme.primary,
          paddingVertical: 20,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>

      <UpdateProfile />
    </View>
  );
};

export default ProfileScreen;
