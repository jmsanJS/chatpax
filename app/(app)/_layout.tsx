import { Text, View, ActivityIndicator } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../../context/context";
import HomeHeader from "@/components/HomeHeader";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // Loading screen
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          <ActivityIndicator size="large" />
        </Text>
      </View>
    );
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/Home" />;
    // return <Redirect href="/SignIn" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="Home" options={{ header: () => <HomeHeader /> }} />
    </Stack>
  );
}
