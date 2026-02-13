import React, { useState } from 'react';
import { RamadanHeader } from '@/components/RamadanHeader';
import { CountdownTimer } from '@/components/CountdownTimer';
import { QuranWirdCard } from '@/components/QuranWirdCard';
import { AdhkarCard } from '@/components/AdhkarCard';
import { AdhkarDetailView } from '@/components/AdhkarDetailView';
import { EnergySelector } from '@/components/EnergySelector';
import { WorshipTracker } from '@/components/WorshipTracker';
import { BottomNav, Tab } from '@/components/BottomNav';
import { QuranReader } from '@/components/QuranReader';
import { DigitalTasbih } from '@/components/DigitalTasbih';
import { DailySchedule } from '@/components/DailySchedule';
import { DhikrCategory } from '@/types/ramadan';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedAdhkarCategory, setSelectedAdhkarCategory] = useState<DhikrCategory | null>(null);
  const [showQuranReader, setShowQuranReader] = useState(false);

  const maghribTime = "18:30";
  const fajrTime = "04:45";
  const currentHour = new Date().getHours();
  const isNight = currentHour >= 18 || currentHour < 5;

  if (selectedAdhkarCategory) {
    return (
      <AdhkarDetailView
        category={selectedAdhkarCategory}
        onBack={() => setSelectedAdhkarCategory(null)}
      />
    );
  }

  if (showQuranReader) {
    return (
      <div>
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
          <button
            onClick={() => setShowQuranReader(false)}
            className="text-sm text-primary font-medium flex items-center gap-1"
          >
            ← رجوع
          </button>
        </div>
        <QuranReader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {activeTab === 'home' && (
        <>
          <RamadanHeader dayNumber={15} />
          
          <div className="px-4 -mt-6 space-y-5">
            <CountdownTimer
              targetTime={isNight ? fajrTime : maghribTime}
              label={isNight ? "الوقت المتبقي للسحور" : "الوقت المتبقي للإفطار"}
              sublabel={isNight ? `السحور: ${fajrTime}` : `المغرب: ${maghribTime}`}
            />

            <div className="card-spiritual p-4 flex items-center gap-3">
              <Sparkles className="text-primary shrink-0" size={20} />
              <p className="font-arabic text-sm text-foreground leading-relaxed">
                "اللهم إنك عفو تحب العفو فاعف عني"
              </p>
            </div>

            <EnergySelector />
            <QuranWirdCard />
            <WorshipTracker />

            {/* Daily Schedule */}
            <div className="space-y-3">
              <h2 className="font-arabic text-xl text-foreground px-1">📋 جدول اليوم</h2>
              <DailySchedule />
            </div>

            {/* Adhkar Section */}
            <div className="space-y-3">
              <h2 className="font-arabic text-xl text-foreground px-1">الأذكار</h2>
              <div className="grid grid-cols-1 gap-3">
                <AdhkarCard category="morning" onViewDetails={() => setSelectedAdhkarCategory('morning')} />
                <AdhkarCard category="evening" onViewDetails={() => setSelectedAdhkarCategory('evening')} />
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'quran' && (
        <div className="p-4">
          <h1 className="font-arabic text-2xl text-foreground mb-6 text-center pt-6">
            القرآن الكريم
          </h1>
          <QuranWirdCard />
          
          <div className="mt-6 card-spiritual p-6 text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowQuranReader(true)}>
            <div className="text-4xl mb-4">📖</div>
            <h3 className="font-arabic text-lg mb-2">قارئ القرآن</h3>
            <p className="text-sm text-muted-foreground">
              اضغط لفتح القارئ مع النص العثماني
            </p>
          </div>
        </div>
      )}

      {activeTab === 'adhkar' && (
        <div className="p-4 pt-8">
          <h1 className="font-arabic text-2xl text-foreground mb-6 text-center">
            الأذكار والأوراد
          </h1>
          
          <div className="space-y-3">
            <AdhkarCard category="morning" onViewDetails={() => setSelectedAdhkarCategory('morning')} />
            <AdhkarCard category="evening" onViewDetails={() => setSelectedAdhkarCategory('evening')} />
            <AdhkarCard category="after_prayer" onViewDetails={() => setSelectedAdhkarCategory('after_prayer')} />
            <AdhkarCard category="sleep" onViewDetails={() => setSelectedAdhkarCategory('sleep')} />
            <AdhkarCard category="waking" onViewDetails={() => setSelectedAdhkarCategory('waking')} />
            <AdhkarCard category="home_entry" onViewDetails={() => setSelectedAdhkarCategory('home_entry')} />
            <AdhkarCard category="home_exit" onViewDetails={() => setSelectedAdhkarCategory('home_exit')} />
            <AdhkarCard category="food" onViewDetails={() => setSelectedAdhkarCategory('food')} />
            <AdhkarCard category="anxiety" onViewDetails={() => setSelectedAdhkarCategory('anxiety')} />
            <AdhkarCard category="travel" onViewDetails={() => setSelectedAdhkarCategory('travel')} />
          </div>

          {/* Digital Tasbih */}
          <div className="mt-8">
            <h2 className="font-arabic text-xl text-foreground mb-4 text-center">📿 المسبحة الرقمية</h2>
            <DigitalTasbih />
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="p-4 pt-8">
          <h1 className="font-arabic text-2xl text-foreground mb-6 text-center">
            الإعدادات
          </h1>
          
          <div className="space-y-4">
            <div className="card-spiritual p-5">
              <h3 className="font-arabic text-lg mb-3">إعدادات الورد</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">نوع الورد</span>
                  <span className="font-medium">ختمة كاملة</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">الصفحة الحالية</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">الأيام المتبقية</span>
                  <span className="font-medium">30 يوم</span>
                </div>
              </div>
            </div>

            <div className="card-spiritual p-5">
              <h3 className="font-arabic text-lg mb-3">التذكيرات</h3>
              <p className="text-sm text-muted-foreground">
                قريبًا: إعدادات التذكيرات الذكية
              </p>
            </div>

            <div className="card-spiritual p-5">
              <h3 className="font-arabic text-lg mb-3">عن التطبيق</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                المرافق الرمضاني الذكي - رفيقك الروحي في شهر الخير والبركات.
                صُمم بحب لمساعدتك على الاستمتاع بعبادتك بدون ضغط.
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                الإصدار 2.0.0
              </p>
            </div>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
