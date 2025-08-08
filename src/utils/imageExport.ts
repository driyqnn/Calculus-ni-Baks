import html2canvas from 'html2canvas';
import { CourseData } from './storage';
import { calculatePeriodGrade, calculateFinalGrade, calculateGPE, formatFinalGrade, calculateAdjustedQuiz, calculateAdjustedExam } from './calculationUtils';

export const generateImageTranscript = async (course: CourseData): Promise<void> => {
  try {
    // Create a temporary container for the transcript
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px'; // Optimized width for better content fit
    container.style.minHeight = '1000px'; // Adjusted height
    container.style.padding = '40px';
    container.style.backgroundColor = '#ffffff';
    container.style.fontFamily = 'Outfit, Arial, sans-serif';
    container.style.color = '#000000';
    
    // Calculate grades
    const midtermGrade = calculatePeriodGrade(
      course.midtermState.quizScores.filter((s): s is number => s !== null),
      course.midtermState.quizMaxScores.filter((s): s is number => s !== null),
      course.midtermState.examScore || 0,
      course.midtermState.examMaxScore || 100,
      course.midtermState.attendance || 10,
      course.midtermState.problemSet || 10
    );
    
    const finalsGrade = calculatePeriodGrade(
      course.finalsState.quizScores.filter((s): s is number => s !== null),
      course.finalsState.quizMaxScores.filter((s): s is number => s !== null),
      course.finalsState.examScore || 0,
      course.finalsState.examMaxScore || 100,
      course.finalsState.attendance || 10,
      course.finalsState.problemSet || 10
    );
    
    const finalGrade = calculateFinalGrade(midtermGrade, finalsGrade);
    const gpe = calculateGPE(finalGrade);
    
    // Helper function to get grade color
    const getGradeColor = (grade: number) => {
      if (grade >= 97) return '#059669'; // Emerald 600 - Excellent
      if (grade >= 94) return '#10b981'; // Emerald 500 - Very Good  
      if (grade >= 90) return '#34d399'; // Emerald 400 - Good
      if (grade >= 85) return '#fbbf24'; // Amber 400 - Satisfactory
      if (grade >= 80) return '#fb923c'; // Orange 400 - Fair
      if (grade >= 75) return '#f87171'; // Red 400 - Poor
      return '#dc2626'; // Red 600 - Very Poor
    };

    // Generate HTML content with LaTeX formulas and proper grade colors
    container.innerHTML = `
      <div style="padding: 20px; font-family: 'Outfit', Arial, sans-serif;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 15px;">
          <h1 style="color: #2563eb; font-size: 24px; margin: 0 0 8px 0; font-weight: 700;">Grade Calculator Report</h1>
          <div style="font-size: 14px; margin: 5px 0; font-weight: 600;">Course: ${course.name}</div>
          <div style="font-size: 11px; color: #6b7280;">${new Date().toLocaleDateString()} | ${window.location.host}</div>
        </div>

        <!-- Grading System with LaTeX -->
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2563eb; font-size: 16px; margin-bottom: 10px; font-weight: 600;">Grading Formula</h3>
          <div style="font-size: 12px; background: #f8fafc; padding: 15px; border-radius: 8px; line-height: 1.6; border: 1px solid #e2e8f0;">
            <div style="margin-bottom: 8px; font-weight: 600;">Per Period Calculation:</div>
            <div style="font-family: 'Courier New', monospace; background: white; padding: 8px; border-radius: 4px; margin: 6px 0;">
              Grade = Quiz × ${(course.settings.quizWeights.reduce((a,b) => a+b, 0) * 100).toFixed(0)}% + Exam × ${(course.settings.examWeight * 100).toFixed(0)}% + Attendance × ${(course.settings.attendanceWeight * 100).toFixed(0)}% + ProblemSet × ${(course.settings.problemSetWeight * 100).toFixed(0)}%
            </div>
            <div style="margin-bottom: 8px; font-weight: 600;">Final Grade:</div>
            <div style="font-family: 'Courier New', monospace; background: white; padding: 8px; border-radius: 4px; margin: 6px 0;">
              Final = Midterm × ${(course.settings.midtermWeight * 100).toFixed(0)}% + Finals × ${(course.settings.finalsWeight * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <!-- Two Column Layout for Scores -->
        <div style="display: flex; gap: 15px; margin-bottom: 20px;">
          <!-- Midterm Column -->
          <div style="flex: 1;">
            <h3 style="color: #2563eb; font-size: 16px; margin-bottom: 10px; text-align: center;">Midterm Period</h3>
            
            <!-- Quizzes -->
            <div style="background: #f1f5f9; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <div style="font-weight: bold; font-size: 12px; margin-bottom: 6px;">Quizzes:</div>
              ${course.midtermState.quizScores.map((score, index) => {
                if (score !== null) {
                  const maxScore = course.midtermState.quizMaxScores[index];
                  const percentage = maxScore ? ((score / maxScore) * 100).toFixed(1) : '0';
                  return `<div style="font-size: 10px; margin-bottom: 2px;">Q${index + 1}: ${score}/${maxScore} (${percentage}%)</div>`;
                }
                return '';
              }).join('')}
            </div>
            
            ${course.midtermState.examScore !== null ? `
            <div style="background: #f1f5f9; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px;">Major Exam:</div>
              <div style="font-size: 10px;">${course.midtermState.examScore}/${course.midtermState.examMaxScore} (${course.midtermState.examMaxScore ? ((course.midtermState.examScore / course.midtermState.examMaxScore) * 100).toFixed(1) : '0'}%)</div>
            </div>
            ` : ''}
            
            <div style="background: #f1f5f9; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px;">Other Components:</div>
              <div style="font-size: 10px;">Attendance: ${course.midtermState.attendance}/10</div>
              <div style="font-size: 10px;">Problem Set: ${course.midtermState.problemSet}/10</div>
            </div>
            
            <div style="text-align: center; font-size: 14px; font-weight: bold; color: ${getGradeColor(midtermGrade)}; background: ${getGradeColor(midtermGrade)}20; padding: 8px; border-radius: 6px; border: 2px solid ${getGradeColor(midtermGrade)};">
              ${formatFinalGrade(midtermGrade)}
            </div>
          </div>

          <!-- Finals Column -->
          <div style="flex: 1;">
            <h3 style="color: #2563eb; font-size: 16px; margin-bottom: 10px; text-align: center;">Finals Period</h3>
            
            <!-- Quizzes -->
            <div style="background: #f1f5f9; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <div style="font-weight: bold; font-size: 12px; margin-bottom: 6px;">Quizzes:</div>
              ${course.finalsState.quizScores.map((score, index) => {
                if (score !== null) {
                  const maxScore = course.finalsState.quizMaxScores[index];
                  const percentage = maxScore ? ((score / maxScore) * 100).toFixed(1) : '0';
                  return `<div style="font-size: 10px; margin-bottom: 2px;">Q${index + course.settings.quizCount + 1}: ${score}/${maxScore} (${percentage}%)</div>`;
                }
                return '';
              }).join('')}
            </div>
            
            ${course.finalsState.examScore !== null ? `
            <div style="background: #f1f5f9; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px;">Major Exam:</div>
              <div style="font-size: 10px;">${course.finalsState.examScore}/${course.finalsState.examMaxScore} (${course.finalsState.examMaxScore ? ((course.finalsState.examScore / course.finalsState.examMaxScore) * 100).toFixed(1) : '0'}%)</div>
            </div>
            ` : ''}
            
            <div style="background: #f1f5f9; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px;">Other Components:</div>
              <div style="font-size: 10px;">Attendance: ${course.finalsState.attendance}/10</div>
              <div style="font-size: 10px;">Problem Set: ${course.finalsState.problemSet}/10</div>
            </div>
            
            <div style="text-align: center; font-size: 14px; font-weight: bold; color: ${getGradeColor(finalsGrade)}; background: ${getGradeColor(finalsGrade)}20; padding: 8px; border-radius: 6px; border: 2px solid ${getGradeColor(finalsGrade)};">
              ${formatFinalGrade(finalsGrade)}
            </div>
          </div>
        </div>

        <!-- Final Grade Summary -->
        <div style="background: ${getGradeColor(finalGrade)}20; padding: 15px; border-radius: 8px; border: 2px solid ${getGradeColor(finalGrade)}; text-align: center;">
          <h3 style="color: ${getGradeColor(finalGrade)}; font-size: 18px; margin: 0 0 10px 0; font-weight: 700;">Final Results</h3>
          <div style="font-size: 14px; margin-bottom: 8px; font-family: 'Courier New', monospace; background: white; padding: 8px; border-radius: 4px;">
            ${formatFinalGrade(midtermGrade)} × ${course.settings.midtermWeight.toFixed(2)} + ${formatFinalGrade(finalsGrade)} × ${course.settings.finalsWeight.toFixed(2)} = ${formatFinalGrade(finalGrade)}
          </div>
          <div style="border-top: 2px solid ${getGradeColor(finalGrade)}; padding-top: 12px; margin-top: 12px;">
            <div style="font-size: 24px; font-weight: 700; color: ${getGradeColor(finalGrade)}; margin-bottom: 8px;">
              Final Grade: ${formatFinalGrade(finalGrade)}
            </div>
            <div style="font-size: 20px; font-weight: 600; color: ${getGradeColor(finalGrade)};">
              GPE: ${gpe}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; margin-top: 15px; padding-top: 10px; text-align: center; font-size: 10px; color: #6b7280;">
          <div>Developed by @driyqnn</div>
          <div>Generated from ${window.location.host}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    
    const canvas = await html2canvas(container, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      width: 800,
      height: container.scrollHeight,
      useCORS: true,
    });
    
    document.body.removeChild(container);
    
    const link = document.createElement('a');
    link.download = `${course.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_grade_report.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Failed to generate image:', error);
    throw new Error('Failed to generate image transcript');
  }
};