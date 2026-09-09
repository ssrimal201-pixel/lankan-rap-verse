import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Mic } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function LyricsScreen() {
  const router = useRouter();
  const { id, title: paramTitle, artistName: paramArtist } = useLocalSearchParams<{ 
    id: string; 
    title?: string; 
    artistName?: string; 
  }>();

  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchSongDetails();
    }
  }, [id]);

  async function fetchSongDetails() {
    setLoading(true);
    try {
      // Supabase එකෙන් Song Details එක්ක Artistගේ Image එකත් එක්කම ගන්නවා
      const { data, error } = await supabase
        .from('songs')
        .select('id, title, lyrics, artists(name, image)')
        .eq('id', id)
        .single();

      if (error) {
        console.log("Lyrics Fetch Error:", error);
      } else if (data) {
        setSong(data);
      }
    } catch (e) {
      console.log("Error fetching lyrics:", e);
    } finally {
      setLoading(false);
    }
  }

  const songTitle = song?.title || (paramTitle ? decodeURIComponent(paramTitle) : 'Song Lyrics');
  const artistName = song?.artists?.name || (paramArtist ? decodeURIComponent(paramArtist) : 'Artist');
  const artistImage = song?.artists?.image;
  const songLyrics = song?.lyrics || "මෙම ගීතයේ Lyrics තවම එකතු කර නොමැත.";

  return (
    <View style={styles.container}>
      {/* ARTIST BLURRED BACKGROUND */}
      {artistImage ? (
        <ImageBackground 
          source={{ uri: artistImage }} 
          style={styles.bgImage}
          blurRadius={25} // Photo එක Blur වෙන ප්‍රමාණය
        >
          <View style={styles.darkOverlay} />
        </ImageBackground>
      ) : (
        <View style={styles.defaultBg} />
      )}

      {/* TOP HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.songTitleHeader} numberOfLines={1}>{songTitle}</Text>
          <Text style={styles.artistNameHeader} numberOfLines={1}>{artistName}</Text>
        </View>

        {/* Karaoke Quick Button */}
        <TouchableOpacity 
          style={styles.karaokeBtn}
          onPress={() => router.push(`/karaoke?songId=${id}&title=${encodeURIComponent(songTitle)}&lyrics=${encodeURIComponent(songLyrics)}`)}
        >
          <Mic size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* LYRICS CONTENT */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Lyrics ලෝඩ් වෙනවා...</Text>
        </View>
      ) : (
        <ScrollView style={styles.lyricsScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.lyricsText}>{songLyrics}</Text>
          <View style={{ height: 60 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 45, position: 'relative' },
  bgImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Blur Image එක උඩින් Dark Layer එකක් (Text කියවන්න ලේසි වෙන්න)
  },
  defaultBg: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: '#000',
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 10,
  },
  backBtn: { backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 8, borderRadius: 20 },
  headerTitleContainer: { flex: 1, marginHorizontal: 15, alignItems: 'center' },
  songTitleHeader: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  artistNameHeader: { color: '#1DB954', fontSize: 13, marginTop: 2 },
  karaokeBtn: { backgroundColor: '#00FFCC', padding: 8, borderRadius: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  loadingText: { color: '#ccc', marginTop: 10, fontSize: 14 },
  lyricsScroll: { flex: 1, paddingHorizontal: 20, paddingTop: 20, zIndex: 10 },
  lyricsText: { 
    color: '#FFFFFF', 
    fontSize: 19, 
    lineHeight: 34, 
    textAlign: 'center', 
    fontWeight: '600',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Text එක කැපී පෙනෙන්න Shadow එකක්
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});