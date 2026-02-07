import { useState, useEffect, useCallback } from 'react';
import { DailyWorship } from '@/types/ramadan';

const STORAGE_KEY = 'ramadan-worship-tracker';

const defaultWorship: Omit<DailyWorship, 'date'> = {
  prayers: {
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  },
  taraweeh: false,
  tahajjud: false,
  sadaqa: false,
  dailyIntention: '',
};

export const useWorshipTracker = () => {
  const [worshipHistory, setWorshipHistory] = useState<DailyWorship[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(worshipHistory));
  }, [worshipHistory]);

  const getTodayWorship = useCallback((): DailyWorship => {
    const today = new Date().toISOString().split('T')[0];
    const existing = worshipHistory.find(w => w.date === today);
    
    if (existing) return existing;
    
    return { date: today, ...defaultWorship };
  }, [worshipHistory]);

  const updateTodayWorship = useCallback((updates: Partial<DailyWorship>) => {
    const today = new Date().toISOString().split('T')[0];
    
    setWorshipHistory(prev => {
      const existingIndex = prev.findIndex(w => w.date === today);
      
      if (existingIndex >= 0) {
        const newHistory = [...prev];
        newHistory[existingIndex] = { ...prev[existingIndex], ...updates };
        return newHistory;
      }

      return [...prev, { date: today, ...defaultWorship, ...updates }];
    });
  }, []);

  const togglePrayer = useCallback((prayer: keyof DailyWorship['prayers']) => {
    const today = getTodayWorship();
    updateTodayWorship({
      prayers: {
        ...today.prayers,
        [prayer]: !today.prayers[prayer],
      },
    });
  }, [getTodayWorship, updateTodayWorship]);

  const toggleTaraweeh = useCallback(() => {
    const today = getTodayWorship();
    updateTodayWorship({ taraweeh: !today.taraweeh });
  }, [getTodayWorship, updateTodayWorship]);

  const toggleTahajjud = useCallback(() => {
    const today = getTodayWorship();
    updateTodayWorship({ tahajjud: !today.tahajjud });
  }, [getTodayWorship, updateTodayWorship]);

  const toggleSadaqa = useCallback(() => {
    const today = getTodayWorship();
    updateTodayWorship({ sadaqa: !today.sadaqa });
  }, [getTodayWorship, updateTodayWorship]);

  const setDailyIntention = useCallback((intention: string) => {
    updateTodayWorship({ dailyIntention: intention });
  }, [updateTodayWorship]);

  const getPrayerProgress = useCallback((): number => {
    const today = getTodayWorship();
    const prayers = Object.values(today.prayers);
    const completed = prayers.filter(Boolean).length;
    return Math.round((completed / prayers.length) * 100);
  }, [getTodayWorship]);

  const getPrayerLabel = useCallback((prayer: keyof DailyWorship['prayers']): string => {
    const labels = {
      fajr: 'الفجر',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
    };
    return labels[prayer];
  }, []);

  return {
    worshipHistory,
    getTodayWorship,
    updateTodayWorship,
    togglePrayer,
    toggleTaraweeh,
    toggleTahajjud,
    toggleSadaqa,
    setDailyIntention,
    getPrayerProgress,
    getPrayerLabel,
  };
};
