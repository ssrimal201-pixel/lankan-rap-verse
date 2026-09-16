import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Info } from 'lucide-react-native';
import rapData from '../data/rapVerses.json';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTracks = rapData.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.appName}>Lankan Rap Verse</Text>
          <TouchableOpacity style={styles.infoButton} onPress={() => router.push('/about')}>
            <Info size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Artists or Songs..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Featured Tracks Section */}
        <Text style={styles.sectionTitle}>Featured Tracks</Text>

        <View style={styles.trackList}>
          {filteredTracks.map((track) => (
            <TouchableOpacity
              key={track.id}
              style={styles.trackCard}
              onPress={() => router.push('/studio')}
              activeOpacity={0.7}
            >
              <Image source={{ uri: track.image || 'https://via.placeholder.com/150' }} style={styles.trackImage} />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackArtist}>{track.artist}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  appName: { color: '#fff', fontSize: 26, fontWeight: '900', letterSpacing: 0.5 },
  infoButton: { width: 40, height: 40, backgroundColor: '#111', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', borderRadius: 15, paddingHorizontal: 15, height: 50, marginBottom: 25 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  trackList: { gap: 12 },
  trackCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 12, borderRadius: 16 },
  trackImage: { width: 55, height: 55, borderRadius: 12, backgroundColor: '#222' },
  trackInfo: { flex: 1, marginLeft: 15 },
  trackTitle: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  trackArtist: { color: '#1DB954', fontSize: 14, fontWeight: '600', marginTop: 4 }
});
