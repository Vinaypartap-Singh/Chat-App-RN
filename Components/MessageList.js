import { View, Text, ScrollView } from "react-native";
import React from "react";
import { auth } from "../firebase";
import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  const currentUser = auth?.currentUser.uid;
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      {messages.map((data, index) => {
        return (
          <MessageItem data={data} currentUser={currentUser} key={index} />
        );
      })}
    </ScrollView>
  );
}
