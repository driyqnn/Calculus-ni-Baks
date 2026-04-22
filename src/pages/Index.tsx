import React, { useEffect } from "react";
import ModernGradeCalculator from "@/components/ModernGradeCalculator";

const Index: React.FC = () => {
  // Ensure dark mode is active by default for the "Gamer/Modern" aesthetic
  useEffect(() => {
    document.documentElement.classList.add('dark');
    // Force dark background on body to prevent white flashes
    document.body.classList.add('bg-background');
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <main className="w-full">
        <ModernGradeCalculator />
      </main>
      
      {/* Visual background decorations for a "Modern" feel */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default Index;
