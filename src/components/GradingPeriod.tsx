import React from "react";
import ScoreInput from "./ScoreInput";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GradingPeriodProps {
  periodName: string;
  quizNumbers: number[];
  quizScores: (number | null)[];
  quizMaxScores: (number | null)[];
  examScore: number | null;
  examMaxScore: number | null;
  attendance: number | null;
  problemSet: number | null;
  periodGrade: number;
  onChange: (
    field: string,
    value: number | null,
    index?: number
  ) => void;
  onAddQuiz: () => void;
  onRemoveQuiz: (index: number) => void;
  onShowCalc: () => void;
  errors?: { [key: string]: string | null };
  quizCount: number;
}

const GradingPeriod: React.FC<GradingPeriodProps> = ({
  periodName,
  quizNumbers,
  quizScores,
  quizMaxScores,
  examScore,
  examMaxScore,
  attendance,
  problemSet,
  periodGrade,
  onChange,
  onAddQuiz,
  onRemoveQuiz,
  onShowCalc,
  errors = {},
  quizCount,
}) => {

  const getGradeColor = (grade: number): string => {
    if (grade >= 90) return "text-green-500 bg-green-500/10";
    if (grade >= 80) return "text-blue-500 bg-blue-500/10";
    if (grade >= 75) return "text-yellow-500 bg-yellow-500/10";
    return "text-red-500 bg-red-500/10";
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Period Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black tracking-tight">{periodName} Period</h2>
        <Badge variant="secondary" className={`px-4 py-1 text-sm font-black rounded-full ${getGradeColor(periodGrade)}`}>
          {periodGrade.toFixed(1)}%
        </Badge>
      </div>

      {/* Quiz Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Quizzes</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onAddQuiz} className="h-8 rounded-xl bg-primary/10 text-primary font-black text-[10px] uppercase gap-1">
            <Plus className="w-3 h-3" /> Add Quiz
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {quizScores.map((_, index) => (
            <div key={`quiz-row-${index}`} className="relative group">
              <ScoreInput
                label={`Quiz #${index + 1}`}
                score={quizScores[index]}
                maxScore={quizMaxScores[index]}
                onScoreChange={(value) => onChange("quizScores", value, index)}
                onMaxScoreChange={(value) => onChange("quizMaxScores", value, index)}
                error={errors[`quizScores${index}`] || errors[`quizMaxScores${index}`]}
              />
              {quizScores.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onRemoveQuiz(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive/10 text-destructive border border-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border/50" />

      {/* Major Exam Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Major Assessment</h3>
        </div>
        <ScoreInput
          label="Final Exam"
          score={examScore}
          maxScore={examMaxScore}
          onScoreChange={(value) => onChange("examScore", value)}
          onMaxScoreChange={(value) => onChange("examMaxScore", value)}
          error={errors.examScore || errors.examMaxScore}
        />
      </section>

      <Separator className="bg-border/50" />

      {/* Others Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Other Metrics</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <ScoreInput
            label="Attendance & Participation"
            score={attendance}
            onScoreChange={(value) => onChange("attendance", value)}
            error={errors.attendance}
            placeholder="0"
            showMaxScore={false}
            maxValue={100}
          />
          <ScoreInput
            label="Problem Sets & Tasks"
            score={problemSet}
            onScoreChange={(value) => onChange("problemSet", value)}
            error={errors.problemSet}
            placeholder="0"
            showMaxScore={false}
            maxValue={100}
          />
        </div>
      </section>

      <div className="pt-4 px-2">
        <Button 
          onClick={onShowCalc}
          className="w-full h-14 rounded-2xl bg-muted/50 border border-white/5 text-foreground hover:bg-muted font-black uppercase tracking-widest text-[10px] gap-2 shadow-inner"
        >
          <Calculator className="w-4 h-4 text-primary" />
          Show Full Mathematical Proof
        </Button>
      </div>
    </div>
  );
};

export default GradingPeriod;
