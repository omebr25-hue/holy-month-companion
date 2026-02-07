import { useState, useEffect, useCallback } from 'react';
import { DailyWird, WirdSettings, EnergyLevel } from '@/types/ramadan';
import { TOTAL_PAGES, RAMADAN_DAYS, distributePages, getSurahByPage } from '@/data/quran';

const STORAGE_KEY = 'ramadan-wird-settings';
const WIRD_HISTORY_KEY = 'ramadan-wird-history';

const defaultSettings: WirdSettings = {
  type: 'full_khatma',
  startDate: new Date().toISOString().split('T')[0],
  currentPage: 1,
};

export const useQuranWird = () => {
  const [settings, setSettings] = useState<WirdSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [dailyWirds, setDailyWirds] = useState<DailyWird[]>(() => {
    const saved = localStorage.getItem(WIRD_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Save wirds to localStorage
  useEffect(() => {
    localStorage.setItem(WIRD_HISTORY_KEY, JSON.stringify(dailyWirds));
  }, [dailyWirds]);

  // Calculate remaining days in Ramadan
  const getRemainingDays = useCallback(() => {
    const startDate = new Date(settings.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(RAMADAN_DAYS - diffDays, 1);
  }, [settings.startDate]);

  // Calculate today's wird based on settings
  const calculateTodayWird = useCallback((energyLevel: EnergyLevel = 'medium'): DailyWird => {
    const today = new Date().toISOString().split('T')[0];
    const existingWird = dailyWirds.find(w => w.date === today);
    
    if (existingWird) return existingWird;

    const remainingDays = getRemainingDays();
    const remainingPages = TOTAL_PAGES - settings.currentPage + 1;
    
    let targetPages: number;
    
    switch (settings.type) {
      case 'pages_per_day':
        targetPages = settings.pagesPerDay || 20;
        break;
      case 'juz_count':
        const targetJuz = settings.targetJuz || 1;
        targetPages = Math.ceil((targetJuz * 20) / remainingDays);
        break;
      case 'full_khatma':
        targetPages = Math.ceil(remainingPages / remainingDays);
        break;
      case 'custom':
        targetPages = settings.pagesPerDay || 10;
        break;
      default:
        targetPages = 20;
    }

    // Adjust based on energy level
    const adjustmentFactor = {
      low: 0.6,
      medium: 1,
      high: 1.3,
    };
    
    const adjustedPages = Math.round(targetPages * adjustmentFactor[energyLevel]);
    const startPage = settings.currentPage;
    const endPage = Math.min(startPage + adjustedPages - 1, TOTAL_PAGES);

    return {
      id: `wird-${today}`,
      date: today,
      startPage,
      endPage,
      totalPages: endPage - startPage + 1,
      readPages: 0,
      isCompleted: false,
    };
  }, [settings, dailyWirds, getRemainingDays]);

  // Mark pages as read
  const markPagesRead = useCallback((pages: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setDailyWirds(prev => {
      const existingIndex = prev.findIndex(w => w.date === today);
      const currentWird = existingIndex >= 0 ? prev[existingIndex] : calculateTodayWird();
      
      const updatedWird = {
        ...currentWird,
        readPages: Math.min(currentWird.readPages + pages, currentWird.totalPages),
        isCompleted: currentWird.readPages + pages >= currentWird.totalPages,
      };

      if (existingIndex >= 0) {
        const newWirds = [...prev];
        newWirds[existingIndex] = updatedWird;
        return newWirds;
      }
      return [...prev, updatedWird];
    });

    // Update current page in settings
    setSettings(prev => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + pages, TOTAL_PAGES),
    }));
  }, [calculateTodayWird]);

  // Complete today's wird
  const completeTodayWird = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    
    setDailyWirds(prev => {
      const existingIndex = prev.findIndex(w => w.date === today);
      const currentWird = existingIndex >= 0 ? prev[existingIndex] : calculateTodayWird();
      
      const updatedWird = {
        ...currentWird,
        readPages: currentWird.totalPages,
        isCompleted: true,
      };

      // Update current page
      setSettings(s => ({
        ...s,
        currentPage: Math.min(currentWird.endPage + 1, TOTAL_PAGES),
      }));

      if (existingIndex >= 0) {
        const newWirds = [...prev];
        newWirds[existingIndex] = updatedWird;
        return newWirds;
      }
      return [...prev, updatedWird];
    });
  }, [calculateTodayWird]);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<WirdSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Get progress percentage
  const getProgress = useCallback(() => {
    return Math.round((settings.currentPage / TOTAL_PAGES) * 100);
  }, [settings.currentPage]);

  // Get today's surah
  const getTodaySurah = useCallback(() => {
    return getSurahByPage(settings.currentPage);
  }, [settings.currentPage]);

  return {
    settings,
    dailyWirds,
    todayWird: calculateTodayWird(),
    getRemainingDays,
    calculateTodayWird,
    markPagesRead,
    completeTodayWird,
    updateSettings,
    getProgress,
    getTodaySurah,
  };
};
