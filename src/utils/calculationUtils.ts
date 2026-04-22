// Calculate quiz average (simple average of non-null scores)
export const calculateQuizAverage = (scores: (number | null)[], maxScores: (number | null)[]): number => {
  const validScores: number[] = [];
  const validMaxScores: number[] = [];
  
  scores.forEach((score, index) => {
    if (score !== null && score !== undefined && maxScores[index] !== null && maxScores[index] !== undefined && maxScores[index] !== 0) {
      validScores.push(score);
      validMaxScores.push(maxScores[index] as number);
    }
  });

  if (validScores.length === 0) return 0;

  const percentages = validScores.map((score, index) => (score / validMaxScores[index]) * 100);
  return percentages.reduce((sum, percent) => sum + percent, 0) / percentages.length;
};

// Calculate adjusted quiz score with dynamic weight
export const calculateAdjustedQuiz = (scores: (number | null)[], maxScores: (number | null)[], weight: number = 0.35): number => {
  const quizAvg = calculateQuizAverage(scores, maxScores);
  return ((quizAvg * 0.5) + 50) * weight;
};

// Calculate adjusted exam score with dynamic weight
export const calculateAdjustedExam = (score: number | null, maxScore: number | null, weight: number = 0.45): number => {
  if (score === null || score === undefined || !maxScore) return 0;
  const percentage = (score / maxScore) * 100;
  return ((percentage * 0.5) + 50) * weight;
};

// Calculate the period grade (midterm or finals) with full dynamic weighting
export const calculatePeriodGrade = (
  quizScores: (number | null)[], 
  quizMaxScores: (number | null)[], 
  examScore: number | null,
  examMaxScore: number | null,
  attendance: number | null,
  problemSet: number | null,
  weights: { quiz: number, exam: number, attendance: number, problemSet: number } = { quiz: 0.35, exam: 0.45, attendance: 0.1, problemSet: 0.1 }
): number => {
  const adjustedQuiz = calculateAdjustedQuiz(quizScores, quizMaxScores, weights.quiz);
  const adjustedExam = calculateAdjustedExam(examScore, examMaxScore, weights.exam);
  
  const attendanceScore = (attendance || 0) * weights.attendance; 
  const problemSetScore = (problemSet || 0) * weights.problemSet; 
  
  return adjustedQuiz + adjustedExam + attendanceScore + problemSetScore;
};

// Calculate final grade with dynamic period weighting
export const calculateFinalGrade = (
  midterm: number, 
  finals: number, 
  midtermWeight: number = 0.30, 
  finalsWeight: number = 0.70
): number => {
  return (midterm * midtermWeight) + (finals * finalsWeight);
};

// Natural rounding function
export const naturalRound = (num: number): number => {
  return Math.round(num);
};

// Reverse engineering needed finals score
export const calculatePointsNeeded = (
  currentMidterm: number, 
  targetGrade: number = 75,
  midtermWeight: number = 0.3,
  finalsWeight: number = 0.7
): number => {
  return (targetGrade - (currentMidterm * midtermWeight)) / finalsWeight;
};

// GPE mapping
export const calculateGPE = (finalGrade: number): string => {
  const roundedGrade = naturalRound(finalGrade);
  if (roundedGrade < 75) return "5.00";
  if (roundedGrade >= 99) return "1.00";
  if (roundedGrade >= 96) return "1.25";
  if (roundedGrade >= 93) return "1.50";
  if (roundedGrade >= 90) return "1.75";
  if (roundedGrade >= 87) return "2.00";
  if (roundedGrade >= 84) return "2.25";
  if (roundedGrade >= 81) return "2.50";
  if (roundedGrade >= 78) return "2.75";
  if (roundedGrade >= 75) return "3.00";
  return "5.00";
};

// UI color mapping
export const getGradeColor = (finalGrade: number): string => {
  const roundedGrade = naturalRound(finalGrade);
  if (roundedGrade < 75) return "text-destructive";
  if (roundedGrade < 80) return "text-yellow-500";
  if (roundedGrade < 90) return "text-orange-400";
  return "text-green-500";
};

export const formatFinalGrade = (finalGrade: number): string => {
  const roundedGrade = naturalRound(finalGrade);
  return `${roundedGrade} (${finalGrade.toFixed(2)})`;
};
