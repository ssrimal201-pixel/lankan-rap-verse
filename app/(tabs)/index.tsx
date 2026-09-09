import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Animated, RefreshControl } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { Search, Info, WifiOff, Mic } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [allArtists, setAllArtists] = useState<any[]>([]);
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<any[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchHomeData(true);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHomeData(false);
  }, []);

  async function fetchHomeData(showSkeleton: boolean) {
    if (showSkeleton) setLoading(true);
    try {
      setIsOffline(false);
      
      const { data: artistsData, error: artError } = await supabase.from('artists').select('*');
      // Safer query to prevent crash if youtube_id column is missing
      const { data: songsData, error: songError } = await supabase.from('songs').select('id, title, lyrics, artists(name, image)');

      if (artError || songError) {
        console.log("Supabase Error:", artError || songError);
        throw new Error("Connection Error");
      }

      if (artistsData && songsData) {
        setAllArtists(artistsData);
        setAllSongs(songsData);
        setFilteredArtists(artistsData);
        setFilteredSongs(songsData);
        
        await AsyncStorage.setItem('cached_artists', JSON.stringify(artistsData)).catch(() => {});
        await AsyncStorage.setItem('cached_songs', JSON.stringify(songsData)).catch(() => {});
      }
    } catch (e) {
      console.log("Fetch Error (Offline Mode Triggered):", e);
      setIsOffline(true);
      try {
        const cachedArt = await AsyncStorage.getItem('cached_artists');
        const cachedSongs = await AsyncStorage.getItem('cached_songs');
        if (cachedArt) {
          const art = JSON.parse(cachedArt);
          setAllArtists(art);
          setFilteredArtists(art);
        }
        if (cachedSongs) {
          const sng = JSON.parse(cachedSongs);
          setAllSongs(sng);
          setFilteredSongs(sng);
        }
      } catch (err) { console.log("Cache reading error"); }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const query = text.toLowerCase();
    if (query.trim() === '') {
      setFilteredArtists(allArtists);
      setFilteredSongs(allSongs);
    } else {
      setFilteredArtists(allArtists.filter((a: any) => a.name?.toLowerCase().includes(query)));
      setFilteredSongs(allSongs.filter((s: any) => 
        s.title?.toLowerCase().includes(query) || s.artists?.name?.toLowerCase().includes(query)
      ));
    }
  };

  if (loading && !refreshing) {
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
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          tintColor="#1DB954" 
          colors={["#1DB954"]} 
        />
      }
    >
      {/* HEADER */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.appName}>Lankan Rap Verse</Text>
          {isOffline && (
            <View style={styles.offlineBadge}>
              <WifiOff size={12} color="#ff4444" />
              <Text style={styles.offlineText}>Offline Mode</Text>
            </View>
          )}
        </View>
        
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity 
            style={styles.karaokeQuickBtn} 
            onPress={() => router.push('/karaoke')}
          >
            <Mic size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutBtn} onPress={() => router.push('/about')}>
            <Info size={22} color="#1DB954" />
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH BAR */}
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

      {/* ARTISTS LIST */}
      {filteredArtists.length > 0 && (
        <View style={{ marginBottom: 25 }}>
          <Text style={styles.sectionTitle}>Artists</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredArtists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.artistCircleCard}
                onPress={() => router.push(`/artist-songs?artistId=${item.id}&artistName=${encodeURIComponent(item.name || '')}&artistImage=${encodeURIComponent(item.image || '')}`)}
              >
                <Image source={{ uri: item.image }} style={styles.artistCircleImg} />
                <Text style={styles.artistCircleName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* SONGS LIST */}
      <Text style={styles.sectionTitle}>
        {searchQuery === '' ? 'Featured Tracks' : 'Songs'}
      </Text>
      
      {filteredSongs.map((song) => (
        <View key={song.id} style={styles.songRowContainer}>
          <TouchableOpacity 
            style={styles.songRow}
            onPress={() => router.push(`/lyrics/${song.id}?title=${encodeURIComponent(song.title || '')}&artistName=${encodeURIComponent(song.artists?.name || 'Unknown')}`)}
          >
            <Image source={{ uri: song.artists?.image }} style={styles.songImg} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.artistSubText}>{song.artists?.name}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.micActionBtn}
            onPress={() => router.push(`/karaoke?songId=${song.id}&title=${encodeURIComponent(song.title || '')}&lyrics=${encodeURIComponent(song.lyrics || '')}`)}
          >
            <Mic size={18} color="#00FFCC" />
          </TouchableOpacity>
        </View>
      ))}

      {filteredArtists.length === 0 && filteredSongs.length === 0 && (
        <View style={styles.emptyContainer}>
          <Search size={50} color="#333" />
          <Text style={styles.emptyText}>සොයාගත නොහැකි විය!</Text>
          <Text style={styles.emptySubText}>වෙනත් නමකින් උත්සාහ කර බලන්න.</Text>
        </View>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 15, paddingTop: 50 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  appName: { color: '#fff', fontSize: 26, fontWeight: 'bold', letterSpacing: 0.5 },
  offlineBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  offlineText: { color: '#ff4444', fontSize: 11, fontWeight: 'bold' },
  aboutBtn: { backgroundColor: '#111', padding: 8, borderRadius: 12 },
  karaokeQuickBtn: { backgroundColor: '#00FFCC', padding: 8, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  searchSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 15, marginBottom: 25, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  artistCircleCard: { marginRight: 15, alignItems: 'center', width: 85 },
  artistCircleImg: { width: 75, height: 75, borderRadius: 37.5 },
  artistCircleName: { color: '#fff', fontSize: 12, marginTop: 8, textAlign: 'center' },
  songRowContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', borderRadius: 12, marginBottom: 10, paddingRight: 10 },
  songRow: { flexDirection: 'row', flex: 1, padding: 10, alignItems: 'center' },
  songImg: { width: 55, height: 55, borderRadius: 8 },
  songInfo: { marginLeft: 15, flex: 1 },
  songTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  artistSubText: { color: '#1DB954', fontSize: 13 },
  micActionBtn: { backgroundColor: '#1a1a1a', padding: 10, borderRadius: 20, borderWidth: 1, borderColor: '#00FFCC' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 15 },
  emptySubText: { color: '#888', fontSize: 14, marginTop: 5 },
});