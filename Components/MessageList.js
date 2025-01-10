import React from "react";
import { FlatList } from "react-native";
import { auth } from "../firebase";
import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  const currentUser = auth?.currentUser.uid;

  const renderItem = ({ item }) => (
    <MessageItem data={item} currentUser={currentUser} />
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => index.toString()} // Use a unique key for each item
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
}
