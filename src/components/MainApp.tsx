import React, { useState } from 'react';
import { HomePage } from './HomePage';
import { PhysicsQuest } from './PhysicsQuest';
import { TeacherDashboard } from './TeacherDashboard';

type ViewType = 'home' | 'physics-quest' | 'teacher-dashboard';

export const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage 
            onStartPhysicsQuest={() => setCurrentView('physics-quest')}
            onOpenTeacherDashboard={() => setCurrentView('teacher-dashboard')}
          />
        );
      case 'physics-quest':
        return <PhysicsQuest onBack={() => setCurrentView('home')} />;
      case 'teacher-dashboard':
        return <TeacherDashboard onBack={() => setCurrentView('home')} />;
      default:
        return (
          <HomePage 
            onStartPhysicsQuest={() => setCurrentView('physics-quest')} 
            onOpenTeacherDashboard={() => setCurrentView('teacher-dashboard')}
          />
        );
    }
  };

  return renderView();
};