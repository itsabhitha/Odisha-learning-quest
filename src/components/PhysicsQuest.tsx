import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { EduGem } from './EduGem';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Lightbulb, Zap, CheckCircle, RotateCcw } from 'lucide-react';

interface CircuitComponentProps {
  id: string;
  type: 'battery' | 'resistor' | 'led' | 'wire';
  position: { x: number; y: number };
  isPlaced: boolean;
  isCorrect?: boolean;
}

const CIRCUIT_COMPONENTS = [
  { id: 'battery1', type: 'battery' as const, symbol: '🔋', name: 'Battery' },
  { id: 'resistor1', type: 'resistor' as const, symbol: '⚡', name: 'Resistor' },
  { id: 'led1', type: 'led' as const, symbol: '💡', name: 'LED' },
  { id: 'wire1', type: 'wire' as const, symbol: '━', name: 'Wire' },
];

const CIRCUIT_SLOTS = [
  { id: 'slot1', position: { x: 100, y: 100 }, accepts: 'battery', label: 'Power Source' },
  { id: 'slot2', position: { x: 200, y: 100 }, accepts: 'wire', label: 'Connection' },
  { id: 'slot3', position: { x: 300, y: 100 }, accepts: 'resistor', label: 'Resistance' },
  { id: 'slot4', position: { x: 400, y: 100 }, accepts: 'led', label: 'Load' },
];

export const PhysicsQuest: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [placedComponents, setPlacedComponents] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [questProgress, setQuestProgress] = useState(0);
  const [collectedGems, setCollectedGems] = useState(0);
  const [circuitComplete, setCircuitComplete] = useState(false);

  useEffect(() => {
    const correctPlacements = Object.entries(placedComponents).filter(([slotId, componentId]) => {
      const slot = CIRCUIT_SLOTS.find(s => s.id === slotId);
      const component = CIRCUIT_COMPONENTS.find(c => c.id === componentId);
      return slot && component && slot.accepts === component.type;
    }).length;

    const progress = (correctPlacements / CIRCUIT_SLOTS.length) * 100;
    setQuestProgress(progress);

    if (progress === 100 && !circuitComplete) {
      setCircuitComplete(true);
      setCollectedGems(15);
      
      // Simulate gem collection animation
      setTimeout(() => {
        const gemElements = document.querySelectorAll('.gem-reward');
        gemElements.forEach((gem, index) => {
          setTimeout(() => {
            gem.classList.add('animate-gem-collect');
          }, index * 200);
        });
      }, 500);
    }
  }, [placedComponents, circuitComplete]);

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    setDraggedItem(componentId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    if (draggedItem) {
      setPlacedComponents(prev => ({
        ...prev,
        [slotId]: draggedItem
      }));
      setDraggedItem(null);
    }
  };

  const resetCircuit = () => {
    setPlacedComponents({});
    setQuestProgress(0);
    setCircuitComplete(false);
    setCollectedGems(0);
  };

  const isComponentPlaced = (componentId: string) => {
    return Object.values(placedComponents).includes(componentId);
  };

  const getSlotComponent = (slotId: string) => {
    const componentId = placedComponents[slotId];
    return componentId ? CIRCUIT_COMPONENTS.find(c => c.id === componentId) : null;
  };

  const isSlotCorrect = (slotId: string) => {
    const slot = CIRCUIT_SLOTS.find(s => s.id === slotId);
    const component = getSlotComponent(slotId);
    return slot && component && slot.accepts === component.type;
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Map
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gradient-temple">Electric Circuits</h1>
                <p className="text-sm text-muted-foreground">Physics Quest • Chapter 3</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <EduGem type="ruby" size="sm" />
                <span className="text-sm font-bold">{collectedGems}/15</span>
              </div>
              <Progress value={questProgress} className="w-32" />
              <span className="text-sm font-medium">{Math.round(questProgress)}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Quest Objective */}
        <Card className="p-6 mb-8 shadow-temple">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-temple rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gradient-temple mb-2">
                Build a Complete Circuit
              </h2>
              <p className="text-muted-foreground mb-4">
                Drag and drop the components to create a working electric circuit. 
                Connect the battery, resistor, and LED in the correct order to light up the bulb!
              </p>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>
                <Button variant="outline" size="sm" onClick={resetCircuit}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {showHint && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm">
                    💡 <strong>Hint:</strong> Electric current flows from the battery's positive terminal, 
                    through the circuit components, and back to the negative terminal. 
                    Place components in order: Power Source → Connection → Resistance → Load
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Circuit Building Area */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-card">
              <h3 className="text-lg font-bold text-gradient-temple mb-6 text-center">
                🔌 Circuit Builder
              </h3>
              
              {/* Circuit Diagram Area */}
              <div className="relative bg-muted/50 rounded-xl p-8 mb-6 min-h-[300px] konark-pattern">
                <svg className="absolute inset-0 w-full h-full">
                  {/* Circuit Path */}
                  <path
                    d="M 80 120 L 500 120"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    className="opacity-50"
                  />
                </svg>

                {/* Component Slots */}
                {CIRCUIT_SLOTS.map((slot) => {
                  const component = getSlotComponent(slot.id);
                  const isCorrect = isSlotCorrect(slot.id);
                  
                  return (
                    <div
                      key={slot.id}
                      className={cn(
                        'absolute w-16 h-16 border-2 border-dashed rounded-lg',
                        'flex items-center justify-center text-2xl transition-all duration-300',
                        component 
                          ? isCorrect 
                            ? 'border-success bg-success/10 shadow-gem' 
                            : 'border-destructive bg-destructive/10'
                          : 'border-muted-foreground hover:border-primary hover:bg-primary/5'
                      )}
                      style={{ 
                        left: slot.position.x, 
                        top: slot.position.y 
                      }}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, slot.id)}
                    >
                      {component ? (
                        <div className="flex flex-col items-center">
                          <span>{component.symbol}</span>
                          {isCorrect && <CheckCircle className="w-4 h-4 text-success mt-1" />}
                        </div>
                      ) : (
                        <div className="text-xs text-center text-muted-foreground">
                          {slot.label}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Success Animation */}
                {circuitComplete && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl animate-bounce">⚡</div>
                  </div>
                )}
              </div>

              {/* Success Message */}
              {circuitComplete && (
                <div className="text-center p-6 bg-gradient-temple text-white rounded-xl">
                  <div className="text-4xl mb-3">🎉</div>
                  <h4 className="text-xl font-bold mb-2">Circuit Complete!</h4>
                  <p className="mb-4">
                    Excellent work! The current flows perfectly through your circuit, 
                    lighting up the LED. You've earned 15 EduGems!
                  </p>
                  
                  {/* Floating Gems */}
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <EduGem
                        key={i}
                        type="ruby"
                        size="md"
                        animated
                        className="gem-reward"
                      />
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Component Palette */}
          <div>
            <Card className="p-6 shadow-card">
              <h4 className="text-lg font-bold text-gradient-temple mb-4">
                🔧 Components
              </h4>
              
              <div className="space-y-3">
                {CIRCUIT_COMPONENTS.map((component) => (
                  <div
                    key={component.id}
                    draggable={!isComponentPlaced(component.id)}
                    onDragStart={(e) => handleDragStart(e, component.id)}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border transition-all duration-300',
                      'cursor-grab active:cursor-grabbing',
                      isComponentPlaced(component.id)
                        ? 'opacity-50 cursor-not-allowed bg-muted'
                        : 'hover:shadow-card hover:scale-105 bg-card border-border'
                    )}
                  >
                    <div className="text-2xl">{component.symbol}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{component.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {isComponentPlaced(component.id) ? 'Placed' : 'Drag to circuit'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Learning Notes */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h5 className="font-bold text-sm mb-2">📚 Did you know?</h5>
                <p className="text-xs text-muted-foreground">
                  In a series circuit, current flows through each component one after another. 
                  If one component fails, the entire circuit stops working!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};