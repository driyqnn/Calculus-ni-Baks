import React, { useState } from 'react';
import { Settings, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CourseData } from '@/utils/storage';

interface ConfigurationPanelProps {
  course: CourseData;
  onCourseUpdate: (course: CourseData) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  course,
  onCourseUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(course.settings);

  const handleSaveSettings = () => {
    const updatedCourse = {
      ...course,
      settings: localSettings,
      // Update quiz arrays based on new quiz count
      midtermState: {
        ...course.midtermState,
        quizScores: Array(localSettings.quizCount).fill(null).map((_, i) => 
          course.midtermState.quizScores[i] || null
        ),
        quizMaxScores: Array(localSettings.quizCount).fill(100).map((_, i) => 
          course.midtermState.quizMaxScores[i] || 100
        ),
      },
      finalsState: {
        ...course.finalsState,
        quizScores: Array(localSettings.quizCount).fill(null).map((_, i) => 
          course.finalsState.quizScores[i] || null
        ),
        quizMaxScores: Array(localSettings.quizCount).fill(100).map((_, i) => 
          course.finalsState.quizMaxScores[i] || 100
        ),
      },
    };
    
    onCourseUpdate(updatedCourse);
    setIsOpen(false);
  };

  const handleQuizCountChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= 5) {
      setLocalSettings({
        ...localSettings,
        quizCount: newCount,
        quizWeights: Array(newCount).fill(0.35 / newCount) // Distribute 35% equally
      });
    }
  };

  const handleWeightChange = (field: keyof typeof localSettings, value: number) => {
    setLocalSettings({
      ...localSettings,
      [field]: value / 100 // Convert from percentage to decimal
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Course Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Quiz Configuration */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Quiz Configuration</Label>
            
            <div className="space-y-2">
              <Label className="text-sm">Number of Quizzes per Period</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuizCountChange(localSettings.quizCount - 1)}
                  disabled={localSettings.quizCount <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{localSettings.quizCount}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuizCountChange(localSettings.quizCount + 1)}
                  disabled={localSettings.quizCount >= 5}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Weight Configuration */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Grade Weights (%)</Label>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Quiz Weight (%)</Label>
                <Input
                  type="number"
                  value={(localSettings.quizWeights.reduce((a, b) => a + b, 0) * 100).toFixed(0)}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    const newQuizWeights = Array(localSettings.quizCount).fill(value / 100 / localSettings.quizCount);
                    setLocalSettings({
                      ...localSettings,
                      quizWeights: newQuizWeights
                    });
                  }}
                  max={60}
                  min={20}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm">Exam Weight (%)</Label>
                <Input
                  type="number"
                  value={(localSettings.examWeight * 100).toFixed(0)}
                  onChange={(e) => handleWeightChange('examWeight', Number(e.target.value))}
                  max={60}
                  min={20}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm">Attendance Weight (%)</Label>
                <Input
                  type="number"
                  value={(localSettings.attendanceWeight * 100).toFixed(0)}
                  onChange={(e) => handleWeightChange('attendanceWeight', Number(e.target.value))}
                  max={20}
                  min={5}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm">Problem Set Weight (%)</Label>
                <Input
                  type="number"
                  value={(localSettings.problemSetWeight * 100).toFixed(0)}
                  onChange={(e) => handleWeightChange('problemSetWeight', Number(e.target.value))}
                  max={20}
                  min={5}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Final Grade Configuration */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Final Grade Weights</Label>
            
            <div>
              <Label className="text-sm">Midterm Weight (%)</Label>
              <Input
                type="number"
                value={(localSettings.midtermWeight * 100).toFixed(0)}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setLocalSettings({
                    ...localSettings,
                    midtermWeight: value / 100,
                    finalsWeight: (100 - value) / 100
                  });
                }}
                max={50}
                min={20}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm">Finals Weight (%)</Label>
              <Input
                type="number"
                value={(localSettings.finalsWeight * 100).toFixed(0)}
                disabled
                className="mt-2 bg-muted"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Automatically calculated as 100% - Midterm Weight
              </p>
            </div>
          </div>

          {/* Target Grade */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Target Grade (%)</Label>
            <Input
              type="number"
              value={localSettings.targetGrade}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                targetGrade: Number(e.target.value)
              })}
              min={60}
              max={100}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings}>
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationPanel;