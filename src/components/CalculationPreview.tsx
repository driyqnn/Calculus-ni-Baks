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
    <Card className="mt-8 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Live Calculation Preview
              </div>
              <Badge variant="secondary" className="text-xs">Real-time</Badge>
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Watch your grades calculate in real-time as you input values
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handlePDFExport}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
            <Button
              onClick={handleImageExport}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Image className="h-4 w-4" />
              Export Image
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 text-sm">
        
        {/* Midterm Period */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-primary">Midterm Period</h3>
            <div className={`px-3 py-1 rounded-full border-2 ${getGradeBgColor(grades.midterm)}`}>
              <span className={`text-sm font-bold ${getGradeColor(grades.midterm)}`}>
                {grades.midterm.toFixed(2)}%
              </span>
            </div>
          </div>
          
          {/* Quiz Calculation */}
          <div className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-muted">
            <h4 className="font-medium mb-2 sm:mb-3 text-xs sm:text-sm text-accent-foreground flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Quiz Component (35%)
            </h4>
            
            {/* Formula with live values */}
            <div className="space-y-2 mb-2 sm:mb-3">
              <div className="text-xs sm:text-sm font-medium">Step 1: Calculate Quiz Average</div>
              <div className="bg-background p-2 sm:p-3 rounded border overflow-x-auto">
                <BlockMath>{`\\text{Quiz Average} = \\frac{${createQuizDisplayString(midtermState.quizScores, midtermState.quizMaxScores)}}{${quizCount}} \\times 100`}</BlockMath>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground pl-2 sm:pl-4">
                <span className="text-gray-500 dark:text-gray-400">Result:</span> 
                <span className={`font-bold text-lg ml-2 ${getGradeColor(midtermQuizAvg)}`}>
                  {midtermQuizAvg.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-2 sm:mb-3">
              <div className="text-xs sm:text-sm font-medium">Step 2: Apply Adjustment Formula</div>
              <div className="bg-background p-2 sm:p-3 rounded border overflow-x-auto">
                <BlockMath>{`\\text{Adjusted Quiz} = \\left(${midtermQuizAvg.toFixed(2)} \\times 0.5 + 50\\right) \\times 0.35`}</BlockMath>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground pl-2 sm:pl-4">
                <span className="text-gray-500 dark:text-gray-400">Final Quiz Score:</span> 
                <span className={`font-bold text-lg ml-2 ${getGradeColor(midtermAdjustedQuiz * 100 / 35)}`}>
                  {midtermAdjustedQuiz.toFixed(2)} points
                </span>
              </div>
            </div>
          </div>

          {/* Exam Calculation */}
          <div className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-muted">
            <h4 className="font-medium mb-2 sm:mb-3 text-xs sm:text-sm text-accent-foreground flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Major Exam (45%)
            </h4>
            
            <div className="space-y-2 mb-2 sm:mb-3">
              <div className="text-xs sm:text-sm font-medium">Exam Score Calculation</div>
              <div className="bg-background p-2 sm:p-3 rounded border overflow-x-auto">
                <BlockMath>{`\\text{Exam} = \\left(\\frac{${formatValue(midtermState.examScore)}}{${formatValue(midtermState.examMaxScore)}} \\times 100 \\times 0.5 + 50\\right) \\times 0.45`}</BlockMath>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground pl-2 sm:pl-4">
                <span className="text-gray-500 dark:text-gray-400">Final Exam Score:</span> 
                <span className={`font-bold text-lg ml-2 ${getGradeColor(midtermAdjustedExam * 100 / 45)}`}>
                  {midtermAdjustedExam.toFixed(2)} points
                </span>
              </div>
            </div>
          </div>

          {/* Other Components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-muted">
              <h4 className="font-medium mb-2 text-xs sm:text-sm text-accent-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Attendance (10%)
              </h4>
              <div className="bg-background p-2 rounded border overflow-x-auto">
                <InlineMath>{`\\text{Attendance} = ${formatValue(midtermState.attendance)}\\%`}</InlineMath>
              </div>
            </div>
            
            <div className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-muted">
              <h4 className="font-medium mb-2 text-xs sm:text-sm text-accent-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Problem Set (10%)
              </h4>
              <div className="bg-background p-2 rounded border overflow-x-auto">
                <InlineMath>{`\\text{Problem Set} = ${formatValue(midtermState.problemSet)}\\%`}</InlineMath>
              </div>
            </div>
          </div>

          {/* Midterm Total */}
          <div className="bg-primary/10 p-3 sm:p-4 rounded-lg border border-primary/30">
            <div className="text-xs sm:text-sm font-medium mb-2">Midterm Total Calculation:</div>
            <div className="bg-background p-2 sm:p-3 rounded border overflow-x-auto">
              <BlockMath>{`\\text{Midterm} = ${midtermAdjustedQuiz.toFixed(2)} + ${midtermAdjustedExam.toFixed(2)} + ${formatValue(midtermState.attendance)} + ${formatValue(midtermState.problemSet)} = ${grades.midterm.toFixed(2)}`}</BlockMath>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Finals Period */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-primary">Finals Period</h3>
            <div className={`px-3 py-1 rounded-full border-2 ${getGradeBgColor(grades.finals)}`}>
              <span className={`text-sm font-bold ${getGradeColor(grades.finals)}`}>
                {grades.finals.toFixed(2)}%
              </span>
            </div>
          </div>
          
          {/* Quiz Calculation */}
          <div className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-muted">
            <h4 className="font-medium mb-2 sm:mb-3 text-xs sm:text-sm text-accent-foreground flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Quiz Component (35%)
            </h4>
            
            {/* Formula with live values */}
            <div className="space-y-2 mb-2 sm:mb-3">
              <div className="text-xs sm:text-sm font-medium">Step 1: Calculate Quiz Average</div>
              <div className="bg-background p-2 sm:p-3 rounded border overflow-x-auto">
                <BlockMath>{`\\text{Quiz Average} = \\frac{${createQuizDisplayString(finalsState.quizScores, finalsState.quizMaxScores)}}{${quizCount}} \\times 100`}</BlockMath>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground pl-2 sm:pl-4">
                <span className="text-gray-500 dark:text-gray-400">Result:</span> 
                <span className={`font-bold text-lg ml-2 ${getGradeColor(finalsQuizAvg)}`}>
                  {finalsQuizAvg.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-2 sm:mb-3">
              <div className="text-xs sm:text-sm font-medium">Step 2: Apply Adjustment Formula</div>
              <div className="bg-background p-2 sm:p-3 rounded border overflow-x-auto">
                <BlockMath>{`\\text{Adjusted Quiz} = \\left(${finalsQuizAvg.toFixed(2)} \\times 0.5 + 50\\right) \\times 0.35`}</BlockMath>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground pl-2 sm:pl-4">
                <span className="text-gray-500 dark:text-gray-400">Final Quiz Score:</span> 
                <span className={`font-bold text-lg ml-2 ${getGradeColor(finalsAdjustedQuiz * 100 / 35)}`}>
                  {finalsAdjustedQuiz.toFixed(2)} points
                </span>
              </div>
            </div>
          </div>

          {/* Exam Calculation */}
          <div className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-muted">
            <h4 className="font-medium mb-2 sm:mb-3 text-xs sm:text-sm text-accent-foreground flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Major Exam (45%)
            </h4>
            
            <div className="space-y-2 mb-2 sm:mb-3">
              <div className="text-xs sm:text-sm font-medium">Exam Score Calculation</div>
              <div className="bg-background p-2 sm:p-3 rounded border overflow-x-auto">
                <BlockMath>{`\\text{Exam} = \\left(\\frac{${formatValue(finalsState.examScore)}}{${formatValue(finalsState.examMaxScore)}} \\times 100 \\times 0.5 + 50\\right) \\times 0.45`}</BlockMath>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground pl-2 sm:pl-4">
                <span className="text-gray-500 dark:text-gray-400">Final Exam Score:</span> 
                <span className={`font-bold text-lg ml-2 ${getGradeColor(finalsAdjustedExam * 100 / 45)}`}>
                  {finalsAdjustedExam.toFixed(2)} points
                </span>
              </div>
            </div>
          </div>

          {/* Other Components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-muted">
              <h4 className="font-medium mb-2 text-xs sm:text-sm text-accent-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Attendance (10%)
              </h4>
              <div className="bg-background p-2 rounded border overflow-x-auto">
                <InlineMath>{`\\text{Attendance} = ${formatValue(finalsState.attendance)}\\%`}</InlineMath>
              </div>
            </div>
            
            <div className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-muted">
              <h4 className="font-medium mb-2 text-xs sm:text-sm text-accent-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Problem Set (10%)
              </h4>
              <div className="bg-background p-2 rounded border overflow-x-auto">
                <InlineMath>{`\\text{Problem Set} = ${formatValue(finalsState.problemSet)}\\%`}</InlineMath>
              </div>
            </div>
          </div>

          {/* Finals Total */}
          <div className="bg-primary/10 p-3 sm:p-4 rounded-lg border border-primary/30">
            <div className="text-xs sm:text-sm font-medium mb-2">Finals Total Calculation:</div>
            <div className="bg-background p-2 sm:p-3 rounded border overflow-x-auto">
              <BlockMath>{`\\text{Finals} = ${finalsAdjustedQuiz.toFixed(2)} + ${finalsAdjustedExam.toFixed(2)} + ${formatValue(finalsState.attendance)} + ${formatValue(finalsState.problemSet)} = ${grades.finals.toFixed(2)}`}</BlockMath>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Final Grade Calculation */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-primary">Final Grade</h3>
            <div className={`px-4 py-2 rounded-full border-2 ${getGradeBgColor(grades.finalGrade)}`}>
              <span className={`text-lg font-bold ${getGradeColor(grades.finalGrade)}`}>
                RESULT: {grades.finalGrade.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 sm:p-6 rounded-lg border border-primary/20">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <div className="text-xs sm:text-sm font-medium mb-2 text-muted-foreground">Final Grade Formula</div>
                <div className="bg-background p-3 sm:p-4 rounded border overflow-x-auto">
                  <BlockMath>{`\\text{Final Grade} = \\text{Midterm} \\times 0.30 + \\text{Finals} \\times 0.70`}</BlockMath>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs sm:text-sm font-medium mb-2 text-muted-foreground">With Your Current Scores</div>
                <div className="bg-background p-3 sm:p-4 rounded border overflow-x-auto">
                  <BlockMath>{`\\text{Final Grade} = ${grades.midterm.toFixed(2)} \\times 0.30 + ${grades.finals.toFixed(2)} \\times 0.70`}</BlockMath>
                </div>
              </div>

              <div className="text-center">
                <div className={`p-4 sm:p-6 rounded-xl border-2 ${getGradeBgColor(grades.finalGrade)}`}>
                  <div className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">FINAL RESULT</div>
                  <div className={`text-2xl sm:text-4xl font-bold ${getGradeColor(grades.finalGrade)}`}>
                    {grades.finalGrade.toFixed(2)}%
                  </div>
                  <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                    {grades.finalGrade >= 75 ? "PASSING GRADE!" : "NEEDS IMPROVEMENT"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Update Indicator */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-center">Calculations update automatically as you type</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculationPreview;
