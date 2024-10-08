import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="scan" />
      <Stack.Screen name="confirmscan" />
    </Stack>
  );
}