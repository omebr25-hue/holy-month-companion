import React, { useState } from 'react';
import { RamadanHeader } from '@/components/RamadanHeader';
import { CountdownTimer } from '@/components/CountdownTimer';
import { QuranWirdCard } from '@/components/QuranWirdCard';
import { AdhkarCard } from '@/components/AdhkarCard';
import { AdhkarDetailView } from '@/components/AdhkarDetailView';
import { EnergySelector } from '@/components/EnergySelector';
import { WorshipTracker } from '@/components/WorshipTracker';
import { BottomNav, Tab } from '@/components/BottomNav';
import { DhikrCategory } from '@/types/ramadan';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedAdhkarCategory, setSelectedAdhkarCategory] = useState<DhikrCategory | null>(null);

  // Simulated prayer times (would come from API in production)
  const maghribTime = "18:30";
  const fajrTime = "04:45";

  // Check if it's night (between Maghrib and Fajr)
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

  return (
    <div className="min-h-screen bg-background pb-24">
      {activeTab === 'home' && (
        <>
          <RamadanHeader dayNumber={15} />
          
          <div className="px-4 -mt-6 space-y-5">
            {/* Countdown Timer */}
            <CountdownTimer
              targetTime={isNight ? fajrTime : maghribTime}
              label={isNight ? "الوقت المتبقي للسحور" : "الوقت المتبقي للإفطار"}
              sublabel={isNight ? `السحور: ${fajrTime}` : `المغرب: ${maghribTime}`}
            />

            {/* Spiritual Quote */}
            <div className="card-spiritual p-4 flex items-center gap-3">
              <Sparkles className="text-primary shrink-0" size={20} />
              <p className="font-arabic text-sm text-foreground leading-relaxed">
                "اللهم إنك عفو تحب العفو فاعف عني"
              </p>
            </div>

            {/* Energy Selector */}
            <EnergySelector />

            {/* Quran Wird */}
            <QuranWirdCard />

            {/* Worship Tracker */}
            <WorshipTracker />

            {/* Adhkar Section */}
            <div className="space-y-3">
              <h2 className="font-arabic text-xl text-foreground px-1">الأذكار</h2>
              <div className="grid grid-cols-1 gap-3">
                <AdhkarCard 
                  category="morning" 
                  onViewDetails={() => setSelectedAdhkarCategory('morning')}
                />
                <AdhkarCard 
                  category="evening"
                  onViewDetails={() => setSelectedAdhkarCategory('evening')}
                />
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
          
          <div className="mt-6 card-spiritual p-6 text-center">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="font-arabic text-lg mb-2">قارئ القرآن</h3>
            <p className="text-sm text-muted-foreground">
              قريبًا: قارئ القرآن مع النص العثماني الواضح
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
            <AdhkarCard 
              category="morning" 
              onViewDetails={() => setSelectedAdhkarCategory('morning')}
            />
            <AdhkarCard 
              category="evening"
              onViewDetails={() => setSelectedAdhkarCategory('evening')}
            />
            <AdhkarCard 
              category="after_prayer"
              onViewDetails={() => setSelectedAdhkarCategory('after_prayer')}
            />
            <AdhkarCard 
              category="sleep"
              onViewDetails={() => setSelectedAdhkarCategory('sleep')}
            />
          </div>

          {/* Digital Tasbih teaser */}
          <div className="mt-6 card-spiritual p-6 text-center">
            <div className="text-4xl mb-4">📿</div>
            <h3 className="font-arabic text-lg mb-2">المسبحة الرقمية</h3>
            <p className="text-sm text-muted-foreground">
              قريبًا: عدّاد تسبيح رقمي مع أذكار مخصصة
            </p>
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
                الإصدار 1.0.0
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
