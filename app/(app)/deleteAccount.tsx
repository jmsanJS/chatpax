import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSession } from "@/context/context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import SettingsOptionsHeader from "@/components/SettingsOptionsHeader";
import Loading from "@/components/Loading";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export default function DeleteAccountScreen() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSession();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (password === "") {
      Alert.alert("Please enter your password to confirm this action");
      return;
    }
    setLoading(true);

    if (user && auth.currentUser) {
      try {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email!,
          password
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        if (auth.currentUser !== null) {
          deleteUser(auth.currentUser);
          Alert.alert("Your account has been successfully deleted.");
          router.replace("/signIn");
        } else {
          Alert.alert("Oops! Something went wrong. Please try again later.");
        }
      } catch (error) {
        const errorMsg = (error as Error).message;
        if (errorMsg === "Firebase: Error (auth/wrong-password).") {
          Alert.alert("Your password is incorrect. Please try again.");
        }
        setLoading(false);
      }
    } else {
      Alert.alert("User not found");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SettingsOptionsHeader user={user} router={router} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Are you sure you want to permanently delete your account?
        </Text>
        <Text style={styles.subtitle}>Type your password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          value={password}
          secureTextEntry
          enablesReturnKeyAutomatically={true}
        />
        {loading ? (
          <Pressable style={styles.btn} onPress={handleDeleteAccount}>
            <Loading />
            <Text style={styles.btnText}>delete</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.btn} onPress={handleDeleteAccount}>
            <Text style={styles.btnText}>delete</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
    color: "white",
  },
});
