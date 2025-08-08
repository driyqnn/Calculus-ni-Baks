import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface FontSizeSliderProps {
  fontSize: number; // Font size in rem (0.5 to 1.8)
  onChange: (fontSize: number) => void;
}

const FontSizeSlider: React.FC<FontSizeSliderProps> = ({ fontSize, onChange }) => {
  const handleSliderChange = (values: number[]) => {
    const newSize = values[0] / 100; // Convert from 50-180 range to 0.5-1.8 rem
    onChange(newSize);
    
    // Apply font size immediately to root element
    const root = document.documentElement;
    root.style.setProperty('--dynamic-font-size', `${newSize}rem`);
  };

  // Convert fontSize from rem to slider value (50-180)
  const sliderValue = Math.round(fontSize * 100);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Font Size</Label>
      <div className="space-y-2">
        <Slider
          value={[sliderValue]}
          onValueChange={handleSliderChange}
          min={50}
          max={180}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Small</span>
          <span className="font-mono">{fontSize.toFixed(1)}rem</span>
          <span>Large</span>
        </div>
      </div>
    </div>
  );
};

export default FontSizeSlider;