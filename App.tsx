import React, { useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';
import { supabase } from './lib/supabase';
import Auth from './app/Auth';
import Account from './app/(tabs)/Account';
import { Session } from '@supabase/supabase-js';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NativeWindStyleSheet } from 'nativewind';




NativeWindStyleSheet.setOutput({
  default: 'native',
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
        });
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
      
    </View>
  );
}