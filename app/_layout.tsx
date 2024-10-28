import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { SessionProvider, useSession } from "../context/context";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inApp = segments[0] === "(app)";
    if (isAuthenticated === undefined) return;

    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (!isAuthenticated) {
      router.replace("/signIn");
    }
  }, []);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <SessionProvider>
        <MainLayout />
      </SessionProvider>
    </MenuProvider>
  );
}
