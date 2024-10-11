import { ScrollView, View, Text } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import MessageItem from "./MessageItem";
import { MessageProps } from "@/types";

export default function MessageList({ messages, currentUser }: DocumentData) {
  console.log("messages: ", messages);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 15 }}
    >
      {messages.map((message: MessageProps, index: number) => {
        return (
          <MessageItem
            message={message}
            key={index}
            currentUser={currentUser}
          />
        );
      })}
    </ScrollView>
  );
}
