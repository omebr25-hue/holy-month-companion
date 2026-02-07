// Quran types
export interface QuranPage {
  pageNumber: number;
  surahName: string;
  juzNumber: number;
}

export interface DailyWird {
  id: string;
  date: string;
  startPage: number;
  endPage: number;
  totalPages: number;
  readPages: number;
  isCompleted: boolean;
}

export interface WirdSettings {
  type: 'pages_per_day' | 'juz_count' | 'full_khatma' | 'custom';
  pagesPerDay?: number;
  targetJuz?: number;
  startDate: string;
  currentPage: number;
}

// Adhkar types
export interface Dhikr {
  id: string;
  category: DhikrCategory;
  text: string;
  translation?: string;
  count: number;
  source: string;
  hadithGrade?: 'صحيح' | 'حسن' | 'ضعيف';
}

export type DhikrCategory = 
  | 'morning' 
  | 'evening' 
  | 'after_prayer' 
  | 'sleep' 
  | 'waking' 
  | 'home_entry' 
  | 'home_exit'
  | 'food'
  | 'anxiety'
  | 'travel';

export interface DhikrProgress {
  dhikrId: string;
  date: string;
  currentCount: number;
  isCompleted: boolean;
}

// Energy and mood types
export type EnergyLevel = 'low' | 'medium' | 'high';

export interface DailyState {
  date: string;
  energyLevel: EnergyLevel;
  adjustedWirdPages?: number;
}

// Prayer times
export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

// Worship tracking
export interface DailyWorship {
  date: string;
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  taraweeh: boolean;
  tahajjud: boolean;
  sadaqa: boolean;
  dailyIntention: string;
}

// Schedule
export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  duration: number; // in minutes
  type: 'worship' | 'work' | 'rest' | 'family' | 'meal';
  isCompleted: boolean;
}

export interface DaySchedule {
  date: string;
  mode: 'work' | 'holiday';
  items: ScheduleItem[];
}
