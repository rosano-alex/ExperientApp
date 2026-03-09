import { useAuth } from '@/core/auth/AuthProvider';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "react-native-paper";

export default function Home() {
  const { signOut, state } = useAuth();
  console.log(';state ', state)
  return (
    <View>
      <Text style={styles.txt}>THIS IS THE HOME PAGE</Text>
      <Button mode="contained" onPress={signOut}>Log out!</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  txt: {
    color: "green",
    fontWeight: "bold",
    fontSize: 28,
    paddingTop: 30,
    paddingLeft: 5,
    paddingBottom: 20
  }
});
