import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { SessionProvider, useSession } from "../context/context";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useSession();
  const segments = useSegments();
  const router = useRouter();

  console.log("segments: ", segments);

  useEffect(() => {
    if (isAuthenticated === undefined) return;
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      // if user is authenticated
      router.replace("/Home");
    } else if (isAuthenticated === false) {
      // if user is not authenticated
      router.replace("/SignIn");
    }
  }, [isAuthenticated]);

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
