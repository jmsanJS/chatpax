import { StyleSheet, View, Text } from "react-native";
import React, { ReactNode } from "react";
import { MenuOption } from "react-native-popup-menu";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MenuItemsProps } from "@/types";

export default function CustomMenuItems({
  text,
  action,
  value,
  icon,
}: MenuItemsProps) {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View style={styles.container}>
        <View>
          <Text style={styles.menuIcon}>{text}</Text>
        </View>
        {icon}
      </View>
    </MenuOption>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: { fontSize: hp(2.5) },
});
