import { ScrollView } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import MessageItem from "./MessageItem";
import { MessageProps } from "@/types";

export default function MessageList({ messages, currentUser, lastMsgScrollViewRef }: DocumentData) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 15 }}
      ref={lastMsgScrollViewRef} // ref from chatRoom
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
