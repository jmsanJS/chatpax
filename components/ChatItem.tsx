import { Pressable, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { blurhash } from "@/constants/blurhash";
import { ItemProps } from "@/types";
import { getRoomId } from "@/modules/getRoomId";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { truncateLastMessage } from "@/modules/truncateText";
import { dateFormat } from "@/modules/dateFormat";

export default function ChatItem({
  item,
  index,
  router,
  currentUser,
}: ItemProps) {
  const openChatRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: {
        userId: item.userId,
        username: item.username,
        profileUrl: item.profileUrl,
      },
    });
  };
  const [lastMessage, setLastMessage] = useState<
    DocumentData | undefined | null
  >(undefined);

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagedRef = collection(docRef, "messages");
    const q = query(messagedRef, orderBy("createdAt", "desc"));

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });
    return unsubscribe;
  }, []);

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      return dateFormat(new Date(date?.seconds * 1000));
    }
  };
  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";
    if (lastMessage) {
      if (currentUser?.userId === lastMessage?.userId) {
        return "You: " + truncateLastMessage(lastMessage?.text);
      }
    } else {
      return "Say hi 👋";
    }
  };

  return (
    <Pressable onPress={openChatRoom} style={styles.chat}>
      <Image
        source={{ uri: item?.profileUrl }}
        style={styles.image}
        placeholder={blurhash}
        transition={400}
      />
      <View style={{ paddingLeft: 10 }}>
        <View style={styles.nameAndTimeContainer}>
          <Text style={styles.name}>{item?.username}</Text>
          <Text style={styles.time}>{renderTime()}</Text>
        </View>
        <Text style={styles.lastMsg}>{renderLastMessage()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chat: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#bbb",
    width: wp(100),
  },
  image: {
    aspectRatio: 1,
    height: hp(12),
    width: wp(12),
    borderRadius: 100,
  },
  nameAndTimeContainer: {
    flexDirection: "row",
    width: wp(70),
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: hp(1.8),
  },
  time: {
    color: "#666",
    fontWeight: "500",
    fontSize: hp(1.6),
  },
  lastMsg: {
    color: "#666",
    fontWeight: "500",
    fontSize: hp(1.6),
  },
});
