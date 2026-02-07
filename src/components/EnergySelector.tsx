import React from 'react';
import { useEnergyLevel } from '@/hooks/useEnergyLevel';
import { EnergyLevel } from '@/types/ramadan';
import { Battery, BatteryLow, BatteryFull, BatteryMedium } from 'lucide-react';

export const EnergySelector: React.FC = () => {
  const { getTodayState, setTodayEnergyLevel, getEnergyEmoji, getEnergyLabel } = useEnergyLevel();
  
  const todayState = getTodayState();
  const currentLevel = todayState?.energyLevel || 'medium';

  const levels: EnergyLevel[] = ['low', 'medium', 'high'];

  return (
    <div className="card-spiritual p-5 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          {currentLevel === 'low' && <BatteryLow className="text-muted-foreground" size={20} />}
          {currentLevel === 'medium' && <BatteryMedium className="text-primary" size={20} />}
          {currentLevel === 'high' && <BatteryFull className="text-accent" size={20} />}
        </div>
        <div>
          <h3 className="font-arabic text-lg text-foreground">حالتك اليوم</h3>
          <p className="text-xs text-muted-foreground">سنعدّل الورد حسب طاقتك</p>
        </div>
      </div>

      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setTodayEnergyLevel(level)}
            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
              currentLevel === level
                ? 'bg-primary/10 border-2 border-primary'
                : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
            }`}
          >
            <span className="text-2xl">{getEnergyEmoji(level)}</span>
            <span className="text-xs font-medium">{getEnergyLabel(level)}</span>
          </button>
        ))}
      </div>

      {currentLevel === 'low' && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          💙 لا بأس، سنخفف الورد اليوم. صحتك أولاً
        </p>
      )}
    </div>
  );
};
