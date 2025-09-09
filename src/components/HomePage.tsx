import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { EduGem, EduGemCounter } from './EduGem';
import { Monument } from './Monument';
import { QuestCard } from './QuestCard';
import { LanguageToggle } from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Trophy, Users, Zap } from 'lucide-react';
import odishaMap from '@/assets/odisha-map.jpg';

// Sample student data
const studentData = {
  name: "Aarav Kumar",
  level: 12,
  gems: { ruby: 45, emerald: 32, sapphire: 38, topaz: 51 },
  monuments: [
    {
      name: "Konark Sun Temple",
      progress: 65,
      totalGems: 150,
      currentGems: 98
    }
  ],
  currentStreak: 7
};

// Sample quest data for different subjects
const subjectQuests = {
  Physics: [
    {
      title: "Electric Circuits",
      chapter: "Current & Resistance",
      difficulty: 2 as const,
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      gemReward: 15,
      estimatedTime: "25 min"
    },
    {
      title: "Magnetic Fields", 
      chapter: "Electromagnetism",
      difficulty: 3 as const,
      isUnlocked: true,
      isCompleted: false,
      progress: 60,
      gemReward: 20,
      estimatedTime: "35 min"
    },
    {
      title: "Wave Optics",
      chapter: "Light & Waves", 
      difficulty: 3 as const,
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      gemReward: 25,
      estimatedTime: "40 min"
    }
  ],
  Chemistry: [
    {
      title: "Atomic Structure",
      chapter: "Atoms & Molecules",
      difficulty: 1 as const,
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      gemReward: 12,
      estimatedTime: "20 min"
    },
    {
      title: "Chemical Bonding",
      chapter: "Molecular Chemistry",
      difficulty: 2 as const,
      isUnlocked: true,
      isCompleted: false,
      progress: 30,
      gemReward: 18,
      estimatedTime: "30 min"
    }
  ],
  Biology: [
    {
      title: "Plant Structure",
      chapter: "Botany Basics",
      difficulty: 1 as const,
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      gemReward: 10,
      estimatedTime: "15 min"
    },
    {
      title: "Human Digestive System",
      chapter: "Human Biology",
      difficulty: 2 as const,
      isUnlocked: true,
      isCompleted: false,
      progress: 45,
      gemReward: 16,
      estimatedTime: "25 min"
    }
  ],
  Mathematics: [
    {
      title: "Quadratic Equations",
      chapter: "Algebra",
      difficulty: 2 as const,
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      gemReward: 14,
      estimatedTime: "20 min"
    },
    {
      title: "Trigonometry",
      chapter: "Geometry & Angles",
      difficulty: 3 as const,
      isUnlocked: true,
      isCompleted: false,
      progress: 80,
      gemReward: 22,
      estimatedTime: "35 min"
    }
  ]
};

export const HomePage: React.FC<{
  onStartPhysicsQuest?: () => void;
  onOpenTeacherDashboard?: () => void;
}> = ({ onStartPhysicsQuest, onOpenTeacherDashboard }) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  const subjects = [
    { name: 'Physics', icon: '⚡', region: 'Bhubaneswar', color: 'bg-gem-ruby' },
    { name: 'Chemistry', icon: '🧪', region: 'Cuttack', color: 'bg-gem-sapphire' },
    { name: 'Biology', icon: '🌱', region: 'Puri', color: 'bg-gem-emerald' },
    { name: 'Mathematics', icon: '🔢', region: 'Rourkela', color: 'bg-gem-topaz' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-temple rounded-xl flex items-center justify-center shadow-gem">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-temple">EduYatra</h1>
                <p className="text-sm text-muted-foreground font-odia">ଏଡୁଯାତ୍ରା</p>
              </div>
            </div>
            
            {/* Teacher Access */}
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onOpenTeacherDashboard?.()}
                className="text-xs"
              >
                👨‍🏫 Teacher View
              </Button>
              <Badge variant="outline" className="gap-2">
                <Trophy className="w-4 h-4 text-accent" />
                Level {studentData.level}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Zap className="w-4 h-4 text-primary" />
                {studentData.currentStreak} day streak
              </Badge>
              <EduGemCounter gems={studentData.gems} />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <section className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-temple mb-4">
            Welcome back, {studentData.name}! 👋
          </h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Continue your epic learning journey across Odisha. Complete quests, collect EduGems, 
            and rebuild magnificent monuments!
          </p>
          
          {/* Mobile Stats */}
          <div className="md:hidden flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="gap-2">
              <Trophy className="w-4 h-4" />
              Level {studentData.level}
            </Badge>
            <Badge className="gap-2">
              <Zap className="w-4 h-4" />
              {studentData.currentStreak} days
            </Badge>
            <EduGemCounter gems={studentData.gems} className="text-sm" />
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Odisha Adventure Map */}
            <Card className="p-8 shadow-temple">
              <h3 className="text-2xl font-bold text-gradient-temple mb-6 text-center">
                🗺️ Your Adventure Map
              </h3>
              
              <div className="relative">
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-card h-80 md:h-96 bg-cover bg-center"
                  style={{ backgroundImage: `url(${odishaMap})` }}
                >
                  {/* Map Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
                  
                  {/* Subject Regions */}
                  {subjects.map((subject, index) => (
                    <button
                      key={subject.name}
                      onClick={() => setSelectedSubject(subject.name)}
                      className={cn(
                        'absolute w-16 h-16 rounded-full border-4 border-white shadow-temple',
                        'flex items-center justify-center text-2xl transform transition-all duration-300',
                        'hover:scale-125 hover:shadow-gem active:scale-95',
                        subject.color,
                        selectedSubject === subject.name && 'scale-125 shadow-gem animate-pulse'
                      )}
                      style={{
                        top: `${20 + index * 15}%`,
                        left: `${25 + index * 20}%`
                      }}
                    >
                      {subject.icon}
                    </button>
                  ))}
                  
                  {/* Glowing Paths */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                      d="M 100 100 Q 200 50 300 120"
                      stroke="url(#pathGradient)"
                      strokeWidth="3"
                      fill="none"
                      className="path-glow"
                    />
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Region Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {subjects.map((subject) => (
                    <div 
                      key={subject.name}
                      className={cn(
                        'text-center p-4 rounded-lg transition-all duration-300 cursor-pointer',
                        'hover:shadow-card hover:scale-105',
                        selectedSubject === subject.name 
                          ? 'bg-primary/10 border-2 border-primary' 
                          : 'bg-card border border-border'
                      )}
                      onClick={() => setSelectedSubject(subject.name)}
                    >
                      <div className="text-2xl mb-2">{subject.icon}</div>
                      <h4 className="font-bold text-sm">{subject.name}</h4>
                      <p className="text-xs text-muted-foreground">{subject.region}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Subject Quests */}
            {selectedSubject && (
              <Card className="p-8 shadow-temple animate-quest-unlock">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-temple rounded-xl flex items-center justify-center">
                    {subjects.find(s => s.name === selectedSubject)?.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient-temple">
                      {selectedSubject} Quests
                    </h3>
                    <p className="text-muted-foreground">
                      Complete quests to earn gems and unlock new adventures!
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subjectQuests[selectedSubject as keyof typeof subjectQuests]?.map((quest, index) => (
                    <QuestCard
                      key={index}
                      title={quest.title}
                      subject={selectedSubject as any}
                      chapter={quest.chapter}
                      difficulty={quest.difficulty}
                      isUnlocked={quest.isUnlocked}
                      isCompleted={quest.isCompleted}
                      progress={quest.progress}
                      gemReward={quest.gemReward}
                      estimatedTime={quest.estimatedTime}
                      onClick={() => {
                        // Navigate to specific quest based on title
                        if (quest.title === "Electric Circuits" && onStartPhysicsQuest) {
                          onStartPhysicsQuest();
                        } else {
                          console.log(`Starting quest: ${quest.title}`);
                        }
                      }}
                    />
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Monument Progress */}
            <div>
              <h3 className="text-xl font-bold text-gradient-temple mb-4 flex items-center gap-2">
                🏛️ Monument Progress
              </h3>
              {studentData.monuments.map((monument, index) => (
                <Monument
                  key={index}
                  name={monument.name}
                  progress={monument.progress}
                  totalGems={monument.totalGems}
                  currentGems={monument.currentGems}
                />
              ))}
            </div>

            {/* Quick Stats */}
            <Card className="p-6 shadow-card">
              <h4 className="text-lg font-bold text-gradient-temple mb-4">
                📊 Your Stats
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Quests Completed</span>
                  <Badge className="bg-success">23</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Streak</span>
                  <Badge>{studentData.currentStreak} days 🔥</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rank in Class</span>
                  <Badge className="bg-accent text-accent-foreground">#3</Badge>
                </div>
              </div>
            </Card>

            {/* Continue Learning */}
            <Card className="p-6 shadow-card bg-gradient-temple text-white">
              <h4 className="text-lg font-bold mb-2">🎯 Continue Learning</h4>
              <p className="text-sm opacity-90 mb-4">
                You're making great progress! Keep up the momentum.
              </p>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => onStartPhysicsQuest?.()}
              >
                Continue Physics Quest
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};