import { AuthProvider, useAuth } from "@/core/auth/AuthProvider";
import { Stack } from "expo-router";

function RootNavigator() {
  const { state } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#4A4A4A" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Protected guard={!state.isLoggedIn}>
        <Stack.Screen name="index" options={{ title: "Log In" }} />
      </Stack.Protected>

      <Stack.Protected guard={state.isLoggedIn}>
        <Stack.Screen name="home" options={{ title: "Home Page" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
