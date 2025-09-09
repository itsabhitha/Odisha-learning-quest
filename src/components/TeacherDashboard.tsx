import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, BookOpen, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

// Sample class data
const classData = {
  totalStudents: 32,
  activeToday: 28,
  averageProgress: 73,
  strugglingStudents: 5
};

const studentProgress = [
  { name: "Aarav Kumar", progress: 85, status: "excellent", gems: 166, lastActive: "2 hours ago" },
  { name: "Priya Singh", progress: 92, status: "excellent", gems: 198, lastActive: "1 hour ago" },
  { name: "Rahul Patel", progress: 67, status: "good", gems: 134, lastActive: "4 hours ago" },
  { name: "Anita Sharma", progress: 45, status: "needs-help", gems: 89, lastActive: "1 day ago" },
  { name: "Vikash Mishra", progress: 78, status: "good", gems: 156, lastActive: "3 hours ago" },
  { name: "Riya Das", progress: 34, status: "needs-help", gems: 67, lastActive: "2 days ago" },
];

const conceptDifficulty = [
  { topic: "Electric Circuits", difficulty: 85, subject: "Physics", strugglingCount: 12 },
  { topic: "Organic Chemistry", difficulty: 78, subject: "Chemistry", strugglingCount: 15 },
  { topic: "Cell Division", difficulty: 65, subject: "Biology", strugglingCount: 8 },
  { topic: "Quadratic Equations", difficulty: 72, subject: "Mathematics", strugglingCount: 10 },
];

export const TeacherDashboard: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-success text-success-foreground';
      case 'good': return 'bg-primary text-primary-foreground';
      case 'needs-help': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient-temple">Teacher Dashboard</h1>
              <p className="text-muted-foreground">Monitor student progress and learning analytics</p>
            </div>
            <div className="flex gap-3">
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  ← Back to Student View
                </Button>
              )}
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Create Quest
              </Button>
              <Button>
                <TrendingUp className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{classData.totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{classData.activeToday}</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{classData.averageProgress}%</p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{classData.strugglingStudents}</p>
                <p className="text-sm text-muted-foreground">Need Help</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Student Progress */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gradient-temple">Student Progress</h3>
              <Badge variant="outline">{studentProgress.length} students</Badge>
            </div>

            <div className="space-y-4">
              {studentProgress.map((student, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-temple rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium truncate">{student.name}</p>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>Progress: {student.progress}%</span>
                        <Progress value={student.progress} className="w-16 h-2" />
                      </div>
                      <span>💎 {student.gems}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {student.lastActive}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Concept Difficulty Heatmap */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gradient-temple">Concept Difficulty</h3>
              <Badge variant="outline">Most Challenging Topics</Badge>
            </div>

            <div className="space-y-4">
              {conceptDifficulty.map((concept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{concept.topic}</p>
                      <p className="text-sm text-muted-foreground">{concept.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{concept.difficulty}% difficulty</p>
                      <p className="text-xs text-muted-foreground">
                        {concept.strugglingCount} students struggling
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-500",
                        concept.difficulty > 80 ? "bg-destructive" :
                        concept.difficulty > 60 ? "bg-accent" : "bg-success"
                      )}
                      style={{ width: `${concept.difficulty}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-primary font-medium mb-2">💡 Recommendation</p>
              <p className="text-sm text-muted-foreground">
                Consider creating additional practice quests for Electric Circuits and Organic Chemistry, 
                as these topics show the highest difficulty levels.
              </p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 shadow-card mt-8">
          <h3 className="text-xl font-bold text-gradient-temple mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Send Encouragement</p>
                <p className="text-sm text-muted-foreground">Motivate struggling students</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Create Assignment</p>
                <p className="text-sm text-muted-foreground">Design new learning quests</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Parent Reports</p>
                <p className="text-sm text-muted-foreground">Generate progress reports</p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};