import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, ScrollView, Alert, SafeAreaView } from "react-native";
import { Send, Music2, User } from "lucide-react-native";
import { Stack } from "expo-router"; // Header එක hide කරන්න ඕනේ නිසා

export default function RequestScreen() {
  const [artistName, setArtistName] = useState("");
  const [songTitle, setSongTitle] = useState("");

  const handleRequest = () => {
    if (!artistName || !songTitle) {
      Alert.alert("Error", "Please fill in both Artist and Song name.");
      return;
    }

    const myNumber = "94782939525"; 
    const message = `Hi! I would like to request a song lyric:%0A%0AArtist: ${artistName}%0ASong: ${songTitle}`;
    const whatsappUrl = `whatsapp://send?phone=${myNumber}&text=${message}`;

    Linking.canOpenURL(whatsappUrl).then((supported) => {
      if (supported) {
        Linking.openURL(whatsappUrl);
      } else {
        // WhatsApp නැති අයට වෙබ් එකෙන් යවන්න පුළුවන් link එක
        const webUrl = `https://wa.me/${myNumber}?text=${message}`;
        Linking.openURL(webUrl);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* පේජ් එකේ උඩින් පේන default header එක අයින් කිරීම */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Music2 size={40} color="#1DB954" />
          </View>
          <Text style={styles.title}>Request Lyrics</Text>
          <Text style={styles.subtitle}>Can't find your favorite rap?{"\n"}Let me know and I'll add it!</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Artist Name</Text>
          <View style={styles.inputGroup}>
            <User size={18} color="#1DB954" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Smokio / Costa"
              placeholderTextColor="#555"
              value={artistName}
              onChangeText={setArtistName}
            />
          </View>

          <Text style={styles.label}>Song Title</Text>
          <View style={styles.inputGroup}>
            <Music2 size={18} color="#1DB954" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Rap Yuddhaya"
              placeholderTextColor="#555"
              value={songTitle}
              onChangeText={setSongTitle}
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, (!artistName || !songTitle) && { opacity: 0.6 }]} 
            onPress={handleRequest}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Send to Developer</Text>
            <Send size={18} color="#000" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Requests will be sent directly to the developer via WhatsApp. 
            We will try to add your request as soon as possible.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { padding: 25, paddingTop: 60 },
  header: { alignItems: "center", marginBottom: 40 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  title: { color: "#fff", fontSize: 30, fontWeight: "900", marginTop: 10 },
  subtitle: { color: "#888", fontSize: 15, textAlign: "center", marginTop: 8, lineHeight: 22 },
  form: { backgroundColor: "#0a0a0a", padding: 20, borderRadius: 25 },
  label: { color: "#fff", fontSize: 14, fontWeight: "600", marginBottom: 8, marginLeft: 5 },
  inputGroup: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#151515", 
    borderRadius: 15, 
    marginBottom: 20, 
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#222"
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: "#fff", height: 55, fontSize: 16 },
  button: { 
    flexDirection: "row", 
    backgroundColor: "#1DB954", 
    height: 60, 
    borderRadius: 15, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 10,
    gap: 12,
    shadowColor: "#1DB954",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },
  buttonText: { color: "#000", fontSize: 17, fontWeight: "800" },
  infoBox: { marginTop: 40, paddingHorizontal: 20 },
  infoText: { color: "#444", fontSize: 13, textAlign: "center", lineHeight: 20 }
});