import React, { useState, useEffect } from 'react';
import { MoonIcon, StarsBackground } from '@/components/icons/RamadanIcons';

interface CountdownTimerProps {
  targetTime: string; // HH:MM format
  label: string;
  sublabel?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetTime,
  label,
  sublabel,
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const [hours, minutes] = targetTime.split(':').map(Number);
      
      const target = new Date();
      target.setHours(hours, minutes, 0, 0);
      
      // If target time has passed today, set it for tomorrow
      if (target <= now) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();
      
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="relative gradient-night rounded-3xl p-6 overflow-hidden">
      <StarsBackground count={15} />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <MoonIcon className="text-gold-light animate-float" size={28} />
          <div>
            <h3 className="font-arabic text-xl text-gold-light">{label}</h3>
            {sublabel && (
              <p className="text-sm text-gold-light/70">{sublabel}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-center" dir="ltr">
          <TimeUnit value={formatNumber(timeLeft.hours)} label="ساعة" />
          <span className="text-3xl text-gold-light font-bold animate-pulse">:</span>
          <TimeUnit value={formatNumber(timeLeft.minutes)} label="دقيقة" />
          <span className="text-3xl text-gold-light font-bold animate-pulse">:</span>
          <TimeUnit value={formatNumber(timeLeft.seconds)} label="ثانية" />
        </div>
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: string;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-night-light/50 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px] border border-gold/20">
      <span className="text-3xl font-bold text-gold-light font-body">{value}</span>
    </div>
    <span className="text-xs text-gold-light/60 mt-1 font-body">{label}</span>
  </div>
);
