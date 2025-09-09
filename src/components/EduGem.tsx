import React from 'react';
import { cn } from '@/lib/utils';

interface EduGemProps {
  type: 'ruby' | 'emerald' | 'sapphire' | 'topaz';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  count?: number;
  className?: string;
}

const gemConfig = {
  ruby: {
    color: 'bg-gem-ruby',
    shadow: 'shadow-[0_0_20px_hsl(var(--gem-ruby)/0.4)]',
    label: 'Physics'
  },
  emerald: {
    color: 'bg-gem-emerald', 
    shadow: 'shadow-[0_0_20px_hsl(var(--gem-emerald)/0.4)]',
    label: 'Biology'
  },
  sapphire: {
    color: 'bg-gem-sapphire',
    shadow: 'shadow-[0_0_20px_hsl(var(--gem-sapphire)/0.4)]',
    label: 'Chemistry'
  },
  topaz: {
    color: 'bg-gem-topaz',
    shadow: 'shadow-[0_0_20px_hsl(var(--gem-topaz)/0.4)]',
    label: 'Mathematics'
  }
};

const sizeConfig = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
};

export const EduGem: React.FC<EduGemProps> = ({
  type,
  size = 'md',
  animated = false,
  count,
  className
}) => {
  const config = gemConfig[type];
  
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <div 
        className={cn(
          'rounded-full border-2 border-white/50 backdrop-blur-sm',
          'transform transition-all duration-300',
          config.color,
          config.shadow,
          sizeConfig[size],
          animated && 'animate-gem-float',
          'hover:scale-110 hover:brightness-110'
        )}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />
      </div>
      
      {count !== undefined && (
        <span className="ml-2 text-sm font-bold text-foreground">
          {count}
        </span>
      )}
    </div>
  );
};

export const EduGemCounter: React.FC<{
  gems: { ruby: number; emerald: number; sapphire: number; topaz: number };
  className?: string;
}> = ({ gems, className }) => {
  const total = Object.values(gems).reduce((sum, count) => sum + count, 0);
  
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex gap-3">
        {Object.entries(gems).map(([type, count]) => (
          <EduGem 
            key={type}
            type={type as keyof typeof gemConfig}
            count={count}
            size="sm"
          />
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        Total: <span className="font-bold text-gradient-gem">{total}</span>
      </div>
    </div>
  );
};