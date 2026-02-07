import React from 'react';
import { useAdhkar } from '@/hooks/useAdhkar';
import { DhikrCategory, Dhikr } from '@/types/ramadan';
import { getCategoryName } from '@/data/adhkar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, RotateCcw, ChevronLeft } from 'lucide-react';

interface AdhkarCardProps {
  category: DhikrCategory;
  onViewDetails?: () => void;
}

export const AdhkarCard: React.FC<AdhkarCardProps> = ({ category, onViewDetails }) => {
  const { getCategoryProgress, getAdhkarByCategory } = useAdhkar();
  
  const progress = getCategoryProgress(category);
  const adhkar = getAdhkarByCategory(category);
  const completedCount = Math.round((progress / 100) * adhkar.length);

  const getCategoryIcon = () => {
    switch (category) {
      case 'morning':
        return '🌅';
      case 'evening':
        return '🌙';
      case 'after_prayer':
        return '🕌';
      case 'sleep':
        return '😴';
      default:
        return '📿';
    }
  };

  const isCompleted = progress === 100;

  return (
    <div 
      className={`card-spiritual p-5 transition-all duration-300 cursor-pointer hover:shadow-lg ${
        isCompleted ? 'ring-2 ring-spiritual-green/30' : ''
      }`}
      onClick={onViewDetails}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getCategoryIcon()}</span>
          <div>
            <h3 className="font-arabic text-lg text-foreground">
              {getCategoryName(category)}
            </h3>
            <p className="text-xs text-muted-foreground">
              {completedCount} / {adhkar.length} ذكر
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="w-8 h-8 rounded-full bg-spiritual-green flex items-center justify-center">
              <Check size={16} className="text-white" />
            </div>
          ) : (
            <span className="text-sm font-bold text-primary">{progress}%</span>
          )}
          <ChevronLeft size={20} className="text-muted-foreground" />
        </div>
      </div>

      <Progress 
        value={progress} 
        className={`h-2 ${isCompleted ? 'bg-spiritual-green/20' : ''}`}
      />
    </div>
  );
};

interface DhikrItemProps {
  dhikr: Dhikr;
  currentCount: number;
  isCompleted: boolean;
  onIncrement: () => void;
  onComplete: () => void;
}

export const DhikrItem: React.FC<DhikrItemProps> = ({
  dhikr,
  currentCount,
  isCompleted,
  onIncrement,
  onComplete,
}) => {
  return (
    <div 
      className={`card-spiritual p-5 transition-all ${
        isCompleted ? 'bg-spiritual-green/5 border-spiritual-green/20' : ''
      }`}
    >
      <div className="mb-4">
        <p className="font-arabic text-lg leading-loose text-foreground text-center">
          {dhikr.text}
        </p>
        {dhikr.translation && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            {dhikr.translation}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded">{dhikr.source}</span>
          {dhikr.hadithGrade && (
            <span className="bg-spiritual-green/10 text-spiritual-green px-2 py-1 rounded">
              {dhikr.hadithGrade}
            </span>
          )}
        </div>
        <span className="text-sm font-medium">
          {currentCount} / {dhikr.count}
        </span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 text-lg font-arabic"
          onClick={onIncrement}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <>
              <Check size={20} className="ml-2 text-spiritual-green" />
              تم
            </>
          ) : (
            `+1`
          )}
        </Button>
        {!isCompleted && currentCount < dhikr.count && (
          <Button
            variant="ghost"
            size="lg"
            onClick={onComplete}
            className="text-primary"
          >
            إتمام الكل
          </Button>
        )}
      </div>
    </div>
  );
};
