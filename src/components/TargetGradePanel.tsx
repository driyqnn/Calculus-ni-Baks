import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TargetGradePanelProps {
  currentMidterm: number;
  currentFinals: number;
  targetGrade: number;
  onTargetGradeChange: (grade: number) => void;
}

const TargetGradePanel: React.FC<TargetGradePanelProps> = ({
  targetGrade,
  onTargetGradeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localTarget, setLocalTarget] = useState(targetGrade);

  const handleSave = () => {
    onTargetGradeChange(localTarget);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Target className="w-4 h-4" />
          Target: {targetGrade}%
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Set Target Grade
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-base font-medium">Target Grade (%)</Label>
            <Input
              type="number"
              value={localTarget}
              onChange={(e) => setLocalTarget(Number(e.target.value))}
              min={60}
              max={100}
              className="w-32"
            />
            <p className="text-sm text-muted-foreground">
              Set your desired final grade (60-100%)
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Target Grade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TargetGradePanel;