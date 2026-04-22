import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, BookOpen, Target, Scale, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const CalculationsPage: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20">
      <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl border-b border-white/5 p-4 safe-top">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-muted/30">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-black uppercase tracking-tighter">Math Guide</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8 animate-fade-in">
        <section className="py-4">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight leading-none">Logic Engine</h2>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mathematical Proof</span>
            </div>
          </div>

          <div className="space-y-10">
            {/* The 50-Point Adjustment */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <div className="w-1 h-4 bg-blue-500/50 rounded-full" />
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">The Base Adjustment</h3>
              </div>
              <Card className="border-none bg-muted/20 rounded-[32px]">
                <CardContent className="p-6 space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Most Philippine academic systems utilize the 50-point base adjustment for Quizzes and Major Exams.
                  </p>
                  <div className="bg-background/50 p-4 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
                    <BlockMath>{`\\text{Adj} = (\\text{Raw Ratio} \\times 50) + 50`}</BlockMath>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Period Aggregation */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <div className="w-1 h-4 bg-purple-500/50 rounded-full" />
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Period Total</h3>
              </div>
              <Card className="border-none bg-muted/20 rounded-[32px]">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-background/30 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] font-bold uppercase">Quizzes</span>
                      <span className="text-[10px] font-mono opacity-60">35%</span>
                    </div>
                    <div className="flex justify-between items-center bg-background/30 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] font-bold uppercase">Major Exam</span>
                      <span className="text-[10px] font-mono opacity-60">45%</span>
                    </div>
                    <div className="flex justify-between items-center bg-background/30 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] font-bold uppercase">Attendance</span>
                      <span className="text-[10px] font-mono opacity-60">10%</span>
                    </div>
                    <div className="flex justify-between items-center bg-background/30 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] font-bold uppercase">Problem Set</span>
                      <span className="text-[10px] font-mono opacity-60">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Final weighting */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <div className="w-1 h-4 bg-primary/50 rounded-full" />
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Final Grade Calculation</h3>
              </div>
              <Card className="border-none bg-primary/5 rounded-[32px] border border-primary/10">
                <CardContent className="p-8 space-y-4">
                  <div className="bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
                    <BlockMath>{`\\text{Result} = (M \\times 0.3) + (F \\times 0.7)`}</BlockMath>
                  </div>
                  <p className="text-[10px] text-center text-muted-foreground font-medium italic">
                    Finals period carries 70% of the total weight.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Target Formula */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <div className="w-1 h-4 bg-orange-500/50 rounded-full" />
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Reverse Engineering (Target)</h3>
              </div>
              <Card className="border-none bg-muted/20 rounded-[32px]">
                <CardContent className="p-6 space-y-4 text-center">
                  <p className="text-xs text-muted-foreground">To find the score needed in finals for a specific target:</p>
                  <div className="bg-background/50 p-4 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
                    <BlockMath>{`F_{req} = \\frac{\\text{Target} - (M \\times 0.3)}{0.7}`}</BlockMath>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Verified Scientific Calculation</p>
        </footer>
      </main>
    </div>
  );
};

export default CalculationsPage;
