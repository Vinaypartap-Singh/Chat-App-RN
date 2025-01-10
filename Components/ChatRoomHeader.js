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
  const getFormattedTime = (timestamp) => {
    const statusDate = timestamp.toDate(); // Convert Firestore timestamp to Date object
    const now = new Date();

    // Helper function to check if two dates are on the same day
    const isSameDay = (date1, date2) =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();

    // Check if the date is today
    if (isSameDay(statusDate, now)) {
      return statusDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Check if the date is yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (isSameDay(statusDate, yesterday)) {
      return `Yesterday, ${statusDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Check if the date is within the last 30 days
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    if (statusDate > thirtyDaysAgo) {
      return statusDate.toLocaleString([], {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // For dates over a month ago, show the full date and time
    return statusDate.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formattedTime = getFormattedTime(user?.user?.status);

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
              <Text>Last Seen at {formattedTime}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
