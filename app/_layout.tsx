import { Stack } from 'expo-router';
import { StyleSheet } from "react-native";

export default function Layout() {
    return (
        <Stack 
            screenOptions={{
                headerStyle: { backgroundColor: "black" },
                headerTintColor: "white",
                headerShown: false,
            }}>
            {/* Asegúrate de que estas rutas correspondan a las pantallas que deseas mostrar */}
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(creacionquiz)" />
        </Stack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
