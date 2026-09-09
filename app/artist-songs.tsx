import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase'; // පර්ත් එක චෙක් කරගන්න (../lib ද @/lib ද කියලා)

// 1. දත්තවල හැඩය මෙතන Define කරමු (මේක නිසා තමයි රතු ඉරි මැකෙන්නේ)
interface Song {
  id: string;
  title: string;
  lyrics: string;
  artist_id: string;
}

export default function ArtistSongsScreen() {
  const { artistId, artistName, artistImage } = useLocalSearchParams();
  const [songs, setSongs] = useState<Song[]>([]); // මෙතනට <Song[]> කියන එක දැම්මා
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (artistId) {
      fetchArtistSongs();
    }
  }, [artistId]);

  async function fetchArtistSongs() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('artist_id', artistId);

      if (error) throw error;
      
      setSongs((data as Song[]) || []); // මෙතන (as Song[]) කියලා සහතිකයක් දුන්නා
    } catch (err) {
      console.error("Error fetching songs:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* Artist Header Section */}
      <View style={styles.header}>
        <Image 
          source={{ uri: (artistImage as string) || 'https://via.placeholder.com/150' }} 
          style={styles.headerImg} 
        />
        <Text style={styles.headerName}>{artistName}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.songRow}
              onPress={() => router.push({
                pathname: "/lyrics/[id]",
                params: { 
                  id: item.id, 
                  title: item.title, 
                  lyrics: item.lyrics, 
                  artistName: artistName, 
                  artistImage: artistImage 
                }
              })}
            >
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.tapToView}>Tap to view lyrics</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No songs found for this artist.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 15 },
  loadingBox: { marginTop: 50, alignItems: 'center' },
  header: { alignItems: 'center', marginTop: 50, marginBottom: 30 },
  headerImg: { width: 140, height: 140, borderRadius: 70 }, // No black border
  headerName: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginTop: 15 },
  songRow: { 
    backgroundColor: '#111', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  songInfo: { flex: 1 },
  songTitle: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  tapToView: { color: '#1DB954', fontSize: 12, marginTop: 4 },
  empty: { color: '#888', textAlign: 'center', marginTop: 40, fontSize: 16 }
});