import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import ProfileHeader from "@/components/SettingsHeader";
import { useSession } from "@/context/context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const { user } = useSession();
  const router = useRouter();

  const handleDeleteAccount = () => {
    console.log("handleDeleteAccount");
  }

  return (
    <View style={styles.container}>
      <View>
        <StatusBar style="dark" />
        <ProfileHeader user={user} router={router} />
      </View>
      <View style={{ padding: 30 }}>
        <View style={styles.settingsContainer}>
          <Pressable
            onPress={() => router.push("/(app)/updateUsername")}
            style={styles.settingsOptions}
          >
            <Text style={styles.optionText}>Update your username</Text>
            <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/(app)/updatePhoto")}
            style={styles.settingsOptions}
          >
            <Text style={styles.optionText}>Update your photo</Text>
            <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/(app)/updateEmail")}
            style={styles.settingsOptions}
          >
            <Text style={styles.optionText}>Update your email</Text>
            <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/(app)/updatePassword")}
            style={styles.settingsOptions}
          >
            <Text style={styles.optionText}>Update your password</Text>
            <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
          </Pressable>
          <Pressable
            onPress={handleDeleteAccount}
            style={styles.settingsOptions}
          >
            <Text style={styles.optionText}>Delete your account</Text>
            <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  settingsContainer: {},
  settingsOptions: {
    borderWidth: 1,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: hp(2),
  },
});
