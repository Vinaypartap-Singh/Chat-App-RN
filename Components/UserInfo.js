import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function UserInfo({ user }) {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Messages", {
            user,
          })
        }
        style={{
          marginTop: 20,
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 10,
          borderBottomColor: theme.secondary,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{
              uri: user?.profileURL,
            }}
            style={{
              height: 70,
              width: 70,
              borderRadius: 100,
              objectFit: "cover",
            }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {user?.username}
            </Text>
            <Text style={{ color: theme.iconColor, marginTop: 10 }}>
              Message
            </Text>
          </View>
        </View>
        <View>
          <ChevronRightIcon color={theme.iconColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
