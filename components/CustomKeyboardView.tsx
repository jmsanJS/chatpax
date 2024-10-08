import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React from "react";

interface Children {
  children: React.ReactNode;
}

export default function CustomKeyboardView({ children }: Children) {
  const ios = Platform.OS === "ios";
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
