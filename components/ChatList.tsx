import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";
import { UsersProps } from "@/types";

export default function ChatList({ users, currentUser }: UsersProps) {
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1 }}
        keyExtractor={(item) => item.userId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            item={item}
            index={index}
            router={router}
            currentUser={currentUser}
          />
        )}
      />
    </View>
  );
}
