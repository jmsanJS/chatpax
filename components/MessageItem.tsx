import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MessageItemProps } from "@/types";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

export default function MessageItem({
  message,
  currentUser,
}: MessageItemProps) {
  if (currentUser?.userId == message?.userId) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
          marginRight: 10,
        }}
      >
        <View style={{ width: wp(80) }}>
          <Animated.View entering={FadeInRight} style={styles.msgBubbleRight}>
            <Text style={styles.textMsg}>{message?.text}</Text>
          </Animated.View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
        <View style={{ width: wp(80) }}>
          <Animated.View entering={FadeInLeft} style={styles.msgBubbleLeft}>
            <Text style={styles.textMsg}>{message?.text}</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  msgBubbleRight: {
    flex: 1,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
  },
  msgBubbleLeft: {
    flex: 1,
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 12,
    borderRadius: 15,
  },
  textMsg: {fontSize: hp(2)}
});
