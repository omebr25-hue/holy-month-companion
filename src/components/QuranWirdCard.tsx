import React from 'react';
import { useQuranWird } from '@/hooks/useQuranWird';
import { QuranIcon } from '@/components/icons/RamadanIcons';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, BookOpen } from 'lucide-react';

interface QuranWirdCardProps {
  onOpenReader?: () => void;
}

export const QuranWirdCard: React.FC<QuranWirdCardProps> = ({ onOpenReader }) => {
  const { todayWird, completeTodayWird, getProgress, getTodaySurah, settings } = useQuranWird();

  const progressPercentage = todayWird.totalPages > 0 
    ? Math.round((todayWird.readPages / todayWird.totalPages) * 100)
    : 0;

  return (
    <div className="card-spiritual p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center glow-gold">
            <QuranIcon className="text-primary-foreground" size={24} />
          </div>
          <div>
            <h3 className="font-arabic text-xl text-foreground">ورد اليوم</h3>
            <p className="text-sm text-muted-foreground">
              سورة {getTodaySurah()}
            </p>
          </div>
        </div>
        
        {todayWird.isCompleted && (
          <div className="flex items-center gap-1 text-spiritual-green bg-spiritual-green/10 px-3 py-1 rounded-full">
            <Check size={16} />
            <span className="text-sm font-medium">تم</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Page range */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">من صفحة</span>
          <span className="font-bold text-foreground">{todayWird.startPage}</span>
          <span className="text-muted-foreground">إلى صفحة</span>
          <span className="font-bold text-foreground">{todayWird.endPage}</span>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">التقدم</span>
            <span className="font-medium text-primary">
              {todayWird.readPages} / {todayWird.totalPages} صفحة
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Overall progress */}
        <div className="bg-muted/50 rounded-xl p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">إجمالي الختمة</span>
            <span className="font-bold text-primary">{getProgress()}%</span>
          </div>
          <Progress value={getProgress()} className="h-2 mt-2" />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onOpenReader}
          >
            <BookOpen size={18} className="ml-2" />
            قراءة
          </Button>
          
          {!todayWird.isCompleted && (
            <Button
              className="flex-1 btn-gold"
              onClick={completeTodayWird}
            >
              <Check size={18} className="ml-2" />
              تمت القراءة
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
