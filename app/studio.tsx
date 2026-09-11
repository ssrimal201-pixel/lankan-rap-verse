import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Audio } from 'expo-av';
import { CameraView, useCameraPermissions } from 'expo-camera';
import rapData from '../data/rapVerses.json';

export default function RapStudioScreen() {
  const item = rapData[0]; // Active Track

  const [mode, setMode] = useState<'audio' | 'video'>('audio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const playerRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  // Master Studio Play / Stop Controller
  const toggleMasterStudio = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (mode === 'audio' && recording) {
        await recording.stopAndUnloadAsync();
        Alert.alert('Saved', 'Audio Recording Saved!');
      } else if (mode === 'video' && cameraRef.current) {
        cameraRef.current.stopRecording();
        Alert.alert('Saved', 'Video Recording Saved!');
      }
    } else {
      if (mode === 'audio') {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
        const { recording: newRec } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRec);
      } else {
        if (!permission?.granted) await requestPermission();
      }
      setIsPlaying(true);
    }
  };

  // Sync Timer Logic
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(async () => {
        if (playerRef.current) {
          const time = await playerRef.current.getCurrentTime();
          setCurrentTime(time);
        }
      }, 300);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentLyricIndex = item.syncedLyrics.findLastIndex((l) => currentTime >= l.time);

  return (
    <View style={styles.container}>
      {/* Audio / Video Switcher */}
      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeTab, mode === 'audio' && styles.activeModeTab]}
          onPress={() => setMode('audio')}
        >
          <Text style={styles.modeText}>🎙 AUDIO ONLY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeTab, mode === 'video' && styles.activeModeTab]}
          onPress={() => setMode('video')}
        >
          <Text style={styles.modeText}>📹 CAMERA VIDEO</Text>
        </TouchableOpacity>
      </View>

      {/* Media Player / Camera Preview */}
      {mode === 'video' ? (
        <CameraView style={styles.cameraPreview} facing="front" ref={cameraRef}>
          <View style={styles.miniVideoOverlay}>
            <YoutubePlayer ref={playerRef} height={90} play={isPlaying} videoId={item.youtubeId} />
          </View>
        </CameraView>
      ) : (
        <View style={styles.miniVideoContainer}>
          <YoutubePlayer ref={playerRef} height={100} play={isPlaying} videoId={item.youtubeId} />
        </View>
      )}

      {/* Synced Lyrics List */}
      <ScrollView contentContainerStyle={styles.lyricsContainer}>
        {item.syncedLyrics.map((line, index) => (
          <Text key={index} style={[styles.lyricLine, index === currentLyricIndex && styles.activeLyricLine]}>
            {line.text}
          </Text>
        ))}
      </ScrollView>

      {/* Master Control Bar */}
      <View style={styles.controlsBar}>
        <TouchableOpacity style={styles.masterButton} onPress={toggleMasterStudio}>
          <Text style={styles.buttonText}>
            {isPlaying ? '⏸ PAUSE STUDIO' : mode === 'audio' ? '🎙 RECORD VOICE' : '🎥 RECORD VIDEO'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  modeSelector: { flexDirection: 'row', backgroundColor: '#1a1a1a', paddingTop: 10 },
  modeTab: { flex: 1, padding: 12, alignItems: 'center' },
  activeModeTab: { borderBottomWidth: 3, borderBottomColor: '#FF0055', backgroundColor: '#252525' },
  modeText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  miniVideoContainer: { height: 100, backgroundColor: '#000' },
  cameraPreview: { height: 220, width: '100%' },
  miniVideoOverlay: { height: 90, width: 140, position: 'absolute', top: 10, right: 10, borderRadius: 8, overflow: 'hidden' },
  lyricsContainer: { padding: 20, alignItems: 'center' },
  lyricLine: { color: '#555', fontSize: 18, marginVertical: 8, textAlign: 'center' },
  activeLyricLine: { color: '#00FF66', fontSize: 22, fontWeight: 'bold' },
  controlsBar: { padding: 15, backgroundColor: '#111' },
  masterButton: { backgroundColor: '#FF0055', padding: 15, borderRadius: 30 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }
});
