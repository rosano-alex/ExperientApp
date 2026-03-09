import { useAuth } from "@/core/auth/AuthProvider";
import { authenticateUser } from "@/core/auth/LoginService";
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setUsername(username);
    setPassword(password);

    const loginResponse = await authenticateUser(username, password);
    await signIn(loginResponse);
  };

  return (
    <View style={{ margin: 15, paddingBottom: 12 }}>
      <Text style={{ fontSize: 15 }}>Please Login</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 18 }}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ marginBottom: 18 }}
      />
      <Button mode="contained" onPress={handleLogin}>
        Log In
      </Button>
    </View>
  );
}
