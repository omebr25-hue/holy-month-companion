import React from 'react';
import { StarsBackground } from '@/components/icons/RamadanIcons';
import ramadanHero from '@/assets/ramadan-hero.jpg';

interface RamadanHeaderProps {
  dayNumber?: number;
}

export const RamadanHeader: React.FC<RamadanHeaderProps> = ({ dayNumber = 15 }) => {
  const today = new Date();
  const hijriMonth = 'رمضان';
  const hijriYear = '1446';

  return (
    <header className="relative rounded-b-[2.5rem] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ramadanHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-secondary/60" />
      
      <div className="relative z-10 px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gold-light/90 text-sm mb-1">
              {today.toLocaleDateString('ar-SA', { weekday: 'long' })}
            </p>
            <h1 className="font-arabic text-2xl text-gold-light">
              {dayNumber} {hijriMonth} {hijriYear}
            </h1>
          </div>
          
          <div className="relative">
            <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center animate-float glow-gold">
              <span className="text-3xl">🌙</span>
            </div>
          </div>
        </div>

        <div className="text-center pb-4">
          <h2 className="font-arabic text-3xl text-gold-light mb-2 drop-shadow-lg">
            المرافق الرمضاني
          </h2>
          <p className="text-gold-light/80 text-sm">
            رفيقك الروحي في شهر الخير
          </p>
        </div>
      </div>
    </header>
  );
};
