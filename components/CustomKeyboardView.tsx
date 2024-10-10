import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React from "react";
import { Children } from "@/types";

export default function CustomKeyboardView({ children, inChat }: Children) {
  const ios = Platform.OS === "ios";
  let keaboardAvoidingViewConfig = {};
  let scrollViewConfig = {};

  if (inChat) {
    keaboardAvoidingViewConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
      {...keaboardAvoidingViewConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
