import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Minus, Plus } from 'lucide-react';

const TASBIH_KEY = 'ramadan-tasbih';

interface TasbihState {
  count: number;
  target: number;
  selectedDhikr: string;
  totalAllTime: number;
}

const defaultDhikr = [
  'سُبْحَانَ اللهِ',
  'الْحَمْدُ لِلَّهِ',
  'اللهُ أَكْبَرُ',
  'لا إله إلا الله',
  'أَسْتَغْفِرُ اللهَ',
  'لا حول ولا قوة إلا بالله',
  'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
  'اللَّهُمَّ صَلِّ عَلَى مُحَمَّد',
];

const targetOptions = [33, 100, 500, 1000];

export const DigitalTasbih: React.FC = () => {
  const [state, setState] = useState<TasbihState>(() => {
    const saved = localStorage.getItem(TASBIH_KEY);
    return saved ? JSON.parse(saved) : {
      count: 0,
      target: 33,
      selectedDhikr: defaultDhikr[0],
      totalAllTime: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem(TASBIH_KEY, JSON.stringify(state));
  }, [state]);

  const increment = useCallback(() => {
    setState(prev => ({
      ...prev,
      count: prev.count + 1,
      totalAllTime: prev.totalAllTime + 1,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({ ...prev, count: 0 }));
  }, []);

  const setTarget = useCallback((target: number) => {
    setState(prev => ({ ...prev, target, count: 0 }));
  }, []);

  const selectDhikr = useCallback((dhikr: string) => {
    setState(prev => ({ ...prev, selectedDhikr: dhikr, count: 0 }));
  }, []);

  const progress = state.target > 0 ? Math.min((state.count / state.target) * 100, 100) : 0;
  const isComplete = state.count >= state.target;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Main Counter */}
      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative cursor-pointer select-none" onClick={increment}>
          <svg width="220" height="220" className="transform -rotate-90">
            <circle
              cx="110" cy="110" r="90"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            <circle
              cx="110" cy="110" r="90"
              fill="none"
              stroke={isComplete ? 'hsl(var(--spiritual-green))' : 'hsl(var(--primary))'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-foreground">{state.count}</span>
            <span className="text-sm text-muted-foreground mt-1">/ {state.target}</span>
            {isComplete && <span className="text-xs text-spiritual-green mt-1">✓ تم</span>}
          </div>
        </div>

        <p className="font-arabic text-xl mt-4 text-foreground text-center">
          {state.selectedDhikr}
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          اضغط على الدائرة للعدّ
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        <Button variant="outline" size="icon" onClick={reset} className="rounded-full h-12 w-12">
          <RotateCcw size={18} />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setState(prev => ({ ...prev, count: Math.max(0, prev.count - 1) }))} className="rounded-full h-12 w-12">
          <Minus size={18} />
        </Button>
      </div>

      {/* Target Selection */}
      <div className="card-spiritual p-4">
        <h4 className="font-arabic text-sm text-muted-foreground mb-3">العدد المستهدف</h4>
        <div className="flex gap-2 flex-wrap">
          {targetOptions.map(t => (
            <Button
              key={t}
              variant={state.target === t ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTarget(t)}
              className="rounded-full"
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      {/* Dhikr Selection */}
      <div className="card-spiritual p-4">
        <h4 className="font-arabic text-sm text-muted-foreground mb-3">اختر الذكر</h4>
        <div className="grid grid-cols-2 gap-2">
          {defaultDhikr.map(dhikr => (
            <Button
              key={dhikr}
              variant={state.selectedDhikr === dhikr ? 'default' : 'outline'}
              size="sm"
              onClick={() => selectDhikr(dhikr)}
              className="font-arabic text-xs h-auto py-2 px-3"
            >
              {dhikr}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="card-spiritual p-4 text-center">
        <p className="text-xs text-muted-foreground">إجمالي التسبيحات</p>
        <p className="text-2xl font-bold text-primary mt-1">{state.totalAllTime.toLocaleString('ar-EG')}</p>
      </div>
    </div>
  );
};
