import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="crearQuiz" options={{ headerShown: false }} />
      <Stack.Screen name="quiz" options={{ headerShown: false }} />

    </Stack>
  );
}