import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Info, Mail, ShieldCheck, ChevronLeft } from 'lucide-react-native';

export default function AboutScreen() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <SafeAreaView style={styles.container}>
      {/* උඩ තියෙන Default Header එක අයින් කළා */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Custom Back Button */}
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <ChevronLeft size={32} color="#1DB954" />
        </TouchableOpacity>

        {/* App Branding */}
        <View style={styles.headerSection}>
          <Text style={styles.appName}>Lankan Rap Verse</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={20} color="#1DB954" />
            <Text style={styles.sectionTitle}>අප ගැන</Text>
          </View>
          <Text style={styles.description}>
            Lankan Rap Verse යනු ශ්‍රී ලාංකීය රැප් සංගීත ලෝලීන් සඳහාම වෙන්වූ ඇප් එකකි. 
            ඔබ ප්‍රියකරන සියලුම රැප් ශිල්පීන්ගේ සින්දු සහ පද පේළි දැන් එකම තැනකින් ලබාගත හැක.
          </Text>
        </View>

        {/* Copyright Disclaimer */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShieldCheck size={20} color="#1DB954" />
            <Text style={styles.sectionTitle}>Copyright Disclaimer</Text>
          </View>
          <Text style={styles.disclaimer}>
            මෙහි අන්තර්ගත සියලුම පද පේළි සහ ඡායාරූප ඒවාහි මුල් නිර්මාණකරුවන් සතු වේ. 
            යම් නිර්මාණකරුවෙකු තම නිර්මාණ මෙහි ප්‍රදර්ශනය කිරීමට අකමැති නම්, කරුණාකර අපව සම්බන්ධ කරගන්න. 
            අප වහාම ඒවා ඉවත් කිරීමට කටයුතු කරන්නෙමු.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Mail size={20} color="#1DB954" />
            <Text style={styles.sectionTitle}>සම්බන්ධ වීමට</Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@lankanrapverse.com')}>
            <Text style={styles.emailText}>ssrimal201@gmail.com</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>© {currentYear} Lankan Rap Verse</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 25 },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: '#111',
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  headerSection: { alignItems: 'center', marginBottom: 40 },
  appName: { color: '#fff', fontSize: 32, fontWeight: '900', letterSpacing: 1 },
  version: { color: '#1DB954', fontSize: 14, fontWeight: '600', marginTop: 5 },
  section: { backgroundColor: '#111', padding: 20, borderRadius: 20, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  description: { color: '#eee', fontSize: 15, lineHeight: 24 },
  disclaimer: { color: '#aaa', fontSize: 13, lineHeight: 20 },
  emailText: { color: '#1DB954', fontSize: 16, fontWeight: '600', marginTop: 5, textDecorationLine: 'underline' },
  footerText: { color: '#333', textAlign: 'center', marginTop: 30, fontSize: 12, fontWeight: 'bold' }
});