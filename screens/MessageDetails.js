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
import {
  addDoc,
  doc,
  Timestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export default function ChatRoom({ route }) {
  const data = route.params;
  const currentUser = auth.currentUser.uid;
  // Room ID
  // console.log(data.user.userId, "-", currentUser)
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    createRoomOrIfNotExists();

    const roomId = getRoomID(data?.user?.userId, auth?.currentUser?.uid);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snaphot) => {
      let allMessages = snaphot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    return unsub;
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
        createdAt: Timestamp.fromDate(new Date()),
      });

      setMessage("");
    }
  };

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
        <MessageList messages={messages} />
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
