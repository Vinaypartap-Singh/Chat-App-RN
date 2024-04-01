import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function ChatRoomHeader({ user }) {
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color={theme.primary} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{
              uri: user?.user?.profileURL,
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
              objectFit: "cover",
            }}
          />
          <View>
            <Text>{user?.user?.username}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
