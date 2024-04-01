import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatRoomHeader from "../Components/ChatRoomHeader";
import MessageList from "../Components/MessageList";
import theme from "../theme";
import { PaperAirplaneIcon } from "react-native-heroicons/outline";
import { auth, db } from "../firebase";
import { getRoomID } from "../utils/common";
import { addDoc, doc, Timestamp, collection } from "firebase/firestore";

export default function ChatRoom({ route }) {
  const data = route.params;
  const currentUser = auth.currentUser.uid;
  // console.log(data.user.userId, "-", currentUser)
  const [message, setMessage] = useState("");

  useEffect(() => {
    createRoomOrIfNotExists();
  }, []);

  const createRoomOrIfNotExists = async () => {
    let roomId = getRoomID(data?.user?.userId, auth?.currentUser?.uid);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    if (message === "") {
      Alert.alert("Empty", "Empty Message. Type a message to send.", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else {
      const roomId = getRoomID(data?.user?.userId, auth?.currentUser?.uid); // Get the room ID
      const roomRef = doc(db, "rooms", roomId); // Reference to the room document
      const messageCollectionRef = collection(roomRef, "messages"); // Reference to the messages collection within the room

      const newDoc = await addDoc(messageCollectionRef, {
        userId: currentUser,
        text: message,
        userInfo: data?.user,
      });

      console.log(newDoc.id);
      setMessage("");
    }
  };

  console.log(message);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View>
        <ChatRoomHeader user={data} />
        <MessageList />
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: theme.iconColor,
          padding: 10,
          borderRadius: 10,
          margin: 10,
          backgroundColor: theme.text,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flexDirection: "row" }}
        >
          <TextInput
            autoCorrect={false}
            onChangeText={(text) => setMessage(text)}
            placeholder="Type a message"
            style={{ width: "92%" }}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <PaperAirplaneIcon color={theme.iconColor} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
