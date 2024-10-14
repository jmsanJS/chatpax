import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import { useSession } from "../context/context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Loading from "@/components/Loading";
import CustomKeyboardView from "@/components/CustomKeyboardView";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useSession();

  const handleSignInClick = async () => {
    if (!email || !password) {
      Alert.alert("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await signIn(email, password);
      setLoading(false);

      if (response.success) {
        console.log("Sign in successful:", response.data);
        // Redirect to chatroom
        setLoading(false);
        router.push("/(app)/home");
      } else {
        Alert.alert("Something went wrong...",response.error);
      }
    } catch (error) {
      console.error("Sign In Error:", error);
      Alert.alert("Sign In Error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    console.log("handleForgotPasswordClick");
  };

  return (
    <CustomKeyboardView inChat={false}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="mail-outline"
            size={hp(3)}
            color="gray"
            style={{ paddingLeft: 15 }}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
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
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor={"gray"}
            secureTextEntry
          />
        </View>
        <Pressable onPress={handleForgotPasswordClick}>
          <Text style={styles.forgotPwd}>Forgot password?</Text>
        </Pressable>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <Pressable onPress={handleSignInClick} style={styles.btn}>
              <Text style={styles.btnText}>Sign In</Text>
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
            Don't have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/signUp")}>
            <Text style={{ color: "magenta", fontWeight: "500", fontSize: 16 }}>
              Sign Up
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
  forgotPwd: {
    width: wp(90),
    color: "gray",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "right",
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
});
