import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView, { AnimatedLottieViewProps } from "lottie-react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Loading() {
  return (
    <View style={styles.btn}>
      <LottieView
        style={styles.loading}
        source={require("../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: wp(90),
    backgroundColor: "magenta",
    borderColor: "magenta",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: { height: 60 }
});
