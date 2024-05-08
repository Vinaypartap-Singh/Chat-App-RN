import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import theme from "../theme";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function HomeHeader() {
  const navigation = useNavigation();
  const uid = auth?.currentUser?.uid;
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const getInfo = async () => {
        const docRef = doc(db, "users", `${uid}`);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
          setLoading(false);
        } else {
          Alert.alert("Not Found", "No such Document Found", [
            {
              text: "OK",
              style: "default",
            },
            {
              text: "Cancel",
              style: "default",
            },
          ]);
        }
      };

      getInfo();
    } catch (error) {
      Alert.alert("Not Found", error.message, [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "default",
        },
      ]);
    }
  }, []);

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
    <View style={{ backgroundColor: "white" }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={theme.primary} />
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                VMChat
              </Text>
              <Text style={{ marginTop: 5, fontWeight: "bold" }}>
                Welcome: {userInfo?.username}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Image
                alt="Profie Image"
                source={{ uri: userInfo?.profileURL }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  objectFit: "cover",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
