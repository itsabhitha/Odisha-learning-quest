import React from 'react';
import { cn } from '@/lib/utils';
import { EduGem } from './EduGem';
import { Button } from '@/components/ui/button';
import { Lock, Play, CheckCircle, Star } from 'lucide-react';

interface QuestCardProps {
  title: string;
  subject: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics';
  chapter: string;
  difficulty: 1 | 2 | 3;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress?: number;
  gemReward: number;
  estimatedTime: string;
  onClick?: () => void;
  className?: string;
}

const subjectConfig = {
  Physics: { gemType: 'ruby' as const, icon: '⚡', color: 'border-gem-ruby' },
  Chemistry: { gemType: 'sapphire' as const, icon: '🧪', color: 'border-gem-sapphire' },
  Biology: { gemType: 'emerald' as const, icon: '🌱', color: 'border-gem-emerald' },
  Mathematics: { gemType: 'topaz' as const, icon: '🔢', color: 'border-gem-topaz' }
};

export const QuestCard: React.FC<QuestCardProps> = ({
  title,
  subject,
  chapter,
  difficulty,
  isUnlocked,
  isCompleted,
  progress = 0,
  gemReward,
  estimatedTime,
  onClick,
  className
}) => {
  const config = subjectConfig[subject];
  const difficultyStars = Array.from({ length: 3 }, (_, i) => i < difficulty);
  
  return (
    <div 
      className={cn(
        'relative bg-card rounded-2xl p-6 border-2 transition-all duration-300',
        'hover:shadow-temple hover:scale-105 cursor-pointer quest-card',
        config.color,
        isCompleted && 'bg-gradient-to-br from-success/10 to-card',
        !isUnlocked && 'opacity-60 cursor-not-allowed',
        className
      )}
      onClick={isUnlocked ? onClick : undefined}
    >
      {/* Status Indicators */}
      <div className="absolute -top-2 -right-2">
        {isCompleted ? (
          <div className="bg-success text-success-foreground p-2 rounded-full shadow-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
        ) : !isUnlocked ? (
          <div className="bg-muted text-muted-foreground p-2 rounded-full">
            <Lock className="w-5 h-5" />
          </div>
        ) : null}
      </div>
      
      {/* Subject Icon and Title */}
      <div className="flex items-start gap-3 mb-4">
        <div className="text-3xl">{config.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-card-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{chapter}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-muted-foreground">Difficulty:</span>
            {difficultyStars.map((filled, index) => (
              <Star 
                key={index} 
                className={cn(
                  'w-3 h-3',
                  filled ? 'fill-accent text-accent' : 'text-muted'
                )} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Progress Bar (if in progress) */}
      {isUnlocked && !isCompleted && progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-full bg-gradient-temple rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Quest Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <EduGem type={config.gemType} size="sm" />
          <span className="text-sm font-medium">+{gemReward} gems</span>
        </div>
        <div className="text-xs text-muted-foreground">
          ⏱️ {estimatedTime}
        </div>
      </div>
      
      {/* Action Button */}
      <Button 
        variant={isCompleted ? "outline" : "default"}
        className="w-full"
        disabled={!isUnlocked}
      >
        {isCompleted ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Review Quest
          </>
        ) : isUnlocked ? (
          <>
            <Play className="w-4 h-4 mr-2" />
            {progress > 0 ? 'Continue Quest' : 'Start Quest'}
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Complete Previous Quest
          </>
        )}
      </Button>
      
      {/* Completion Glow */}
      {isCompleted && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-success/20 to-transparent opacity-50 pointer-events-none" />
      )}
    </div>
  );
};