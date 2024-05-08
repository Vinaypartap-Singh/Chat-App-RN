import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function ChatRoomHeader({ user }) {
  const currentUserUid = auth?.currentUser?.uid;
  const currentDate = new Date();

  const userOnline =
    user?.user?.status.toDate().toLocaleTimeString() === currentDate;
  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = doc(db, "users", currentUserUid);

      await updateDoc(docRef, {
        status: serverTimestamp(),
      });
    };

    return () => {
      getUserInfo();
    };
  }, []);
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
            <Text style={{ fontWeight: "bold" }}>{user?.user?.username}</Text>
            {userOnline ? (
              <Text>Online</Text>
            ) : (
              <Text>
                Last Seen at{" "}
                {user?.user?.status.toDate().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
