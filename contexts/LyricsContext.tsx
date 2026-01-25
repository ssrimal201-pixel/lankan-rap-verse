import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SavedSong {
  id?: string; // id එක optional කළා params වලින් එන නිසා
  songTitle: string;
  artistName: string;
  artistImage: string;
  lyrics: string;
}

interface LyricsContextType {
  savedLyrics: SavedSong[];
  saveLyric: (song: SavedSong) => void; // නම වෙනස් කළා
  removeLyric: (title: string, artist: string) => void; // නම වෙනස් කළා
  isLyricSaved: (title: string, artist: string) => boolean; // නම වෙනස් කළා
}

const LyricsContext = createContext<LyricsContextType | undefined>(undefined);

export function LyricsProvider({ children }: { children: React.ReactNode }) {
  const [savedLyrics, setSavedLyrics] = useState<SavedSong[]>([]);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('saved_lyrics');
      if (storedData) setSavedLyrics(JSON.parse(storedData));
    } catch (e) { console.error(e); }
  };

  const saveLyric = async (song: SavedSong) => {
    const updatedList = [...savedLyrics, song];
    setSavedLyrics(updatedList);
    await AsyncStorage.setItem('saved_lyrics', JSON.stringify(updatedList));
  };

  const removeLyric = async (title: string, artist: string) => {
    const updatedList = savedLyrics.filter(
      s => !(s.songTitle === title && s.artistName === artist)
    );
    setSavedLyrics(updatedList);
    await AsyncStorage.setItem('saved_lyrics', JSON.stringify(updatedList));
  };

  const isLyricSaved = (title: string, artist: string) => {
    return savedLyrics.some(s => s.songTitle === title && s.artistName === artist);
  };

  return (
    <LyricsContext.Provider value={{ savedLyrics, saveLyric, removeLyric, isLyricSaved }}>
      {children}
    </LyricsContext.Provider>
  );
}

export const useLyrics = () => {
  const context = useContext(LyricsContext);
  if (!context) throw new Error('useLyrics error');
  return context;
};