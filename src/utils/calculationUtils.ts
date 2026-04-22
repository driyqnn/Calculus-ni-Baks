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
// Formula: (Avg / 100 * 0.5 + 50) * Weight
export const calculateAdjustedQuiz = (scores: (number | null)[], maxScores: (number | null)[], weight: number = 0.35): number => {
  const quizAvg = calculateQuizAverage(scores, maxScores);
  // weight is likely 0.35, but user's example says "Quiz Component: 17.50 points" 
  // which is exactly half of 35 points. So if weight is 0.35 (as decimal), 
  // the result should be 17.50 (as absolute points) if Avg=0.
  // Actually, weight should be the absolute max points for that component.
  const maxPoints = weight > 1 ? weight : weight * 100;
  return ((quizAvg / 100 * 0.5) + 0.5) * maxPoints;
};

// Calculate adjusted exam score with dynamic weight
// Formula: (Score / Max * 0.5 + 50) * Weight
export const calculateAdjustedExam = (score: number | null, maxScore: number | null, weight: number = 0.45): number => {
  if (score === null || score === undefined || !maxScore) {
    const maxPoints = weight > 1 ? weight : weight * 100;
    return 0.5 * maxPoints; // Default to 50% of the component weight
  }
  const percentage = (score / maxScore);
  const maxPoints = weight > 1 ? weight : weight * 100;
  return ((percentage * 0.5) + 0.5) * maxPoints;
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
  // Convert decimal weights (0.35) to points (35)
  const qWeight = weights.quiz > 1 ? weights.quiz : weights.quiz * 100;
  const eWeight = weights.exam > 1 ? weights.exam : weights.exam * 100;
  const aWeight = weights.attendance > 1 ? weights.attendance : weights.attendance * 100;
  const pWeight = weights.problemSet > 1 ? weights.problemSet : weights.problemSet * 100;

  const adjustedQuiz = calculateAdjustedQuiz(quizScores, quizMaxScores, qWeight);
  const adjustedExam = calculateAdjustedExam(examScore, examMaxScore, eWeight);
  
  // Attendance and Problem Set are direct points
  // User example: Attendance: 10/10 (10%) -> 10.00 points
  const attendanceScore = (attendance || 0); // Assuming attendance input is points (0-10)
  const problemSetScore = (problemSet || 0); // Assuming problem set input is points (0-10)
  
  return adjustedQuiz + adjustedExam + attendanceScore + problemSetScore;
};

// Calculate final grade with dynamic period weighting
export const calculateFinalGrade = (
  midterm: number, 
  finals: number, 
  midtermWeight: number = 0.30, 
  finalsWeight: number = 0.70
): number => {
  // Ensure weights are decimals
  const mWeight = midtermWeight > 1 ? midtermWeight / 100 : midtermWeight;
  const fWeight = finalsWeight > 1 ? finalsWeight / 100 : finalsWeight;
  return (midterm * mWeight) + (finals * fWeight);
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
  const mWeight = midtermWeight > 1 ? midtermWeight / 100 : midtermWeight;
  const fWeight = finalsWeight > 1 ? finalsWeight / 100 : finalsWeight;
  return (targetGrade - (currentMidterm * mWeight)) / fWeight;
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
