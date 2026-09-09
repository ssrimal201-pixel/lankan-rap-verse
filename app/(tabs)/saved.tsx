import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router"; // useRouter එකතු කළා
import { Heart, Music, Trash2 } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { useLyrics } from "@/contexts/LyricsContext";

export default function SavedScreen() {
  const { savedLyrics, removeLyric } = useLyrics();
  const router = useRouter(); // router එක initialize කළා

  const handleNavigate = (song: any) => {
    // pathname එක ඔයාගේ Folder එකේ නමට (lyrics/[id]) ගැලපෙන්න මෙතන තියෙනවා
    router.push({
      pathname: "/lyrics/[id]",
      params: {
        id: song.id || "offline", // ID එකක් නැත්නම් "offline" කියලා pass කරනවා crash නොවෙන්න
        title: song.songTitle,
        artistName: song.artistName,
        artistImage: song.artistImage,
        lyrics: song.lyrics,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Heart size={35} color="#1DB954" fill="#1DB954" />
          </View>
          <Text style={styles.headerTitle}>Offline Library</Text>
          <Text style={styles.headerSubtitle}>{savedLyrics.length} songs saved</Text>
        </View>

        <View style={styles.section}>
          {savedLyrics.length > 0 ? (
            savedLyrics.map((song, index) => (
              <View key={song.id || index} style={styles.songCardContainer}>
                {/* Link වෙනුවට TouchableOpacity පාවිච්චි කරලා navigation එක handle කරනවා */}
                <TouchableOpacity 
                  style={styles.songCard} 
                  activeOpacity={0.7}
                  onPress={() => handleNavigate(song)}
                >
                  <Image source={{ uri: song.artistImage }} style={styles.songImage} contentFit="cover" />
                  <View style={styles.songInfo}>
                    <Text style={styles.songTitle} numberOfLines={1}>{song.songTitle}</Text>
                    <Text style={styles.songArtist} numberOfLines={1}>{song.artistName}</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => removeLyric(song.songTitle, song.artistName)} 
                  style={styles.removeBtn}
                >
                  <Trash2 size={20} color="#444" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Music size={50} color="#222" />
              <Text style={styles.emptyText}>No Offline Songs</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { paddingBottom: 40, paddingTop: 20 },
  header: { padding: 24, alignItems: "center" },
  iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: "rgba(29, 185, 84, 0.1)", alignItems: "center", justifyContent: "center", marginBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: "900", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#888", marginTop: 5 },
  section: { paddingHorizontal: 15 },
  songCardContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  songCard: { flex: 1, flexDirection: "row", backgroundColor: "#0d0d0d", borderRadius: 12, alignItems: "center", padding: 10 },
  songImage: { width: 55, height: 55, borderRadius: 8 },
  songInfo: { flex: 1, paddingHorizontal: 15 },
  songTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
  songArtist: { fontSize: 13, color: "#1DB954", marginTop: 2 },
  removeBtn: { padding: 10, marginLeft: 5 },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#333", fontSize: 16, marginTop: 15, fontWeight: "600" }
});