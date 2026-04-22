import React from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { calculateAdjustedQuiz, calculateAdjustedExam, calculateQuizAverage } from "@/utils/calculationUtils";
import { generatePDFTranscript } from "@/utils/pdfGenerator";
import { generateImageTranscript } from "@/utils/imageExport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Image, Download, Calculator, PenTool, ClipboardList, BookOpen, Users } from "lucide-react";

import { CourseData } from "@/utils/storage";

interface CalculationPreviewProps {
  midtermState: {
    quizScores: (number | null)[];
    quizMaxScores: (number | null)[];
    examScore: number | null;
    examMaxScore: number | null;
    attendance: number | null;
    problemSet: number | null;
  };
  finalsState: {
    quizScores: (number | null)[];
    quizMaxScores: (number | null)[];
    examScore: number | null;
    examMaxScore: number | null;
    attendance: number | null;
    problemSet: number | null;
  };
  grades: {
    midterm: number;
    finals: number;
    finalGrade: number;
  };
  quizCount: number;
  activeCourse?: CourseData;
}

const CalculationPreview: React.FC<CalculationPreviewProps> = ({
  midtermState,
  finalsState,
  grades,
  quizCount,
  activeCourse,
}) => {
  

  const handlePDFExport = async () => {
    if (!activeCourse) {
      console.warn('No course selected for PDF export');
      return;
    }

    try {
      await generatePDFTranscript(activeCourse);
      console.log('PDF exported successfully');
    } catch (error) {
      console.error('Failed to export PDF:', error);
    }
  };

  const handleImageExport = async () => {
    if (!activeCourse) {
      console.warn('No course selected for image export');
      return;
    }

    try {
      await generateImageTranscript(activeCourse);
      console.log('Image exported successfully');
    } catch (error) {
      console.error('Failed to export image:', error);
    }
  };
  // Helper function to get color based on grade
  const getGradeColor = (grade: number): string => {
    if (grade >= 75) return "text-green-600 dark:text-green-400";
    if (grade >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (grade >= 50) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getGradeBgColor = (grade: number): string => {
    if (grade >= 75) return "bg-green-500/10 border-green-500/20";
    if (grade >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    if (grade >= 50) return "bg-orange-500/10 border-orange-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  // Helper function to format values with live updates
  const formatValue = (value: number | null | undefined): string => {
    return value !== null && value !== undefined ? value.toString() : "0";
  };

  // Helper function to create quiz display string with actual values
  const createQuizDisplayString = (scores: (number | null)[], maxScores: (number | null)[]): string => {
    const quizPairs = scores.map((score, index) => {
      const max = maxScores[index];
      const scoreStr = score !== null ? score.toString() : "UserScore";
      const maxStr = max !== null ? max.toString() : "100";
      return `\\frac{${scoreStr}}{${maxStr}}`;
    });
    
    if (quizPairs.length === 0) return "\\frac{UserScore}{100}";
    return quizPairs.join(" + ");
  };

  // Calculate actual quiz averages for live display
  const midtermQuizAvg = calculateQuizAverage(
    midtermState.quizScores.filter(s => s !== null) as number[],
    midtermState.quizMaxScores.filter(m => m !== null) as number[]
  );

  const finalsQuizAvg = calculateQuizAverage(
    finalsState.quizScores.filter(s => s !== null) as number[],
    finalsState.quizMaxScores.filter(m => m !== null) as number[]
  );

  // Calculate adjusted scores for live display
  const midtermAdjustedQuiz = calculateAdjustedQuiz(
    midtermState.quizScores.filter(s => s !== null) as number[],
    midtermState.quizMaxScores.filter(m => m !== null) as number[]
  );

  const finalsAdjustedQuiz = calculateAdjustedQuiz(
    finalsState.quizScores.filter(s => s !== null) as number[],
    finalsState.quizMaxScores.filter(m => m !== null) as number[]
  );

  const midtermAdjustedExam = calculateAdjustedExam(
    midtermState.examScore || 0,
    midtermState.examMaxScore || 100
  );

  const finalsAdjustedExam = calculateAdjustedExam(
    finalsState.examScore || 0,
    finalsState.examMaxScore || 100
  );

  return (
    <div className="space-y-6 text-sm animate-fade-in pb-10">
      {/* Midterm Period */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-black text-primary uppercase tracking-tighter">Midterm Path</h3>
          <Badge variant="outline" className={`font-mono font-black ${getGradeColor(grades.midterm)}`}>
            {grades.midterm.toFixed(2)}%
          </Badge>
        </div>
        
        <div className="bg-muted/20 p-5 rounded-[24px] border border-white/5 space-y-5">
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <PenTool className="w-3 h-3" /> Quiz Avg (35%)
            </div>
            <div className="bg-background/50 p-3 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
              <BlockMath>{`\\text{Avg} = \\frac{${createQuizDisplayString(midtermState.quizScores, midtermState.quizMaxScores)}}{${quizCount}}`}</BlockMath>
            </div>
            <div className="text-right font-black text-primary tabular-nums">{midtermQuizAvg.toFixed(2)}%</div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <ClipboardList className="w-3 h-3" /> Major Exam (45%)
            </div>
            <div className="bg-background/50 p-3 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
              <BlockMath>{`\\text{Exam} = (\\frac{${formatValue(midtermState.examScore)}}{${formatValue(midtermState.examMaxScore)}} \\times 0.5) + 50`}</BlockMath>
            </div>
            <div className="text-right font-black text-primary tabular-nums">{midtermAdjustedExam.toFixed(2)} pts</div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* Finals Period */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-black text-primary uppercase tracking-tighter">Finals Path</h3>
          <Badge variant="outline" className={`font-mono font-black ${getGradeColor(grades.finals)}`}>
            {grades.finals.toFixed(2)}%
          </Badge>
        </div>
        
        <div className="bg-muted/20 p-5 rounded-[24px] border border-white/5 space-y-5">
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <PenTool className="w-3 h-3" /> Quiz Avg (35%)
            </div>
            <div className="bg-background/50 p-3 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
              <BlockMath>{`\\text{Avg} = \\frac{${createQuizDisplayString(finalsState.quizScores, finalsState.quizMaxScores)}}{${quizCount}}`}</BlockMath>
            </div>
            <div className="text-right font-black text-primary tabular-nums">{finalsQuizAvg.toFixed(2)}%</div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <ClipboardList className="w-3 h-3" /> Major Exam (45%)
            </div>
            <div className="bg-background/50 p-3 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
              <BlockMath>{`\\text{Exam} = (\\frac{${formatValue(finalsState.examScore)}}{${formatValue(finalsState.examMaxScore)}} \\times 0.5) + 50`}</BlockMath>
            </div>
            <div className="text-right font-black text-primary tabular-nums">{finalsAdjustedExam.toFixed(2)} pts</div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* Final Sum */}
      <div className="bg-primary/10 p-6 rounded-[32px] border border-primary/20 space-y-4">
        <div className="text-center text-[10px] font-black uppercase tracking-widest text-primary/70">Final Computation</div>
        <div className="bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
          <BlockMath>{`\\text{Total} = (${grades.midterm.toFixed(1)} \\times 0.3) + (${grades.finals.toFixed(1)} \\times 0.7)`}</BlockMath>
        </div>
        <div className="text-center">
          <div className={`text-4xl font-black ${getGradeColor(grades.finalGrade)} tabular-nums`}>{grades.finalGrade.toFixed(2)}%</div>
          <div className="text-[8px] font-black uppercase tracking-widest opacity-50 mt-1">Confirmed Result</div>
        </div>
      </div>
    </div>
  );
};

export default CalculationPreview;
