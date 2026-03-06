
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
        style={{ marginBottom: 18 }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={{ marginBottom: 16 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button mode="contained" onPress={handleLogin}>Log In</Button>
    </View>
  );
}
