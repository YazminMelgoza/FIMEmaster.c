import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "white",
          headerShown: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faa",
    //backgroundColor: '#000000',
  },
});
