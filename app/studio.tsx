import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import rapData from '../data/rapVerses.json';

export default function RapLyricsScreen() {
  const song = rapData[0]; // Active Track

  const onShare = async () => {
    try {
      await Share.share({
        message: `${song.title} - ${song.artist}\n\n${song.lyrics}\n\nShared via Lankan Rap Verse App 🎤`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>

        <View style={styles.divider} />

        <Text style={styles.lyricsText}>{song.lyrics}</Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Text style={styles.shareText}>🔥 SHARE PUNCHLINES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  contentContainer: { padding: 25, alignItems: 'center', paddingBottom: 100 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  artist: { color: '#FF0055', fontSize: 16, marginTop: 6, fontWeight: '600', letterSpacing: 1 },
  divider: { height: 1, backgroundColor: '#222', width: '100%', marginVertical: 20 },
  lyricsText: { color: '#e0e0e0', fontSize: 18, lineHeight: 30, textAlign: 'center', fontWeight: '400' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 15, backgroundColor: '#111' },
  shareButton: { backgroundColor: '#FF0055', padding: 15, borderRadius: 25, alignItems: 'center' },
  shareText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});
