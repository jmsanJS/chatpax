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
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import Loading from "@/components/Loading";

export default function UpdateEmailScreen() {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSession();
  const router = useRouter();

  const handleEmailUpdate = async () => {
    if (!currentPassword || !newEmail) {
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
        await verifyBeforeUpdateEmail(auth.currentUser, newEmail);

        Alert.alert(
          "Email Verification",
          "Please check your new email inbox to verify the change.",
          [
            {
              text: "OK",
              onPress: () => {
                router.back();
              },
            },
          ]
        );
        setLoading(false);
      } catch (error) {
        const errorMsg = (error as Error).message;
        if (errorMsg === "Firebase: Error (auth/invalid-credential).") {
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
        <Text style={styles.title}>Change your email address</Text>
        <TextInput
          style={styles.input}
          placeholder="New email address"
          placeholderTextColor={"gray"}
          inputMode="email"
          autoCapitalize="none"
          onChangeText={(value) => setNewEmail(value)}
          value={newEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Current password"
          placeholderTextColor={"gray"}
          secureTextEntry
          enablesReturnKeyAutomatically={true}
          onChangeText={(value) => setCurrentPassword(value)}
          value={currentPassword}
        />
        <View>
          {loading ? (
            <Pressable style={styles.btn} onPress={handleEmailUpdate}>
              <Loading />
              <Text style={styles.btnText}>update</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.btn} onPress={handleEmailUpdate}>
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
