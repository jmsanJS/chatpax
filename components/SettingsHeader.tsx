import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { UserProps } from "@/types";

export default function SettingsHeader({ user, router }: UserProps) {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          header: () => (
            <View style={styles.headerContainer}>
              <View style={{ width: wp(90) }}>
                <Pressable onPress={() => router.replace("/(app)/home")}>
                  <MaterialIcons
                    name="chevron-left"
                    size={hp(4)}
                    color="magenta"
                  />
                </Pressable>
              </View>
              <View style={styles.usersInfoContainer}>
                <Image source={user?.profileUrl} style={styles.image} />
                <Text style={styles.username}>{user?.username}</Text>
              </View>
            </View>
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(6),
    backgroundColor: "#fff",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(20),
  },
  usersInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: hp(2.2),
    marginVertical: 5,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#222",
  },
  image: {
    height: hp(15),
    marginHorizontal: 10,
    aspectRatio: 1,
    borderRadius: 100,
    // borderWidth: 2,
    // borderColor: "#fff",
  },
});
