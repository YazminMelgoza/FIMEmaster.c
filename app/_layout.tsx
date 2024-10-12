import { Stack } from 'expo-router';
import {View, Text, StyleSheet} from "react-native";


export default function Layout(){
    return(
        <View style={styles.container}>
            <Stack 
                screenOptions={{
                    headerStyle: {backgroundColor: "black"},
                    headerTintColor: "white",
                    headerShown: false,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#000000',
    },
});