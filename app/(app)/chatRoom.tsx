import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import { useState } from "react";
import MessageList from "@/components/MessageList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { UserData } from "@/types";

export default function ChatRoom() {
  const item = useLocalSearchParams() as unknown as UserData;
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  console.log("params: ", item);
  return (
    <CustomKeyboardView inChat={true}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View style={styles.headerLine}></View>
        <View style={styles.msgsContainer}>
          <View style={{ flex: 1 }}>
            <MessageList messages={messages} />
          </View>
          {/* <View style={{ marginBottom: hp(2.5) }}> */}
            <View style={styles.userMsgContainer}>
              <TextInput placeholder="Type message..." style={styles.input} />
              <Pressable style={styles.sendBtn}>
                <MaterialIcons name="send" size={hp(2.7)} color="magenta" />
              </Pressable>
            </View>
          {/* </View> */}
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  headerLine: {
    backgroundColor: "magenta",
    height: 1,
    marginTop: 10,
  },
  msgsContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#eedfff",
  },
  userMsgContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
    marginBottom: hp(2.5),
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "magenta",
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    padding: 12,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  sendBtn: {
    padding: 12,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
});
