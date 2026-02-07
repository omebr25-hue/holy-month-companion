import React from 'react';
import { Home, BookOpen, Moon, Settings } from 'lucide-react';

type Tab = 'home' | 'quran' | 'adhkar' | 'settings';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'الرئيسية', icon: <Home size={22} /> },
    { id: 'quran', label: 'القرآن', icon: <BookOpen size={22} /> },
    { id: 'adhkar', label: 'الأذكار', icon: <Moon size={22} /> },
    { id: 'settings', label: 'الإعدادات', icon: <Settings size={22} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-primary/10' : ''
              }`}
            >
              {tab.icon}
            </div>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export type { Tab };
