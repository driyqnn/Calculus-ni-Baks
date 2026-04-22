import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Calculator, Award } from "lucide-react";

const FormulasPanel: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="px-2">
        <h2 className="text-2xl font-black tracking-tight">Calculation Logic</h2>
        <p className="text-sm text-muted-foreground mt-1">Understanding how your grades are weighted</p>
      </div>

      {/* Basic Structure Card */}
      <Card className="border-none bg-muted/30 rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Period Weights</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border/50">
              <span className="text-sm font-medium">Midterm Contribution</span>
              <Badge variant="outline" className="font-bold">30%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border/50">
              <span className="text-sm font-medium">Finals Contribution</span>
              <Badge variant="outline" className="font-bold">70%</Badge>
            </div>
          </div>
          <div className="bg-primary/10 p-4 rounded-2xl">
            <BlockMath>{`\\text{Total} = (M \\times 0.3) + (F \\times 0.7)`}</BlockMath>
          </div>
        </CardContent>
      </Card>

      {/* Adjustment Formula */}
      <Card className="border-none bg-primary/5 rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">The 50-Point Adjustment</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Calculus ni Baks uses the standard adjustment where a 0% raw score results in 50%, 
            and 100% results in 100%. This is applied to both Quizzes and Exams.
          </p>
          <div className="bg-background p-4 rounded-2xl border border-border/50">
            <BlockMath>{`\\text{Adj} = (\\text{Raw} \\times 0.5) + 50`}</BlockMath>
          </div>
        </CardContent>
      </Card>

      {/* Component Weights */}
      <Card className="border-none bg-muted/30 rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Component Weights</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "Quizzes", weight: "35%", color: "bg-blue-500/10 text-blue-500" },
              { label: "Major Exam", weight: "45%", color: "bg-purple-500/10 text-purple-500" },
              { label: "Attendance", weight: "10%", color: "bg-green-500/10 text-green-500" },
              { label: "Problem Sets", weight: "10%", color: "bg-orange-500/10 text-orange-500" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border/50">
                <span className="text-sm font-medium">{item.label}</span>
                <span className={`text-xs font-black px-3 py-1 rounded-full ${item.color}`}>{item.weight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulasPanel;
