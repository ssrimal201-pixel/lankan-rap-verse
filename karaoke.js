import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function KaraokeScreen() {
  const router = useRouter();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  const [playing, setPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  // Sinhala Rap Karaoke Beat Video ID (Test කිරීමට)
  const YOUTUBE_VIDEO_ID = "SMOhdi5FL44"; 

  if (!cameraPermission || !micPermission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>Permissions පරීක්ෂා කරමින්...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted || !micPermission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>Karaoke Record කිරීමට Camera සහ Microphone අවසර ලබා දෙන්න!</Text>
        <TouchableOpacity style={styles.btn} onPress={() => {
          requestCameraPermission();
          requestMicPermission();
        }}>
          <Text style={styles.btnText}>Permission Allow කරන්න</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 🎤 RECORDING START
  const startRecording = async () => {
    try {
      setIsRecording(true);
      setPlaying(true); // YouTube Beat එක Play වේ

      if (cameraRef.current) {
        const videoData = await cameraRef.current.recordAsync();
        console.log("Recorded Video Saved at:", videoData.uri);
      }
    } catch (error) {
      console.error("Recording Error:", error);
      setIsRecording(false);
      setPlaying(false);
    }
  };

  // 🛑 RECORDING STOP
  const stopRecording = async () => {
    setIsRecording(false);
    setPlaying(false); // YouTube Beat එක Pause වේ

    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Camera Preview */}
      <CameraView style={styles.camera} facing="front" mode="video" ref={cameraRef}>
        
        <View style={styles.overlay}>
          
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={30} color="#FFF" />
          </TouchableOpacity>

          {/* YouTube Beat Player */}
          <View style={styles.playerContainer}>
            <YoutubePlayer
              height={180}
              play={playing}
              videoId={YOUTUBE_VIDEO_ID}
              onChangeState={(state) => {
                if (state === "ended") {
                  stopRecording();
                }
              }}
            />
          </View>

          {/* Sync Lyrics Area */}
          <View style={styles.lyricsBox}>
            <Text style={styles.lyricsText}>
              {isRecording ? "🎤 මහ පාරේ වීදි දිගේ... රැප් තාලේ හිතට දැනේ..." : "Record කරන්න REC Button එක ඔබන්න"}
            </Text>
          </View>

          {/* Record Button */}
          <TouchableOpacity 
            style={[styles.recordBtn, isRecording ? styles.recordingActive : null]} 
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Text style={styles.recordText}>
              {isRecording ? "STOP" : "REC"}
            </Text>
          </TouchableOpacity>

        </View>

      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centerContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 },
  camera: { flex: 1 },
  overlay: { 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 20 
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20
  },
  playerContainer: {
    width: '90%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  lyricsBox: { 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    padding: 15, 
    borderRadius: 12, 
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#00FFCC'
  },
  lyricsText: { 
    color: '#00FFCC', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  recordBtn: { 
    width: 75, 
    height: 75, 
    borderRadius: 38, 
    backgroundColor: '#FF0055', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 4, 
    borderColor: '#FFF' 
  },
  recordingActive: { backgroundColor: '#FF0000', borderRadius: 15 },
  recordText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  text: { color: '#FFF', textAlign: 'center', marginBottom: 20, fontSize: 16 },
  btn: { backgroundColor: '#00FFCC', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  btnText: { color: '#000', fontWeight: 'bold' }
});