import { Text, View } from 'react-native'
import { Link, Stack } from "expo-router"
export default function Index()
{
    return <View> 
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        
        <Link href="/signUp/test" >
            <Text > Regístrate</Text>
            </Link>
    </View>;
}