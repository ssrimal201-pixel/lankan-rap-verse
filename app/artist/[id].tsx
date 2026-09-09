import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"; // useRouter එක් කළා
import { Mic2, ChevronLeft } from "lucide-react-native"; // ලස්සන Back Button එකක් සඳහා
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";
import { SONGS } from "@/mocks/artists";

export default function ArtistDetailScreen() {
  const router = useRouter();
  const { id, name, image, genre } = useLocalSearchParams<{
    id: string;
    name: string;
    image: string;
    genre: string;
  }>();

  const artistSongs = useMemo(() => {
    return SONGS.filter((song) => song.artistName === name);
  }, [name]);

  return (
    <View style={styles.container}>
      {/* 1. මෙතනින් තමයි අර කැත සුදු Header එක අයින් කරන්නේ [cite: 2026-01-02] */}
      <Stack.Screen
        options={{
          headerShown: false, // සුදු බාර් එක අයින් කළා [cite: 2026-01-02]
        }}
      />

      <Image source={{ uri: image }} style={styles.backgroundImage} contentFit="cover" />
      <BlurView intensity={85} style={styles.blurOverlay} tint="dark" />

      {/* 2. Custom Back Button එකක් [cite: 2026-01-02] */}
      <SafeAreaView style={styles.headerAction}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={28} color="#ffffff" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.artistHeader}>
          {/* 3. පින්තූරයේ බෝඩර් එක අයින් කරලා ලස්සන කළා [cite: 2026-01-02] */}
          <Image source={{ uri: image }} style={styles.artistImage} contentFit="cover" />
          <Text style={styles.artistName}>{name}</Text>
          <Text style={styles.artistGenre}>{genre}</Text>
          <Text style={styles.songsCount}>
            {artistSongs.length} {artistSongs.length === 1 ? "Song" : "Songs"}
          </Text>
        </View>

        <View style={styles.songsSection}>
          <Text style={styles.sectionTitle}>All Songs</Text>
          <View style={styles.songsList}>
            {artistSongs.map((song) => (
              <Link
                key={song.id}
                href={{
                  pathname: "/lyrics/[id]",
                  params: {
                    id: song.id,
                    title: song.title,
                    artistName: song.artistName,
                    artistImage: song.artistImage,
                    lyrics: song.lyrics,
                  },
                }}
                asChild
              >
                <TouchableOpacity style={styles.songItem} activeOpacity={0.7}>
                  <View style={styles.songIconContainer}>
                    <Mic2 size={20} color="#1DB954" />
                  </View>
                  <Text style={styles.songTitle} numberOfLines={1}>
                    {song.title}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  backgroundImage: { ...StyleSheet.absoluteFillObject, height: 450 },
  blurOverlay: { ...StyleSheet.absoluteFillObject, height: 450 },
  headerAction: { position: 'absolute', top: 10, left: 10, zIndex: 10 },
  backBtn: { width: 45, height: 45, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  scrollView: { flex: 1 },
  content: { paddingTop: 60, paddingBottom: 40 },
  artistHeader: { alignItems: "center", paddingHorizontal: 20, marginBottom: 32 },
  artistImage: { 
    width: 160, 
    height: 160, 
    borderRadius: 80, 
    // මෙතන තිබුණ කොළ පාට බෝඩර් එක අයින් කළා පිරිසිදු පෙනුමකට [cite: 2026-01-02]
    marginBottom: 20 
  },
  artistName: { fontSize: 36, fontWeight: "900", color: "#ffffff", textAlign: "center", marginBottom: 5 },
  artistGenre: { fontSize: 16, color: "#1DB954", marginBottom: 5, fontWeight: '600' },
  songsCount: { fontSize: 14, color: "#888888" },
  songsSection: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#ffffff", marginBottom: 16 },
  songsList: { gap: 12 },
  songItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "rgba(255, 255, 255, 0.05)", 
    padding: 16, 
    borderRadius: 16, 
    gap: 16 
  },
  songIconContainer: { width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255, 255, 255, 0.05)", alignItems: "center", justifyContent: "center" },
  songTitle: { flex: 1, fontSize: 17, fontWeight: "600", color: "#ffffff" },
});