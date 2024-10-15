import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { UserProps } from "@/types";

export default function SettingsOptionsHeader({ router }: UserProps) {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          header: () => (
            <View style={styles.headerContainer}>
              <View style={styles.linkContainer}>
                <Pressable onPress={() => router.back()}>
                  <MaterialIcons
                    name="chevron-left"
                    size={hp(4)}
                    color="magenta"
                  />
                </Pressable>
                <Text style={styles.linkText}>settings</Text>
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
  linkContainer: {
    width: wp(90),
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: "magenta",
    fontSize: hp(1.9),
  },
});
