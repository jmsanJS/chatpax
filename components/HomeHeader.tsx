import { Platform, StyleSheet, View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { useSession } from "@/context/context";
import { blurhash } from "@/constants/blurhash";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import CustomMenuItems from "../components/CustomMenuItems";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function HomeHeader() {
  const router = useRouter();
  const { user, signOut } = useSession();

  const handleProfile = () => {
    router.replace("/profile");
  };

  const handleSignOutClick = async () => {
    await signOut();
    router.replace("/signIn");
  };
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.title}>Chats</Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {},
            }}
          >
            <Image
              style={styles.image}
              source={user?.profileUrl}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </MenuTrigger>
          <MenuOptions>
            <CustomMenuItems
              text="Profile"
              action={handleProfile}
              value={null}
              icon={
                <MaterialIcons name="person-outline" size={24} color="black" />
              }
            />
            <View style={styles.line}></View>
            <CustomMenuItems
              text="Sign out"
              action={handleSignOutClick}
              value={null}
              icon={<MaterialIcons name="logout" size={24} color="black" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: hp(6),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: "magenta",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: hp(3),
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    height: hp(5),
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  line: {
    backgroundColor: "#ddd",
    height: 1,
  },
});
