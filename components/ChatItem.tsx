import { Pressable, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { blurhash } from "@/constants/blurhash";
import { useRouter } from "expo-router";
import { ItemProps } from "@/types";

export default function ChatItem(props: ItemProps) {
  const router = useRouter();
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: props.item });
  };

  return (
    <Pressable onPress={openChatRoom} style={styles.chat}>
      <Image
        source={{ uri: props.item?.profileUrl }}
        style={styles.image}
        placeholder={blurhash}
        transition={400}
      />
      <View style={{ paddingLeft: 10 }}>
        <View style={styles.nameAndTimeContainer}>
          <Text style={styles.name}>{props.item?.username}</Text>
          <Text style={styles.time}>Time</Text>
        </View>
        <Text style={styles.lastMsg}>Last message</Text>
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
