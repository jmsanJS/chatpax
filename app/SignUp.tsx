import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useSession } from "../context/context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "@/components/Loading";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { StatusBar } from "expo-status-bar";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useSession();

  const handleSignUpClick = async () => {
    if (!email || !password || !username || !profileUrl || !checked) {
      Alert.alert("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await signUp(email, password, username, profileUrl);
      if (response.success) {
        router.push('/(app)/Home');
      } else {
        Alert.alert("Oups!",response.error);
      }
    } catch (error) {
      Alert.alert("Sign Up Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyboardView inChat={false}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="person"
            size={hp(3)}
            color="gray"
            style={{ paddingLeft: 15 }}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setUsername(value)}
            value={username}
            placeholder="Username"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="mail-outline"
            size={hp(3)}
            color="gray"
            style={{ paddingLeft: 15 }}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            value={email}
            placeholder="Email"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="password"
            size={hp(3)}
            color="gray"
            style={{ paddingLeft: 15 }}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
            value={password}
            placeholder="Password"
            placeholderTextColor={"gray"}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="image"
            size={hp(3)}
            color="gray"
            style={{ paddingLeft: 15 }}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setProfileUrl(value)}
            value={profileUrl}
            placeholder="Profile Url"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.termsContainer}>
          <Checkbox
            style={styles.checkbox}
            color={"magenta"}
            onValueChange={() => setChecked(!checked)}
            value={checked}
          />
          <Text style={styles.checkboxText}>
            By checking this box, you are agreeing to our terms of service.
          </Text>
        </View>
        <View>
          {loading ? (
            <Loading />
          ) : (
            <Pressable onPress={handleSignUpClick} style={styles.btn}>
              <Text style={styles.btnText}>Sign Up</Text>
            </Pressable>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: "gray", fontWeight: "500", fontSize: 16 }}>
            Do you have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/SignIn")}>
            <Text style={{ color: "magenta", fontWeight: "500", fontSize: 16 }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: hp(100),
  },
  signInForm: {},
  title: {
    fontSize: hp(4.5),
    letterSpacing: 0.5,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderColor: "#eee",
    borderWidth: 1,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  input: {
    fontSize: hp(2.5),
    letterSpacing: 0.5,
    height: 60,
    width: wp(80),
    borderColor: "#eee",
    borderWidth: 1,
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  termsContainer: {
    width: wp(85),
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
    marginTop: -15,
  },
  checkboxText: {
    color: "gray",
    fontWeight: "500",
    fontSize: 16,
    width: wp(80),
    marginTop: 10,
    marginBottom: 25,
  },
  btn: {
    width: wp(90),
    backgroundColor: "magenta",
    borderColor: "magenta",
    borderWidth: 1,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: hp(3),
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.5,
    padding: 15,
  },
})
