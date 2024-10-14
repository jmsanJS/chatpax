import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { useSession } from "@/context/context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function UpdateUsernameScreen() {
  const { user } = useSession();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Your actual email:</Text>
        <TextInput style={styles.input}></TextInput>
        <Text>Type your new email:</Text>
        <TextInput style={styles.input}></TextInput>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>update</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: wp(80),
  },
  input: {
    borderWidth: 1,
    borderBlockColor: "magenta",
    borderRadius: 10,
    padding: 10,
    fontSize: hp(2.5)
  },
  btn: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "magenta",
  },
  btnText: {
    fontSize: hp(2.5),
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "white",
  }
});
