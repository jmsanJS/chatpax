import { View, ScrollView, StyleSheet, TextInput, Pressable, Alert, Keyboard } from "react-native";
import React, { useEffect, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import { useState } from "react";
import MessageList from "@/components/MessageList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { UserData } from "@/types";
import { getRoomId } from "@/modules/getRoomId";
import { addDoc, collection, doc, DocumentData, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useSession } from "@/context/context";

export default function ChatRoomScreen() {
  const item = useLocalSearchParams() as unknown as UserData;
  const router = useRouter();
  const { user } = useSession();
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const textRef = useRef("");
  const inputRef = useRef<TextInput>(null);
  const lastMsgScrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagedRef = collection(docRef, "messages");
    const q = query(messagedRef, orderBy("createdAt", "asc"));

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateLastMsgScrollView
    );

    return () => {
      unsubscribe;
      KeyboardDidShowListener.remove();
    };
  }, []);

  // Update the last message scroll view when new message is added
  // (Pass the ref to the MessageList component)
  useEffect(() => {
    updateLastMsgScrollView();
  }, [messages]);

  const updateLastMsgScrollView = () => {
    setTimeout(() => {
      lastMsgScrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendMessageClick = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      if (inputRef) {
        return inputRef?.current?.clear();
      }
    } catch (error) {
      Alert.alert("Failed to send message");
    }
  };

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  return (
    <CustomKeyboardView inChat={true}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View style={styles.headerLine}></View>
        <View style={styles.msgsContainer}>
          <View style={{ flex: 1 }}>
            <MessageList
              lastMsgScrollViewRef={lastMsgScrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View style={styles.userMsgContainer}>
            <TextInput
              placeholder="Type message..."
              style={styles.input}
              onChangeText={(value) => (textRef.current = value)}
              ref={inputRef}
            />
            <Pressable style={styles.sendBtn} onPress={handleSendMessageClick}>
              <MaterialIcons name="send" size={hp(2.7)} color="magenta" />
            </Pressable>
          </View>
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
    backgroundColor: "#eee5ff",
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
