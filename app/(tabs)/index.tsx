import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { Search, Info } from 'lucide-react-native'; // Info icon එක එකතු කළා

interface Artist {
  id: string;
  name: string;
  image: string;
}

interface Song {
  id: string;
  title: string;
  lyrics: string;
  artists: {
    name: string;
    image: string;
  } | null;
}

// --- Skeleton Item Component (ඩේටා ලෝඩ් වෙනකම් පේන පෙනුම) ---
const SkeletonItem = () => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.songRow, { opacity }]}>
      <View style={[styles.songImg, { backgroundColor: '#222' }]} />
      <View style={styles.songInfo}>
        <View style={{ width: '70%', height: 16, backgroundColor: '#222', borderRadius: 4, marginBottom: 10 }} />
        <View style={{ width: '40%', height: 12, backgroundColor: '#222', borderRadius: 4 }} />
      </View>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchHomeData();
  }, []);

  async function fetchHomeData() {
    try {
      setLoading(true);
      const { data: artistsData } = await supabase.from('artists').select('*');
      const { data: songsData } = await supabase.from('songs').select('id, title, lyrics, artists(name, image)');

      setAllArtists(artistsData || []);
      setAllSongs((songsData as any) || []);
      setFilteredArtists(artistsData || []);
      setFilteredSongs((songsData as any) || []);
    } finally {
      setTimeout(() => setLoading(false), 800); 
    }
  }

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const query = text.toLowerCase();
    if (query.trim() === '') {
      setFilteredArtists(allArtists);
      setFilteredSongs(allSongs);
    } else {
      setFilteredArtists(allArtists.filter(a => a.name.toLowerCase().includes(query)));
      setFilteredSongs(allSongs.filter(s => 
        s.title.toLowerCase().includes(query) || s.artists?.name.toLowerCase().includes(query)
      ));
    }
  };

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topHeader}>
          <Text style={styles.appName}>Lankan Rap Verse</Text>
        </View>
        <View style={[styles.searchSection, { opacity: 0.5 }]} />
        <Text style={styles.sectionTitle}>Loading Tracks...</Text>
        {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonItem key={i} />)}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* --- TOP HEADER WITH ABOUT BUTTON --- */}
      <View style={styles.topHeader}>
        <Text style={styles.appName}>Lankan Rap Verse</Text>
        
        <TouchableOpacity 
          style={styles.aboutBtn} 
          onPress={() => router.push('/about')}
        >
          <Info size={22} color="#1DB954" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <Search size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Artists or Songs..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Artists Results */}
      {filteredArtists.length > 0 && (
        <View style={{ marginBottom: 25 }}>
          <Text style={styles.sectionTitle}>Artists</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredArtists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.artistCircleCard}
                onPress={() => router.push({
                  pathname: "/artist-songs",
                  params: { artistId: item.id, artistName: item.name, artistImage: item.image }
                })}
              >
                <Image source={{ uri: item.image }} style={styles.artistCircleImg} />
                <Text style={styles.artistCircleName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Songs Results */}
      <Text style={styles.sectionTitle}>
        {searchQuery === '' ? 'Featured Tracks' : 'Songs'}
      </Text>
      
      {filteredSongs.map((song) => (
        <TouchableOpacity 
          key={song.id} 
          style={styles.songRow}
          onPress={() => router.push({
            pathname: "/lyrics/[id]",
            params: { id: song.id, title: song.title, lyrics: song.lyrics, artistName: song.artists?.name, artistImage: song.artists?.image }
          })}
        >
          <Image source={{ uri: song.artists?.image }} style={styles.songImg} />
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.artistSubText}>{song.artists?.name}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Empty Message */}
      {filteredArtists.length === 0 && filteredSongs.length === 0 && (
        <View style={styles.emptyContainer}>
          <Search size={50} color="#333" />
          <Text style={styles.emptyText}>සොයාගත නොහැකි විය!</Text>
          <Text style={styles.emptySubText}>වෙනත් නමකින් උත්සාහ කර බලන්න.</Text>
        </View>
      )}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 15, paddingTop: 50 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  appName: { color: '#fff', fontSize: 26, fontWeight: 'bold', letterSpacing: 0.5 },
  aboutBtn: { backgroundColor: '#111', padding: 8, borderRadius: 12 },
  searchSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 15, marginBottom: 25, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  artistCircleCard: { marginRight: 15, alignItems: 'center', width: 85 },
  artistCircleImg: { width: 75, height: 75, borderRadius: 37.5 },
  artistCircleName: { color: '#fff', fontSize: 12, marginTop: 8, textAlign: 'center' },
  songRow: { flexDirection: 'row', backgroundColor: '#111', padding: 10, borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  songImg: { width: 55, height: 55, borderRadius: 8 },
  songInfo: { marginLeft: 15, flex: 1 },
  songTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  artistSubText: { color: '#1DB954', fontSize: 13 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 15 },
  emptySubText: { color: '#888', fontSize: 14, marginTop: 5 },
});