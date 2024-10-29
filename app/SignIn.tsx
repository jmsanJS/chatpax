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
import Animated, { FadeInUp, FadeInDown, FadeIn, Easing } from "react-native-reanimated";

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
        router.push("/(app)/home");
      } else {
        if (response.error === "Firebase: Error (auth/user-not-found).") {
          Alert.alert("Email address not found. Please try again.");
        } else if (
          response.error === "Firebase: Error (auth/wrong-password)."
        ) {
          Alert.alert("Your password is incorrect. Please try again.");
        } else {
          Alert.alert("Something went wrong...", response.error);
        }
      }
    } catch (error) {
      Alert.alert("Sign In Error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    router.push("/forgotPassword");
  };

  return (
    <CustomKeyboardView inChat={false}>
      <StatusBar style="light" />
      <Animated.View entering={FadeIn.duration(400).easing(Easing.ease)} style={styles.topDesignContainer}>
        <View style={styles.topDesign}></View>
        <View style={styles.bottomDesign}></View>
      </Animated.View>

      <View style={styles.container}>
        <Animated.Text
          entering={FadeInUp.springify().mass(1)}
          style={styles.title}
        >
          Sign In
        </Animated.Text>
        <View style={{ width: wp(85) }}>
          <Animated.View
            entering={FadeInDown.springify().delay(100)}
            style={styles.inputContainer}
          >
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
              inputMode="email"
              autoCapitalize="none"
            />
          </Animated.View>
          <Animated.View
            style={styles.inputContainer}
            entering={FadeInDown.springify().delay(200)}
          >
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
              enablesReturnKeyAutomatically={true}
            />
          </Animated.View>
        </View>
        <Pressable onPress={handleForgotPasswordClick}>
          <Animated.Text
            style={styles.forgotPwd}
            entering={FadeInDown.springify().delay(250)}
          >
            Forgot password?
          </Animated.Text>
        </Pressable>

        <Animated.View entering={FadeInDown.springify().delay(300)}>
          {loading ? (
            <Pressable onPress={handleSignInClick} style={styles.btn}>
              <Loading />
              <Text style={styles.btnText}>Sign In</Text>
            </Pressable>
          ) : (
            <Pressable onPress={handleSignInClick} style={styles.btn}>
              <Text style={styles.btnText}>Sign In</Text>
            </Pressable>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.springify().delay(350)}
          style={styles.noAccount}
        >
          <Text style={styles.signUpQuestion}>Don't have an account? </Text>
          <Pressable onPress={() => router.push("/signUp")}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Pressable>
        </Animated.View>
      </View>

      <Animated.View entering={FadeIn.duration(400).easing(Easing.ease)} style={styles.bottomDesignContainer}>
        <View style={styles.bottomDesignTop}></View>
        <View style={styles.bottomDesignBottom}></View>
      </Animated.View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  topDesignContainer: {
    position: "absolute",
  },
  topDesign: {
    backgroundColor: "magenta",
    height: hp(30),
    width: wp(100),
    opacity: 0.5,
  },
  bottomDesign: {
    backgroundColor: "#fff",
    marginTop: hp(-15),
    zIndex: 1,
    width: wp(100),
    height: hp(30),
    borderTopStartRadius: wp(100),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: hp(100),
    zIndex: 2,

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
    width: wp(75),
    borderColor: "#eee",
    borderWidth: 1,
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  forgotPwd: {
    width: wp(85),
    color: "gray",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "right",
    marginTop: 15,
    marginBottom: 25,
  },
  btn: {
    width: wp(85),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  noAccount: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 25,
  },
  signUpQuestion: {
    color: "gray",
    fontWeight: "500",
    fontSize: 16,
  },
  signUpLink: {
    color: "magenta",
    fontWeight: "500",
    fontSize: 16,
  },
  bottomDesignContainer: {
    position: "absolute",
    bottom: 0,
  },
  bottomDesignTop: {
    backgroundColor: "#fff",
    marginBottom: hp(-15),
    zIndex: 1,
    width: wp(100),
    height: hp(30),
    borderBottomEndRadius: wp(100),
  },
  bottomDesignBottom: {
    backgroundColor: "magenta",
    height: hp(30),
    width: wp(100),
    opacity: 0.5,
  },
});
