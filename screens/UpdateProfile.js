import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../theme";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../firebase";

const UpdateProfile = () => {
  const currentUserUID = auth?.currentUser?.uid;

  const [newUserName, setNewUserName] = useState("");
  const [newProfileURL, setNewProfileURL] = useState("");

  const updateProfileFunc = async () => {
    const docRef = doc(db, "users", currentUserUID);

    if (newUserName === "" && newProfileURL === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill at least 1 field to continue",
        [
          {
            text: "OK",
            style: "default",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }

    if (newUserName !== "" && newUserName.length >= 5) {
      await setDoc(
        docRef,
        {
          username: newUserName,
        },
        { merge: true }
      );

      Alert.alert("Username Updated", "Your Username has been updated", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else if (newProfileURL !== "") {
      await setDoc(
        docRef,
        {
          profileURL: newProfileURL,
        },
        { merge: true }
      );

      Alert.alert("Profile Updated", "Your Profile has been updated", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };
  return (
    <View style={{ marginTop: 20, flex: 1, backgroundColor: "white" }}>
      <View style={{ flexdirection: "column", gap: 20 }}>
        <TextInput
          autoComplete="off"
          autoCorrect={false}
          onChangeText={(text) => setNewUserName(text)}
          placeholder="New Username"
          style={{
            borderWidth: 1,
            padding: 18,
            borderRadius: 5,
          }}
        />

        <TextInput
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          placeholder="New Profile URL"
          style={{
            borderWidth: 1,
            padding: 18,
            borderRadius: 5,
          }}
        />

        <TouchableOpacity
          onPress={updateProfileFunc}
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
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProfile;
