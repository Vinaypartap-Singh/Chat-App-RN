import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../theme";
import HomeHeader from "../Components/HomeHeader";

const ProfileScreen = () => {
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
    </View>
  );
};

export default ProfileScreen;
