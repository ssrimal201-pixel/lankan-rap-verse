import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ArrowLeft, Mic, Disc, Play, Pause } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function KaraokeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ title?: string; lyrics?: string }>();
  
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const songTitle = params.title ? decodeURIComponent(params.title) : 'Lankan Rap Karaoke';
  const songLyrics = params.lyrics 
    ? decodeURIComponent(params.lyrics) 
    : "මචං, මෙතනට Lyrics ටික load වෙනවා...\n\n(Beat එකට අනුව රැප් එක කරගෙන යන්න!)";

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.permissionText}>Karaoke සදහා Camera Permission ලබාදෙන්න.</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* CAMERA VIEW */}
      <View style={styles.cameraContainer}>
        <CameraView style={StyleSheet.absoluteFillObject} facing="front" />
        
        {/* OVERLAY HEADER */}
        <View style={styles.cameraOverlayHeader}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{songTitle}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* RECORD BUTTON */}
        <View style={styles.cameraOverlayBottom}>
          <TouchableOpacity 
            style={[styles.recordBtn, isRecording && styles.recordingActive]} 
            onPress={() => setIsRecording(!isRecording)}
          >
            <Mic color={isRecording ? "#FF0055" : "#00FFCC"} size={28} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTROLS & LYRICS */}
      <View style={styles.controlsContainer}>
        <View style={styles.beatHeader}>
          <Disc color="#1DB954" size={20} />
          <Text style={styles.beatText}>Beat Playing: {songTitle}</Text>
          <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause color="#fff" size={24} /> : <Play color="#1DB954" size={24} />}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.lyricsScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.lyricsText}>{songLyrics}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centerContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 },
  permissionText: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  permBtn: { backgroundColor: '#1DB954', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
  permBtnText: { color: '#fff', fontWeight: 'bold' },
  cameraContainer: { height: width * 0.9, width: '100%', position: 'relative', backgroundColor: '#111' },
  cameraOverlayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, paddingHorizontal: 15 },
  iconBtn: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 20 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cameraOverlayBottom: { position: 'absolute', bottom: 15, width: '100%', alignItems: 'center' },
  recordBtn: { backgroundColor: 'rgba(0,0,0,0.7)', padding: 15, borderRadius: 35, borderWidth: 2, borderColor: '#00FFCC' },
  recordingActive: { borderColor: '#FF0055', backgroundColor: 'rgba(255,0,85,0.2)' },
  controlsContainer: { flex: 1, backgroundColor: '#0A0A0A', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 15, marginTop: -15 },
  beatHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#151515', padding: 12, borderRadius: 10, marginBottom: 15 },
  beatText: { color: '#fff', flex: 1, fontSize: 13, fontWeight: '600' },
  lyricsScroll: { flex: 1, paddingHorizontal: 5 },
  lyricsText: { color: '#DDD', fontSize: 18, lineHeight: 30, textAlign: 'center', fontWeight: '500' },
});