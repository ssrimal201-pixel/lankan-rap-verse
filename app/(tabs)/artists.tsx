import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';

interface Artist {
  id: string;
  name: string;
  image: string;
}

export default function ArtistsScreen() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    try {
      setLoading(true);
      const { data } = await supabase.from('artists').select('*').order('name');
      setArtists(data || []);
      setFilteredArtists(data || []);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = artists.filter(a => a.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredArtists(filtered);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#1DB954" /></View>;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Search size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search artist..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredArtists}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        
        // --- මෙන්න මෙතනට තමයි "සොයාගත නොහැකි විය" මැසේජ් එක දැම්මේ ---
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Search size={60} color="#333" />
            <Text style={styles.emptyText}>සොයාගත නොහැකි විය!</Text>
            <Text style={styles.emptySubText}>වෙනත් ආර්ටිස්ට් කෙනෙක් සර්ච් කර බලන්න.</Text>
          </View>
        }
        // --------------------------------------------------------

        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({
              pathname: "/artist-songs",
              params: { artistId: item.id, artistName: item.name, artistImage: item.image }
            })}
          >
            <Image source={{ uri: item.image }} style={styles.cardImg} />
            
            <View style={styles.overlay}>
              <Text style={styles.artistName}>{item.name}</Text>
              <Text style={styles.subText}>Artist</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 12, paddingTop: 60 },
  center: { flex: 1, justifyContent: 'center', backgroundColor: '#000' },
  
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', paddingHorizontal: 15, borderRadius: 10, height: 45, marginBottom: 20 },
  searchInput: { flex: 1, color: '#fff', marginLeft: 10, fontSize: 16 },

  row: { justifyContent: 'space-between' },

  card: {
    width: '48%',
    height: 220,
    backgroundColor: '#111',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  artistName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subText: { color: '#1DB954', fontSize: 12, marginTop: 2 },

  // --- අලුත් Empty State Styles මෙන්න ---
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100, // මැදට එන්න පෑඩින් එකක්
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptySubText: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});