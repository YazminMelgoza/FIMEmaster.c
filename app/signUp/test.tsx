import { Text, View } from 'react-native'
import { Link, Stack } from "expo-router"
import { Screen } from "../../components/ScreenLayout"
export default function Index()
{
    return <Screen> 
        <Stack.Screen
            options={{
                headerShown: true,
                headerStyle: {backgroundColor: "black"},
            }}
        />
            <View>
                <Text>Home</Text>
                <Link href="/" >
                    <Text > Regístrate</Text>
                    </Link>
            </View>
        
    </Screen>;
}