import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LyricsProvider } from "@/contexts/LyricsContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack 
      screenOptions={{ 
        // 1. මුළු ඇප් එකේම පේජ් වල සුදු Header එක මෙතනින් වහනවා [cite: 2026-01-02]
        headerShown: false, 
        animation: "fade_from_bottom" // පේජ් එක මාරු වෙද්දී ලස්සන Animation එකක් [cite: 2026-01-02]
      }}
    >
      <Stack.Screen name="(tabs)" />
      {/* 2. මෙතනින් අර true කියන එක අයින් කළා [cite: 2026-01-02] */}
      <Stack.Screen name="artist/[id]" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LyricsProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </LyricsProvider>
    </QueryClientProvider>
  );
}