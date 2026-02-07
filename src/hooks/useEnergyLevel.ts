import { useState, useEffect, useCallback } from 'react';
import { EnergyLevel, DailyState } from '@/types/ramadan';

const STORAGE_KEY = 'ramadan-daily-state';

export const useEnergyLevel = () => {
  const [dailyStates, setDailyStates] = useState<DailyState[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dailyStates));
  }, [dailyStates]);

  const getTodayState = useCallback((): DailyState | undefined => {
    const today = new Date().toISOString().split('T')[0];
    return dailyStates.find(s => s.date === today);
  }, [dailyStates]);

  const setTodayEnergyLevel = useCallback((level: EnergyLevel) => {
    const today = new Date().toISOString().split('T')[0];
    
    setDailyStates(prev => {
      const existingIndex = prev.findIndex(s => s.date === today);
      
      if (existingIndex >= 0) {
        const newStates = [...prev];
        newStates[existingIndex] = { ...prev[existingIndex], energyLevel: level };
        return newStates;
      }

      return [...prev, { date: today, energyLevel: level }];
    });
  }, []);

  const getEnergyEmoji = useCallback((level: EnergyLevel): string => {
    switch (level) {
      case 'low':
        return '🌙';
      case 'medium':
        return '⭐';
      case 'high':
        return '☀️';
    }
  }, []);

  const getEnergyLabel = useCallback((level: EnergyLevel): string => {
    switch (level) {
      case 'low':
        return 'طاقة منخفضة';
      case 'medium':
        return 'طاقة متوسطة';
      case 'high':
        return 'طاقة عالية';
    }
  }, []);

  const getEnergyColor = useCallback((level: EnergyLevel): string => {
    switch (level) {
      case 'low':
        return 'text-blue-400';
      case 'medium':
        return 'text-amber-400';
      case 'high':
        return 'text-orange-400';
    }
  }, []);

  return {
    dailyStates,
    getTodayState,
    setTodayEnergyLevel,
    getEnergyEmoji,
    getEnergyLabel,
    getEnergyColor,
  };
};
