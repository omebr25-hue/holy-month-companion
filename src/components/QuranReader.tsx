import React, { useState, useEffect } from 'react';
import { useQuranWird } from '@/hooks/useQuranWird';
import { getSurahByPage, getJuzByPage, TOTAL_PAGES } from '@/data/quran';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronRight, ChevronLeft, BookOpen, Minus, Plus, Moon, Sun, Bookmark } from 'lucide-react';

const FONT_SIZE_KEY = 'quran-reader-font-size';
const DARK_MODE_KEY = 'quran-reader-dark-mode';
const BOOKMARK_KEY = 'quran-reader-bookmark';

// Sample Quran text for demonstration (Surah Al-Fatiha page 1)
const sampleQuranPages: Record<number, { bismillah?: boolean; verses: string[] }> = {
  1: {
    verses: [
      'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
      'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ﴿٢﴾',
      'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ﴿٣﴾',
      'مَـٰلِكِ يَوْمِ ٱلدِّينِ ﴿٤﴾',
      'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾',
      'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ ﴿٦﴾',
      'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ ﴿٧﴾',
    ],
  },
  2: {
    bismillah: true,
    verses: [
      'الٓمٓ ﴿١﴾',
      'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ ﴿٢﴾',
      'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ ﴿٣﴾',
      'وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ ﴿٤﴾',
      'أُو۟لَـٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ ﴿٥﴾',
    ],
  },
};

export const QuranReader: React.FC = () => {
  const { settings } = useQuranWird();
  
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem(BOOKMARK_KEY);
    return saved ? parseInt(saved) : settings.currentPage;
  });
  
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem(FONT_SIZE_KEY);
    return saved ? parseInt(saved) : 28;
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARK_KEY, currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem(FONT_SIZE_KEY, fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, isDarkMode.toString());
  }, [isDarkMode]);

  const surahName = getSurahByPage(currentPage);
  const juzNumber = getJuzByPage(currentPage);
  
  const goNext = () => setCurrentPage(p => Math.min(p + 1, TOTAL_PAGES));
  const goPrev = () => setCurrentPage(p => Math.max(p - 1, 1));

  const pageData = sampleQuranPages[currentPage];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[hsl(220,45%,8%)] text-[hsl(45,40%,90%)]' : 'bg-background text-foreground'}`}>
      {/* Top Bar */}
      <div className={`sticky top-0 z-20 backdrop-blur-md border-b px-4 py-3 ${isDarkMode ? 'bg-[hsl(220,45%,10%)]/95 border-[hsl(220,40%,20%)]' : 'bg-background/95 border-border'}`}>
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h2 className="font-arabic text-lg">سورة {surahName}</h2>
            <p className={`text-xs ${isDarkMode ? 'text-[hsl(45,30%,60%)]' : 'text-muted-foreground'}`}>
              الجزء {juzNumber} • الصفحة {currentPage}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`px-4 py-3 border-b flex items-center justify-between gap-3 ${isDarkMode ? 'border-[hsl(220,40%,20%)]' : 'border-border'}`}>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setFontSize(s => Math.max(s - 2, 18))} className="h-8 w-8">
            <Minus size={14} />
          </Button>
          <span className="text-xs min-w-[2rem] text-center">{fontSize}</span>
          <Button variant="ghost" size="icon" onClick={() => setFontSize(s => Math.min(s + 2, 48))} className="h-8 w-8">
            <Plus size={14} />
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="h-8 w-8">
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </Button>

        <div className="flex items-center gap-1 text-xs">
          <Bookmark size={14} className="text-primary" />
          <span>{currentPage}</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="px-6 py-8 min-h-[60vh] flex flex-col items-center justify-center">
        {pageData ? (
          <div className="text-center space-y-6 max-w-lg">
            {pageData.bismillah && (
              <p className="font-arabic text-xl mb-8" style={{ fontSize: fontSize - 4 }}>
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
            )}
            {pageData.verses.map((verse, i) => (
              <p key={i} className="font-arabic leading-[2.5]" style={{ fontSize }}>
                {verse}
              </p>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <BookOpen size={48} className={`mx-auto ${isDarkMode ? 'text-[hsl(40,70%,50%)]' : 'text-primary'}`} />
            <p className="font-arabic text-xl">صفحة {currentPage}</p>
            <p className={`text-sm ${isDarkMode ? 'text-[hsl(45,30%,60%)]' : 'text-muted-foreground'}`}>
              سورة {surahName} • الجزء {juzNumber}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-[hsl(45,20%,50%)]' : 'text-muted-foreground'}`}>
              النص العثماني الكامل سيتوفر قريبًا بإذن الله
            </p>
          </div>
        )}
      </div>

      {/* Page Navigation */}
      <div className={`sticky bottom-0 px-4 py-4 border-t backdrop-blur-md ${isDarkMode ? 'bg-[hsl(220,45%,10%)]/95 border-[hsl(220,40%,20%)]' : 'bg-background/95 border-border'}`}>
        {/* Page slider */}
        <div className="mb-3">
          <Slider 
            value={[currentPage]} 
            onValueChange={([v]) => setCurrentPage(v)} 
            min={1} 
            max={TOTAL_PAGES} 
            step={1}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="lg" onClick={goNext} className="gap-2">
            <ChevronRight size={20} />
            السابقة
          </Button>
          
          <span className={`text-sm font-medium ${isDarkMode ? 'text-[hsl(45,30%,60%)]' : 'text-muted-foreground'}`}>
            {currentPage} / {TOTAL_PAGES}
          </span>
          
          <Button variant="ghost" size="lg" onClick={goPrev} className="gap-2">
            التالية
            <ChevronLeft size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
