import React from "react";
import ScoreInput from "./ScoreInput";
import { AlertCircle } from "lucide-react";

interface GradingPeriodProps {
  periodName: string;
  quizNumbers: number[]; // Dynamic quiz numbers based on configuration
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
  errors = {},
  quizCount,
}) => {

  // Helper function to get color based on period grade
  const getGradeColor = (grade: number): string => {
    if (grade >= 90) return "text-green-500";
    if (grade >= 80) return "text-blue-500";
    if (grade >= 70) return "text-yellow-500";
    if (grade >= 60) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="calculator-card">
      <div className="card-header flex items-center justify-between">
        <span className="text-sm sm:text-base font-medium">{periodName}</span>
        <span className={`grade-value ${getGradeColor(periodGrade)}`}>
          {periodGrade.toFixed(1)}%
        </span>
      </div>
      <div className="calculator-body">
        {/* Quiz Scores Section */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold">Quiz Scores</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizNumbers.map((quizNum, index) => (
              <ScoreInput
                key={`quiz-${index}`}
                label={`Quiz ${quizNum}`}
                score={quizScores[index]}
                maxScore={quizMaxScores[index]}
                onScoreChange={(value) => onChange("quizScores", value, index)}
                onMaxScoreChange={(value) => onChange("quizMaxScores", value, index)}
                error={errors[`quizScores${index}`] || errors[`quizMaxScores${index}`]}
                placeholder="Score"
                maxPlaceholder="Max"
              />
            ))}
          </div>
        </div>

        {/* Exam Section */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold">Major Exam</h4>
          <div className="max-w-sm">
            <ScoreInput
              label="Exam Score"
              score={examScore}
              maxScore={examMaxScore}
              onScoreChange={(value) => onChange("examScore", value)}
              onMaxScoreChange={(value) => onChange("examMaxScore", value)}
              error={errors.examScore || errors.examMaxScore}
              placeholder="Score"
              maxPlaceholder="Max"
            />
          </div>
        </div>

        {/* Other Components */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold">Other Components</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <ScoreInput
              label="Attendance (%)"
              score={attendance}
              onScoreChange={(value) => onChange("attendance", value)}
              error={errors.attendance}
              placeholder="0-100"
              showMaxScore={false}
              maxValue={100}
              step="1"
            />
            <ScoreInput
              label="Problem Set (%)"
              score={problemSet}
              onScoreChange={(value) => onChange("problemSet", value)}
              error={errors.problemSet}
              placeholder="0-100"
              showMaxScore={false}
              maxValue={100}
              step="1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingPeriod;