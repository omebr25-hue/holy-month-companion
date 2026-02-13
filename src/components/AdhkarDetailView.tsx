import React, { useState } from 'react';
import { useAdhkar } from '@/hooks/useAdhkar';
import { DhikrCategory } from '@/types/ramadan';
import { getCategoryName } from '@/data/adhkar';
import { DhikrItem } from '@/components/AdhkarCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, RotateCcw, Check } from 'lucide-react';

interface AdhkarDetailViewProps {
  category: DhikrCategory;
  onBack: () => void;
}

export const AdhkarDetailView: React.FC<AdhkarDetailViewProps> = ({
  category,
  onBack,
}) => {
  const {
    getAdhkarByCategory,
    getDhikrProgress,
    incrementDhikr,
    completeDhikr,
    getCategoryProgress,
    resetCategoryProgress,
  } = useAdhkar();

  const adhkar = getAdhkarByCategory(category);
  const progress = getCategoryProgress(category);
  const isAllCompleted = progress === 100;

  const getCategoryIcon = () => {
    switch (category) {
      case 'morning': return '🌅';
      case 'evening': return '🌙';
      case 'after_prayer': return '🕌';
      case 'sleep': return '😴';
      case 'waking': return '⏰';
      case 'home_entry': return '🏠';
      case 'home_exit': return '🚪';
      case 'food': return '🍽️';
      case 'anxiety': return '🤲';
      case 'travel': return '✈️';
      default: return '📿';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowRight size={20} />
            رجوع
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => resetCategoryProgress(category)}
            className="gap-2 text-muted-foreground"
          >
            <RotateCcw size={16} />
            إعادة
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl">{getCategoryIcon()}</span>
          <div className="flex-1">
            <h1 className="font-arabic text-xl text-foreground">
              {getCategoryName(category)}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-sm font-medium text-primary">{progress}%</span>
            </div>
          </div>
          {isAllCompleted && (
            <div className="w-10 h-10 rounded-full bg-spiritual-green flex items-center justify-center">
              <Check size={20} className="text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Adhkar List */}
      <div className="p-4 space-y-4 pb-8">
        {adhkar.map((dhikr) => {
          const dhikrProgress = getDhikrProgress(dhikr.id);
          return (
            <DhikrItem
              key={dhikr.id}
              dhikr={dhikr}
              currentCount={dhikrProgress?.currentCount || 0}
              isCompleted={dhikrProgress?.isCompleted || false}
              onIncrement={() => incrementDhikr(dhikr)}
              onComplete={() => completeDhikr(dhikr)}
            />
          );
        })}

        {isAllCompleted && (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🤲</div>
            <h3 className="font-arabic text-xl text-foreground mb-2">
              تقبّل الله منك
            </h3>
            <p className="text-muted-foreground">
              أتممت جميع الأذكار. بارك الله فيك
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
