import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "./AuthProvider";

function ProtectedRoutes() {
    const { state } = useAuth(); // ✅ Now safely inside AuthProvider
    return (
        <Stack>
            <Stack.Protected guard={!state.isLoggedIn}>
                <Stack.Screen name="index" options={{ title: 'Log In' }} />
            </Stack.Protected>
            <Stack.Protected guard={state.isLoggedIn}>
                <Stack.Screen name="home" options={{ title: 'Home Page' }} />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <ProtectedRoutes />
        </AuthProvider>
    );
}

