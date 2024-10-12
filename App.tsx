import { useCallback, useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './app/Auth'
import Account from './app/(tabs)/Account'
import { Text, View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
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

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}
