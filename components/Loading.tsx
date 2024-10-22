import { View } from "react-native";
import React, { useMemo } from "react";
import LottieView from "lottie-react-native";
import { usePathname } from "expo-router";

export default function Loading() {
  const actualPath = usePathname();
  const size = useMemo(() => {
    const paths = ["/signUp", "/signIn"];
    return paths.includes(actualPath) ? 60 : 50;
  }, [actualPath]);

  return (
    <View>
      <LottieView
        style={{ height: size, width: size }}
        source={require("../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}
