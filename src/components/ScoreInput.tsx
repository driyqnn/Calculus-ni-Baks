import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface ScoreInputProps {
  label: string;
  score: number | null;
  maxScore?: number | null;
  onScoreChange: (value: number | null) => void;
  onMaxScoreChange?: (value: number | null) => void;
  error?: string | null;
  placeholder?: string;
  maxPlaceholder?: string;
  showMaxScore?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: string;
}

const ScoreInput: React.FC<ScoreInputProps> = ({
  label,
  score,
  maxScore,
  onScoreChange,
  onMaxScoreChange,
  error,
  placeholder = "Score",
  maxPlaceholder = "Max",
  showMaxScore = true,
  minValue = 0,
  maxValue,
  step = "0.1",
}) => {
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : parseFloat(e.target.value);
    onScoreChange(value);
  };

  const handleMaxScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onMaxScoreChange) {
      const value = e.target.value === "" ? null : parseFloat(e.target.value);
      onMaxScoreChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      <div className={`flex gap-2 ${showMaxScore ? 'grid grid-cols-2' : ''}`}>
        <Input
          type="number"
          placeholder={placeholder}
          value={score ?? ""}
          onChange={handleScoreChange}
          className={`${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
          min={minValue}
          max={maxValue}
          step={step}
        />
        {showMaxScore && (
          <Input
            type="number"
            placeholder={maxPlaceholder}
            value={maxScore ?? ""}
            onChange={handleMaxScoreChange}
            className={`${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
            min={minValue}
            step={step}
          />
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1 text-destructive text-xs">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ScoreInput;