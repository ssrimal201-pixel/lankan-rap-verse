import { BlurView } from "expo-blur";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { Copy, Heart, HeartOff, Share as ShareIcon } from "lucide-react-native"; // ShareIcon එකතු කළා
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Share } from "react-native"; // Share එකතු කළා
import { useLyrics } from "@/contexts/LyricsContext";

export default function LyricsScreen() {
  const params = useLocalSearchParams();
  const { title, artistName, artistImage, lyrics } = params as {
    title: string;
    artistName: string;
    artistImage: string;
    lyrics: string;
  };

  const { saveLyric, removeLyric, isLyricSaved } = useLyrics();
  const [copied, setCopied] = useState(false);

  const isSaved = isLyricSaved(title, artistName);

  // --- Share Logic එක මෙන්න ---
  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎶 ${title} - ${artistName}\n\n${lyrics}\n\nShared via Lankan Rap Verse`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(lyrics);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (isSaved) {
      removeLyric(title, artistName);
    } else {
      saveLyric({ songTitle: title, artistName, artistImage, lyrics });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#ffffff",
        }}
      />

      <Image 
        source={{ uri: artistImage }} 
        style={styles.backgroundImage} 
        contentFit="cover" 
        cachePolicy="disk" 
      />
      <BlurView intensity={85} tint="dark" style={styles.blurOverlay} />

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.songTitle} numberOfLines={2}>{title}</Text>
          <Text style={styles.artistNameText}>{artistName}</Text>
        </View>

        <View style={styles.actionsRow}>
          {/* Copy Button */}
          <TouchableOpacity style={[styles.actionButton, copied && styles.actionButtonActive]} onPress={handleCopy}>
            <Copy size={18} color={copied ? "#1DB954" : "#ffffff"} />
            <Text style={[styles.actionButtonText, copied && styles.actionButtonTextActive]}>{copied ? "Copied" : "Copy"}</Text>
          </TouchableOpacity>

          {/* Share Button එක මෙන්න */}
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <ShareIcon size={18} color="#ffffff" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity style={[styles.actionButton, isSaved && styles.actionButtonActive]} onPress={handleToggleSave}>
            {isSaved ? <HeartOff size={18} color="#1DB954" /> : <Heart size={18} color="#ffffff" />}
            <Text style={[styles.actionButtonText, isSaved && styles.actionButtonTextActive]}>{isSaved ? "Saved" : "Save"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lyricsContainer}>
          <Text style={styles.lyricsText}>{lyrics}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  backgroundImage: { position: "absolute", width: "100%", height: "100%" },
  blurOverlay: { ...StyleSheet.absoluteFillObject },
  scrollView: { flex: 1 },
  content: { paddingTop: 120, paddingBottom: 60, paddingHorizontal: 25 },
  header: { marginBottom: 35, alignItems: "flex-start" },
  songTitle: { fontSize: 42, fontWeight: "900", color: "#ffffff", marginBottom: 5, textShadowColor: "rgba(0, 0, 0, 0.9)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  artistNameText: { fontSize: 22, fontWeight: "600", color: "#1DB954" },
  actionsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 40 }, // Row එක flexWrap කළා ඉඩ මදි වුණොත් යටට යන්න
  actionButton: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.12)", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 30, gap: 8 },
  actionButtonActive: { backgroundColor: "rgba(29, 185, 84, 0.2)" },
  actionButtonText: { fontSize: 13, fontWeight: "700", color: "#ffffff" },
  actionButtonTextActive: { color: "#1DB954" },
  lyricsContainer: { paddingBottom: 20 },
  lyricsText: { fontSize: 20, lineHeight: 34, color: "#ffffff", fontWeight: "500" },
});