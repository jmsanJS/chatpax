import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { UserProps } from "@/types";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { truncate } from "@/modules/truncate";

export default function ChatRoomHeader({ user, router }: UserProps) {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <Pressable onPress={() => router.back()}>
                <MaterialIcons
                  name="chevron-left"
                  size={hp(4)}
                  color="magenta"
                />
              </Pressable>
              <View style={styles.usersInfoContainer}>
                <Image source={user?.profileUrl} style={styles.image} />
                <Text style={styles.username}>
                    {truncate(user?.username)}
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <MaterialIcons name="call" size={hp(4)} color="magenta" />
              <MaterialIcons name="videocam" size={hp(4)} color="magenta" />
            </View>
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(20),
  },
  usersInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: hp(2.2),
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#222",
  },
  image: {
    height: hp(5),
    marginHorizontal: 10,
    aspectRatio: 1,
    borderRadius: 100,
    // borderWidth: 2,
    // borderColor: "#fff",
  },
});
