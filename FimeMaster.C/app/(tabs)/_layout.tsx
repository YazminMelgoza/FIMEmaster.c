import { Tabs } from 'expo-router';
import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="firstscreen"
        options={{
          title: 'firstscreen',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'key' : 'key-outline'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="login"
        options={{
          title: 'login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'key' : 'key-outline'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="registro"
        options={{
          title: 'registro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'options' : 'options-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crearQuiz"
        options={{
          
          
          title: 'crearQuiz',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'options' : 'options-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'register',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'options' : 'options-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resolverBien"
        options={{
          title: 'resolverBien',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TerminarQuiz"
        options={{
          title: 'TerminarQuiz',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'qr-code' : 'qr-code-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
