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
import { auth, db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import SettingsOptionsHeader from "@/components/SettingsOptionsHeader";
import Loading from "@/components/Loading";

export default function UpdateUsernameScreen() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useSession();
  const router = useRouter();

  const handleUsernameUpdate = async () => {
    if (username === "") {
      Alert.alert("Please enter a username");
      return;
    }
    setLoading(true);

    if (user && auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, {
          username: username,
        });
        setUser({ ...user, username: username });
        setLoading(false);
        router.back();
      } catch (error) {
        const errorMsg = (error as Error).message;
        Alert.alert("Error updating username", errorMsg);
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
        <Text style={styles.title}>Update your username here</Text>
        <Text style={styles.subtitle}>
          Your actual username is "{user?.username}".
        </Text>
        <TextInput
          style={styles.input}
          placeholder="New username"
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        {loading ? (
          <Pressable style={styles.btn} onPress={handleUsernameUpdate}>
            <Loading />
            <Text style={styles.btnText}>update</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.btn} onPress={handleUsernameUpdate}>
            <Text style={styles.btnText}>update</Text>
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
