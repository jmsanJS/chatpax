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
  const { user, signOut } = useSession();
  const router = useRouter();

  const handleSignOutClick = async () => {
    await signOut();
    router.replace("/signIn");
  };

  return (
    <View style={styles.container}>
      <View>
        <StatusBar style="dark" />
        <ProfileHeader user={user} router={router} />
      </View>
      <View style={styles.settingsContainer}>
        <Pressable
          onPress={() => router.push("/(app)/updateUsername")}
          style={styles.settingsOptions}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="person"
              size={hp(3)}
              color="gray"
              style={{ paddingHorizontal: 15 }}
            />
            <Text style={styles.optionText}>Change your username</Text>
          </View>
          <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
        </Pressable>
        <Pressable
          onPress={() => router.push("/(app)/updatePhoto")}
          style={styles.settingsOptions}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="image"
              size={hp(3)}
              color="gray"
              style={{ paddingHorizontal: 15 }}
            />
            <Text style={styles.optionText}>Change your profile picture</Text>
          </View>
          <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
        </Pressable>
        <Pressable
          onPress={() => router.push("/(app)/updateEmail")}
          style={styles.settingsOptions}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="mail-outline"
              size={hp(3)}
              color="gray"
              style={{ paddingHorizontal: 15 }}
            />
            <Text style={styles.optionText}>Update your email address</Text>
          </View>
          <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
        </Pressable>
        <Pressable
          onPress={() => router.push("/(app)/updatePassword")}
          style={styles.lastSettingsOptions}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="password"
              size={hp(3)}
              color="gray"
              style={{ paddingHorizontal: 15 }}
            />
            <Text style={styles.optionText}>Change your password</Text>
          </View>
          <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
        </Pressable>
      </View>
      <Pressable
        onPress={() => router.push("/(app)/deleteAccount")}
        style={styles.settingsOptions && styles.delete}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="delete-outline"
            size={hp(3)}
            color="gray"
            style={{ paddingHorizontal: 15 }}
          />
          <Text style={styles.optionText}>Delete your account</Text>
        </View>
        <MaterialIcons name="chevron-right" size={hp(3)} color="black" />
      </Pressable>
      <Pressable onPress={handleSignOutClick} style={styles.logout}>
        <MaterialIcons name="logout" size={24} color="gray" />
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  settingsContainer: {
    marginTop: 30,
    width: wp(80),
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  settingsOptions: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastSettingsOptions: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: hp(2),
  },
  delete: {
    marginTop: 25,
    width: wp(80),
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  logout: {
    position: "absolute",
    bottom: 20,
    width: wp(60),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "magenta",
    padding: 10,
  },
  logoutText: {
    fontSize: hp(2),
    marginLeft: 10,
    color: "gray",
    fontWeight: "500",
  },
});
