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
    <div className={cn('relative bg-card rounded-2xl p-6 shadow-card', className)}>
      {/* Monument Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gradient-temple mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground">{currentStage.label}</p>
      </div>
      
      {/* Monument Visual */}
      <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-gradient-sky">
        <img 
          src={konarkTemple}
          alt={name}
          className={cn(
            'w-full h-full object-cover transition-all duration-1000',
            currentStage.opacity,
            progress === 100 && 'animate-monument-build'
          )}
        />
        
        {/* Progress Overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-monument opacity-60 transition-all duration-1000"
          style={{ height: `${progress}%` }}
        />
        
        {/* Celebration Effect */}
        {progress === 100 && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse" />
        )}
      </div>
      
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-bold text-primary">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-temple transition-all duration-500 ease-out path-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{currentGems} gems collected</span>
          <span>{totalGems} gems needed</span>
        </div>
      </div>
      
      {/* Achievement Badge */}
      {progress === 100 && (
        <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold shadow-gem animate-bounce">
          ✨ Complete!
        </div>
      )}
    </div>
  );
};