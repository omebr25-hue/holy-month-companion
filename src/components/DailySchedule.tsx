import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clock, Briefcase, Palmtree } from 'lucide-react';

const SCHEDULE_KEY = 'ramadan-daily-schedule';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: 'worship' | 'work' | 'rest' | 'family' | 'meal';
  isCompleted: boolean;
}

const workDayTemplate: ScheduleItem[] = [
  { id: 's1', title: 'السحور', time: '04:00', type: 'meal', isCompleted: false },
  { id: 's2', title: 'صلاة الفجر + الأذكار', time: '04:45', type: 'worship', isCompleted: false },
  { id: 's3', title: 'ورد القرآن الصباحي', time: '05:15', type: 'worship', isCompleted: false },
  { id: 's4', title: 'النوم / الراحة', time: '06:00', type: 'rest', isCompleted: false },
  { id: 's5', title: 'الاستيقاظ والعمل', time: '08:00', type: 'work', isCompleted: false },
  { id: 's6', title: 'صلاة الظهر', time: '12:30', type: 'worship', isCompleted: false },
  { id: 's7', title: 'صلاة العصر', time: '15:45', type: 'worship', isCompleted: false },
  { id: 's8', title: 'ورد القرآن المسائي', time: '16:30', type: 'worship', isCompleted: false },
  { id: 's9', title: 'أذكار المساء', time: '17:00', type: 'worship', isCompleted: false },
  { id: 's10', title: 'تحضير الإفطار', time: '17:30', type: 'family', isCompleted: false },
  { id: 's11', title: 'الإفطار', time: '18:30', type: 'meal', isCompleted: false },
  { id: 's12', title: 'صلاة المغرب', time: '18:35', type: 'worship', isCompleted: false },
  { id: 's13', title: 'صلاة العشاء والتراويح', time: '20:00', type: 'worship', isCompleted: false },
  { id: 's14', title: 'وقت العائلة', time: '21:30', type: 'family', isCompleted: false },
  { id: 's15', title: 'النوم', time: '23:00', type: 'rest', isCompleted: false },
];

const holidayTemplate: ScheduleItem[] = [
  { id: 'h1', title: 'السحور', time: '04:00', type: 'meal', isCompleted: false },
  { id: 'h2', title: 'صلاة الفجر + الأذكار', time: '04:45', type: 'worship', isCompleted: false },
  { id: 'h3', title: 'ورد القرآن', time: '05:15', type: 'worship', isCompleted: false },
  { id: 'h4', title: 'النوم', time: '06:30', type: 'rest', isCompleted: false },
  { id: 'h5', title: 'الاستيقاظ + أذكار الصباح', time: '09:00', type: 'worship', isCompleted: false },
  { id: 'h6', title: 'وقت حر / عائلة', time: '10:00', type: 'family', isCompleted: false },
  { id: 'h7', title: 'صلاة الظهر', time: '12:30', type: 'worship', isCompleted: false },
  { id: 'h8', title: 'القيلولة', time: '13:00', type: 'rest', isCompleted: false },
  { id: 'h9', title: 'صلاة العصر', time: '15:45', type: 'worship', isCompleted: false },
  { id: 'h10', title: 'ورد القرآن + أذكار المساء', time: '16:30', type: 'worship', isCompleted: false },
  { id: 'h11', title: 'تحضير الإفطار', time: '17:30', type: 'family', isCompleted: false },
  { id: 'h12', title: 'الإفطار', time: '18:30', type: 'meal', isCompleted: false },
  { id: 'h13', title: 'صلاة المغرب', time: '18:35', type: 'worship', isCompleted: false },
  { id: 'h14', title: 'صلاة العشاء والتراويح', time: '20:00', type: 'worship', isCompleted: false },
  { id: 'h15', title: 'وقت العائلة / صدقة', time: '21:30', type: 'family', isCompleted: false },
  { id: 'h16', title: 'التهجد / قيام الليل', time: '23:00', type: 'worship', isCompleted: false },
  { id: 'h17', title: 'النوم', time: '00:00', type: 'rest', isCompleted: false },
];

const typeConfig: Record<string, { icon: string; color: string }> = {
  worship: { icon: '🕌', color: 'bg-primary/10 text-primary' },
  work: { icon: '💼', color: 'bg-secondary/10 text-secondary-foreground' },
  rest: { icon: '😴', color: 'bg-accent text-accent-foreground' },
  family: { icon: '👨‍👩‍👧', color: 'bg-[hsl(var(--gold))]/10 text-foreground' },
  meal: { icon: '🍽️', color: 'bg-[hsl(var(--spiritual-green))]/10 text-foreground' },
};

export const DailySchedule: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const [mode, setMode] = useState<'work' | 'holiday'>(() => {
    const saved = localStorage.getItem(`${SCHEDULE_KEY}-mode-${today}`);
    return (saved as 'work' | 'holiday') || 'work';
  });

  const [items, setItems] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem(`${SCHEDULE_KEY}-${today}`);
    if (saved) return JSON.parse(saved);
    return workDayTemplate.map(i => ({ ...i }));
  });

  useEffect(() => {
    localStorage.setItem(`${SCHEDULE_KEY}-${today}`, JSON.stringify(items));
  }, [items, today]);

  useEffect(() => {
    localStorage.setItem(`${SCHEDULE_KEY}-mode-${today}`, mode);
  }, [mode, today]);

  const switchMode = (newMode: 'work' | 'holiday') => {
    setMode(newMode);
    const template = newMode === 'work' ? workDayTemplate : holidayTemplate;
    setItems(template.map(i => ({ ...i })));
  };

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const completedCount = items.filter(i => i.isCompleted).length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <div className="flex gap-2">
        <Button
          variant={mode === 'work' ? 'default' : 'outline'}
          onClick={() => switchMode('work')}
          className="flex-1 gap-2"
        >
          <Briefcase size={16} />
          يوم عمل
        </Button>
        <Button
          variant={mode === 'holiday' ? 'default' : 'outline'}
          onClick={() => switchMode('holiday')}
          className="flex-1 gap-2"
        >
          <Palmtree size={16} />
          إجازة
        </Button>
      </div>

      {/* Progress */}
      <div className="card-spiritual p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">تقدّم اليوم</span>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {completedCount} / {items.length} مهمة مكتملة
        </p>
      </div>

      {/* Schedule Items */}
      <div className="space-y-2">
        {items.map((item) => {
          const config = typeConfig[item.type];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`card-spiritual p-4 flex items-center gap-3 cursor-pointer transition-all ${
                item.isCompleted ? 'opacity-60' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                {item.isCompleted ? (
                  <Check size={18} className="text-primary" />
                ) : (
                  <span className="text-lg">{config.icon}</span>
                )}
              </div>
              
              <div className="flex-1">
                <p className={`font-arabic text-sm ${item.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {item.title}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                <span>{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
