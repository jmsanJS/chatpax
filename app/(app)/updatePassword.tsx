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
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Loading from "@/components/Loading";

export default function UpdateUsernameScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSession();
  const router = useRouter();

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("All fields are required.");
      return;
    }
    setLoading(true);

    if (auth.currentUser) {
      try {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email!,
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        await updatePassword(auth.currentUser, newPassword);
        setLoading(false);
        router.back();
      } catch (error) {
        const errorMsg = (error as Error).message;
        if (errorMsg.includes("auth/wrong-password")) {
          Alert.alert("Your password is incorrect. Please try again.");
        } else if (errorMsg.includes("auth/weak-password")) {
          Alert.alert("Your new password should be at least 6 characters.");
        } else {
          Alert.alert("Something went wrong. Please try again.")
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
        <Text style={styles.title}>Change your password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current password"
          placeholderTextColor={"gray"}
          secureTextEntry
          enablesReturnKeyAutomatically={true}
          onChangeText={(value) => setCurrentPassword(value)}
          value={currentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New password"
          placeholderTextColor={"gray"}
          secureTextEntry
          enablesReturnKeyAutomatically={true}
          onChangeText={(value) => setNewPassword(value)}
          value={newPassword}
        />
        <View>
          {loading ? (
            <Pressable style={styles.btn} onPress={handlePasswordUpdate}>
              <Loading />
              <Text style={styles.btnText}>update</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.btn} onPress={handlePasswordUpdate}>
              <Text style={styles.btnText}>update</Text>
            </Pressable>
          )}
        </View>
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
    height: hp(100),
  },
  formContainer: {
    width: wp(85),
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
    marginVertical: 10,
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
