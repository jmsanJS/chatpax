import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
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
import { blurhash } from "@/constants/blurhash";

export default function UpdatePhotoScreen() {
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useSession();
  const router = useRouter();

  const handlePhotoUrlUpdate = async () => {
    if (profileUrl === "") {
      Alert.alert("Please enter an url to an image");
      return;
    }
    setLoading(true);

    if (user && auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, {
          profileUrl: profileUrl,
        });
        setUser({ ...user, profileUrl: profileUrl });
        setLoading(false);
        router.back();
      } catch (error) {
        const errorMsg = (error as Error).message;
        Alert.alert("Error updating your profile picture", errorMsg);
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
        <View style={styles.profilePhotoContainer}>
          <Image
            source={user?.profileUrl}
            style={styles.image}
            placeholder={{ blurhash }}
          />
        </View>
        <Text style={styles.title}>Update your profile picture</Text>
        <Text style={styles.subtitle}>Type or copy paste a new picture url:</Text>
        <TextInput
          style={styles.input}
          placeholder="New picture url"
          onChangeText={(value) => setProfileUrl(value)}
          value={profileUrl}
        />
        {loading ? (
          <Pressable style={styles.btn} onPress={handlePhotoUrlUpdate}>
            <Loading />
            <Text style={styles.btnText}>update</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.btn} onPress={handlePhotoUrlUpdate}>
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
  profilePhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    height: hp(25),
    marginHorizontal: 10,
    aspectRatio: 1,
    borderRadius: hp(13),
    borderWidth: 2,
    borderColor: "magenta",
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
