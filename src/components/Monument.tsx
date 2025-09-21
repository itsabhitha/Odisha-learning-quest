import React from 'react';
import { cn } from '@/lib/utils';
import konarkTemple from '@/assets/konark-temple.jpg';

interface MonumentProps {
  name: string;
  progress: number; // 0-100
  totalGems: number;
  currentGems: number;
  className?: string;
}

export const Monument: React.FC<MonumentProps> = ({
  name,
  progress,
  totalGems,
  currentGems,
  className
}) => {
  const progressStages = [
    { threshold: 0, label: 'Foundation', opacity: 'opacity-20' },
    { threshold: 25, label: 'Base Structure', opacity: 'opacity-40' },
    { threshold: 50, label: 'Walls Rising', opacity: 'opacity-60' },
    { threshold: 75, label: 'Nearly Complete', opacity: 'opacity-80' },
    { threshold: 100, label: 'Magnificent!', opacity: 'opacity-100' }
  ];
  
  const currentStage = progressStages
    .slice()
    .reverse()
    .find(stage => progress >= stage.threshold) || progressStages[0];
  
  return (
    <div className={cn('relative bg-card rounded-2xl p-4 shadow-card', className)}>
      {/* Badge Container */}
      <div className="flex flex-col items-center space-y-3">
        
        {/* Badge Circle */}
        <div className="relative">
          <div className={cn(
            'w-20 h-20 rounded-full border-4 transition-all duration-1000 overflow-hidden',
            progress === 100 
              ? 'border-accent bg-gradient-to-br from-primary to-accent shadow-gem animate-pulse' 
              : 'border-muted bg-muted/20'
          )}>
            <img 
              src={konarkTemple}
              alt={name}
              className={cn(
                'w-full h-full object-cover transition-all duration-1000',
                progress === 100 ? 'opacity-100 scale-110' : currentStage.opacity
              )}
            />
          </div>
          
          {/* Badge Completion Star */}
          {progress === 100 && (
            <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold animate-bounce">
              ⭐
            </div>
          )}
        </div>

        {/* Badge Info */}
        <div className="text-center space-y-1">
          <h3 className={cn(
            'text-sm font-bold transition-colors',
            progress === 100 ? 'text-accent' : 'text-muted-foreground'
          )}>
            {name} Badge
          </h3>
          <p className="text-xs text-muted-foreground">
            {progress === 100 ? '🏆 Earned!' : `${Math.round(progress)}% Complete`}
          </p>
        </div>

        {/* Mini Progress Ring */}
        {progress < 100 && (
          <div className="text-xs text-muted-foreground">
            {currentGems}/{totalGems} gems
          </div>
        )}
      </div>
    </div>
  );
};