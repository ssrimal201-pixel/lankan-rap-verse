import { Tabs } from "expo-router";
import { Home, Mic2, Heart, Send } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1DB954",
        tabBarInactiveTintColor: "#666666",
        
        // 1. මෙන්න මේ ලයින් එක false කරන්න
        headerShown: false, 

        tabBarStyle: {
          backgroundColor: "#0a0a0a",
          borderTopColor: "#1a1a1a",
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: "#0a0a0a",
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="artists"
        options={{
          title: "Artists",
          tabBarIcon: ({ color }) => <Mic2 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          title: "Request",
          tabBarIcon: ({ color }) => <Send size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}