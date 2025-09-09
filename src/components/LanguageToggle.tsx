import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const [isOdia, setIsOdia] = useState(false);
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsOdia(!isOdia)}
      className={cn(
        'flex items-center gap-2 transition-all duration-300',
        'hover:shadow-gem hover:scale-105',
        className
      )}
    >
      <Languages className="w-4 h-4" />
      <span className={cn('font-medium', isOdia && 'font-odia')}>
        {isOdia ? 'ଇଂରାଜୀ' : 'Odia'}
      </span>
      <span className="text-xs text-muted-foreground">
        {isOdia ? 'English' : 'ଓଡ଼ିଆ'}
      </span>
    </Button>
  );
};

export const useLanguage = () => {
  const [isOdia, setIsOdia] = useState(false);
  
  const t = (english: string, odia?: string) => {
    return isOdia && odia ? odia : english;
  };
  
  return { isOdia, setIsOdia, t };
};