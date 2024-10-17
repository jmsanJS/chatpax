import { View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { usePathname } from "expo-router";

export default function Loading() {
  const actualPath = usePathname();
  const paths = ["/signUp", "/signIn"];
  const size = paths.includes(actualPath) ? 60 : 50;

  return (
    <View>
      <LottieView
        style={{ height: size }}
        source={require("../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}
