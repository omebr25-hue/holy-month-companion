import { useState, useEffect, useCallback } from 'react';
import { Dhikr, DhikrProgress, DhikrCategory } from '@/types/ramadan';
import { morningAdhkar, eveningAdhkar, afterPrayerAdhkar, sleepAdhkar } from '@/data/adhkar';

const PROGRESS_KEY = 'ramadan-adhkar-progress';

export const useAdhkar = () => {
  const [progress, setProgress] = useState<DhikrProgress[]>(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  // Get adhkar by category
  const getAdhkarByCategory = useCallback((category: DhikrCategory): Dhikr[] => {
    switch (category) {
      case 'morning':
        return morningAdhkar;
      case 'evening':
        return eveningAdhkar;
      case 'after_prayer':
        return afterPrayerAdhkar;
      case 'sleep':
        return sleepAdhkar;
      default:
        return [];
    }
  }, []);

  // Get today's progress for a dhikr
  const getDhikrProgress = useCallback((dhikrId: string): DhikrProgress | undefined => {
    const today = new Date().toISOString().split('T')[0];
    return progress.find(p => p.dhikrId === dhikrId && p.date === today);
  }, [progress]);

  // Increment dhikr count
  const incrementDhikr = useCallback((dhikr: Dhikr) => {
    const today = new Date().toISOString().split('T')[0];
    
    setProgress(prev => {
      const existingIndex = prev.findIndex(
        p => p.dhikrId === dhikr.id && p.date === today
      );

      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        const newCount = existing.currentCount + 1;
        const newProgress = [...prev];
        newProgress[existingIndex] = {
          ...existing,
          currentCount: newCount,
          isCompleted: newCount >= dhikr.count,
        };
        return newProgress;
      }

      return [
        ...prev,
        {
          dhikrId: dhikr.id,
          date: today,
          currentCount: 1,
          isCompleted: dhikr.count === 1,
        },
      ];
    });
  }, []);

  // Complete a dhikr
  const completeDhikr = useCallback((dhikr: Dhikr) => {
    const today = new Date().toISOString().split('T')[0];
    
    setProgress(prev => {
      const existingIndex = prev.findIndex(
        p => p.dhikrId === dhikr.id && p.date === today
      );

      if (existingIndex >= 0) {
        const newProgress = [...prev];
        newProgress[existingIndex] = {
          ...prev[existingIndex],
          currentCount: dhikr.count,
          isCompleted: true,
        };
        return newProgress;
      }

      return [
        ...prev,
        {
          dhikrId: dhikr.id,
          date: today,
          currentCount: dhikr.count,
          isCompleted: true,
        },
      ];
    });
  }, []);

  // Get category completion percentage
  const getCategoryProgress = useCallback((category: DhikrCategory): number => {
    const today = new Date().toISOString().split('T')[0];
    const adhkar = getAdhkarByCategory(category);
    
    if (adhkar.length === 0) return 0;

    const completedCount = adhkar.filter(dhikr => {
      const dhikrProgress = progress.find(
        p => p.dhikrId === dhikr.id && p.date === today
      );
      return dhikrProgress?.isCompleted;
    }).length;

    return Math.round((completedCount / adhkar.length) * 100);
  }, [progress, getAdhkarByCategory]);

  // Reset today's progress for a category
  const resetCategoryProgress = useCallback((category: DhikrCategory) => {
    const today = new Date().toISOString().split('T')[0];
    const adhkar = getAdhkarByCategory(category);
    const dhikrIds = adhkar.map(d => d.id);

    setProgress(prev => 
      prev.filter(p => !(dhikrIds.includes(p.dhikrId) && p.date === today))
    );
  }, [getAdhkarByCategory]);

  return {
    progress,
    getAdhkarByCategory,
    getDhikrProgress,
    incrementDhikr,
    completeDhikr,
    getCategoryProgress,
    resetCategoryProgress,
  };
};
