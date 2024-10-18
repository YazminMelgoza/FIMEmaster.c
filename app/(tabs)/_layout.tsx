import { Tabs } from 'expo-router'
import { HomeIcon, SearchIcon, StorageIcon, AccountIcon } from '../../components/Icons';
import { useCallback, useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Auth from '../Auth'
import { Text, View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function TabsLayout(){
    const [appIsReady, setAppIsReady] = useState(false);
    const [session, setSession] = useState<Session | null>(null)
    useEffect(() => 
    {
        async function prepare() 
        {
        try 
        {
            
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session)
            })
                
            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session)
            })
                
                
            await Font.loadAsync(Entypo.font);
            //await new Promise(resolve => setTimeout(resolve, 2000)); //Artificial Delay to see splashScreen
        } catch (e) {
            console.warn(e);
        } finally {
            // Tell the application to render
            setAppIsReady(true);
            await SplashScreen.hideAsync();
        }
        }
        prepare();
        // Limpiar el listener de auth cuando el componente se desmonte
        
    }, [])

    if (!appIsReady) 
    {
        return null;
    }
    if(session && session.user)
    {
        return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
            >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <HomeIcon name="home" color={color} />,
                    tabBarLabel: () => null,
                }}
                
                initialParams={{ session }} // Se pasa la sesión
            />
            <Tabs.Screen
                name="Search"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <SearchIcon name="search" color={color} />,
                    tabBarLabel: () => null,
                }}
                initialParams={{ session }} // Se pasa la sesión
            />
            <Tabs.Screen
                name="Storage"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <StorageIcon name="database" color={color} />,
                    tabBarLabel: () => null,
                }}
                initialParams={{ session }} // Se pasa la sesión
            />
            <Tabs.Screen
                name="Account"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <AccountIcon name="user" color={color} />,
                    tabBarLabel: () => null,
                }}
                initialParams={{ session }} // Se pasa la sesión
            />
            <Tabs.Screen
                name="TerminarQuiz"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <HomeIcon name="qrcode" color={color} />,
                }}
                initialParams={{ session }} // Se pasa la sesión
            />
            <Tabs.Screen
                name="SignIn"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <HomeIcon name="user" color={color} />,
                }}
                initialParams={{ session }} // Se pasa la sesión
            />
        </Tabs>
        );
    }else
    {
        return (
              <Auth />
        )
    }

}