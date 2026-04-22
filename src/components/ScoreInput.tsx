import React, { useRef } from "react";
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
  placeholder = "0",
  maxPlaceholder = "100",
  showMaxScore = true,
  minValue = 0,
  maxValue,
  step = "1",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value === "" ? null : Math.floor(parseFloat(e.target.value));
    if (value !== null && maxValue !== undefined && value > maxValue) value = maxValue;
    if (value !== null && value < minValue) value = minValue;
    onScoreChange(value);
  };

  const handleMaxScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onMaxScoreChange) {
      let value = e.target.value === "" ? null : Math.floor(parseFloat(e.target.value));
      if (value !== null && value < minValue) value = minValue;
      onMaxScoreChange(value);
    }
  };

  return (
    <div 
      className="group space-y-2 bg-muted/20 p-4 rounded-2xl border border-transparent focus-within:border-primary/30 transition-all duration-200 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex justify-between items-center mb-1">
        <Label className="text-sm font-semibold text-foreground/80">
          {label}
        </Label>
        {error && (
          <div className="flex items-center gap-1 text-destructive text-[10px] font-bold uppercase tracking-tighter">
            <AlertCircle size={10} />
            <span>{error}</span>
          </div>
        )}
      </div>
      
      <div className={`flex gap-3 ${showMaxScore ? 'grid grid-cols-2' : ''}`}>
        <div className="relative">
          <Input
            ref={inputRef}
            type="number"
            placeholder={placeholder}
            value={score ?? ""}
            onChange={handleScoreChange}
            className={`h-12 bg-background border-none rounded-xl text-center font-mono text-lg font-bold shadow-inner transition-all ${
              error ? "ring-2 ring-destructive/50" : "focus-visible:ring-2 focus-visible:ring-primary/50"
            }`}
            min={minValue}
            max={maxValue}
            step={step}
          />
          <span className="absolute -top-2 left-3 bg-background px-1 text-[8px] font-black uppercase text-muted-foreground/50 rounded pointer-events-none">
            Value
          </span>
        </div>
        
        {showMaxScore && (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Input
              type="number"
              placeholder={maxPlaceholder}
              value={maxScore ?? ""}
              onChange={handleMaxScoreChange}
              className={`h-12 bg-background border-none rounded-xl text-center font-mono text-lg font-bold shadow-inner transition-all ${
                error ? "ring-2 ring-destructive/50" : "focus-visible:ring-2 focus-visible:ring-primary/50"
              }`}
              min={minValue}
              step={step}
            />
            <span className="absolute -top-2 left-3 bg-background px-1 text-[8px] font-black uppercase text-muted-foreground/50 rounded pointer-events-none">
              Total
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreInput;
