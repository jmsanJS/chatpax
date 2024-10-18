import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth } from "@/firebaseConfig";
import { Stack, useRouter } from "expo-router";
import Loading from "@/components/Loading";
import { sendPasswordResetEmail } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (email === "") {
      Alert.alert("Please enter your email address");
      return;
    }
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      Alert.alert("An email has been sent");
      router.back();
    } catch (error) {
      const errorMsg = (error as Error).message;
      Alert.alert("Error sending email", errorMsg);
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{width: wp(90)}}>
          <Pressable onPress={() => router.back()} style={styles.linkContainer}>
            <MaterialIcons name="chevron-left" size={hp(4)} color="magenta" />
            <Text style={styles.linkText}>sign in</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Reset your password</Text>
          <Text style={styles.subtitle}>
            You will receive an email with instructions to define your new
            password.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Type your email"
            inputMode="email"
            autoCapitalize="none"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          {loading ? (
            <Pressable style={styles.btn} onPress={handleResetPassword}>
              <Loading />
              <Text style={styles.btnText}>send email</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.btn} onPress={handleResetPassword}>
              <Text style={styles.btnText}>send email</Text>
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(22),
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(6),
    backgroundColor: "#fff",
  },
  linkContainer: {
    width: wp(25),
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: "magenta",
    fontSize: hp(1.9),
  },
  formContainer: {
    width: wp(80),
  },
  title: {
    fontSize: hp(3),
    marginBottom: 30,
  },
  subtitle: {
    fontSize: hp(2.2),
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "magenta",
    borderRadius: 10,
    padding: 15,
    fontSize: hp(2.5),
  },
  btn: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "magenta",
  },
  btnText: {
    fontSize: hp(2.5),
    padding: 15,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#fff",
  },
});
