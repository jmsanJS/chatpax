import { View, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeIn, Easing } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { usePathname } from "expo-router";

export default function SignInSignUpBottomDesign() {
  const actualPath = usePathname();
  const height = actualPath === "/signIn" ? 30 : 25;

  return (
    <Animated.View entering={FadeIn.duration(400).easing(Easing.ease)} style={styles.designContainer}>
    <View style={[styles.topDesign, { height: hp(height) }]}></View>
    <View style={[styles.bottomDesign, { height: hp(height) }]}></View>
  </Animated.View>
  );
}

const styles = StyleSheet.create({
  designContainer: {
    position: "absolute",
    bottom: 0,
  },
  topDesign: {
    backgroundColor: "#fff",
    marginBottom: hp(-15),
    zIndex: 1,
    width: wp(100),
    borderBottomEndRadius: wp(100),
  },
  bottomDesign: {
    backgroundColor: "magenta",
    width: wp(100),
    opacity: 0.5,
  },
});
