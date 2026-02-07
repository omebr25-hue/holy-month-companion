import React from 'react';
import { useWorshipTracker } from '@/hooks/useWorshipTracker';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { PrayerIcon } from '@/components/icons/RamadanIcons';

export const WorshipTracker: React.FC = () => {
  const { 
    getTodayWorship, 
    togglePrayer, 
    toggleTaraweeh, 
    toggleTahajjud,
    toggleSadaqa,
    getPrayerProgress,
    getPrayerLabel,
  } = useWorshipTracker();

  const today = getTodayWorship();
  const prayerProgress = getPrayerProgress();

  const prayers: (keyof typeof today.prayers)[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

  return (
    <div className="card-spiritual p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <PrayerIcon className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-arabic text-lg text-foreground">متابع العبادات</h3>
            <p className="text-xs text-muted-foreground">الصلوات اليومية</p>
          </div>
        </div>
        <span className="text-sm font-bold text-primary">{prayerProgress}%</span>
      </div>

      {/* Prayers Grid */}
      <div className="flex gap-2 mb-4">
        {prayers.map((prayer) => (
          <button
            key={prayer}
            onClick={() => togglePrayer(prayer)}
            className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              today.prayers[prayer]
                ? 'bg-spiritual-green text-white'
                : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            {today.prayers[prayer] ? (
              <Check size={18} />
            ) : (
              <div className="w-[18px] h-[18px] rounded-full border-2 border-current" />
            )}
            <span className="text-xs font-medium">{getPrayerLabel(prayer)}</span>
          </button>
        ))}
      </div>

      <Progress value={prayerProgress} className="h-2 mb-4" />

      {/* Extra worship */}
      <div className="grid grid-cols-3 gap-2">
        <WorshipButton
          label="التراويح"
          emoji="🌙"
          isActive={today.taraweeh}
          onClick={toggleTaraweeh}
        />
        <WorshipButton
          label="التهجد"
          emoji="✨"
          isActive={today.tahajjud}
          onClick={toggleTahajjud}
        />
        <WorshipButton
          label="الصدقة"
          emoji="💝"
          isActive={today.sadaqa}
          onClick={toggleSadaqa}
        />
      </div>
    </div>
  );
};

interface WorshipButtonProps {
  label: string;
  emoji: string;
  isActive: boolean;
  onClick: () => void;
}

const WorshipButton: React.FC<WorshipButtonProps> = ({
  label,
  emoji,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
      isActive
        ? 'bg-primary/10 border-2 border-primary'
        : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
    }`}
  >
    <span className="text-xl">{emoji}</span>
    <span className="text-xs font-medium">{label}</span>
    {isActive && <Check size={14} className="text-primary" />}
  </button>
);
