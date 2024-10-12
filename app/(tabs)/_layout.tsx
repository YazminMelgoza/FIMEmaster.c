import { Tabs } from 'expo-router'
import { HomeIcon, InfoIcon } from '../../components/Icons';
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
                }}
                initialParams={{ session }} // Se pasa la sesión
            />
            <Tabs.Screen
                name="Search"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <HomeIcon name="home" color={color} />,
                }}
                initialParams={{ session }} // Se pasa la sesión
            />
            <Tabs.Screen
                name="Stadistics"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <HomeIcon name="home" color={color} />,
                }}
                initialParams={{ session }} // Se pasa la sesión
            />
            <Tabs.Screen
                name="Account"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <HomeIcon name="home" color={color} />,
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