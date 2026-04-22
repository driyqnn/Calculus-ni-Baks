import html2canvas from 'html2canvas';
import { CourseData } from './storage';
import { calculatePeriodGrade, calculateFinalGrade, calculateGPE, formatFinalGrade } from './calculationUtils';

export const generateImageTranscript = async (course: CourseData): Promise<void> => {
  try {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px';
    container.style.padding = '50px';
    container.style.backgroundColor = '#0a0a0a';
    container.style.fontFamily = 'Outfit, sans-serif';
    container.style.color = '#ffffff';
    
    const periodWeights = {
      quiz: course.settings.quizWeight || 0.35,
      exam: course.settings.examWeight || 0.45,
      attendance: course.settings.attendanceWeight || 0.1,
      problemSet: course.settings.problemSetWeight || 0.1
    };

    const midtermGrade = calculatePeriodGrade(course.midtermState.quizScores, course.midtermState.quizMaxScores, course.midtermState.examScore, course.midtermState.examMaxScore, course.midtermState.attendance, course.midtermState.problemSet, periodWeights);
    const finalsGrade = calculatePeriodGrade(course.finalsState.quizScores, course.finalsState.quizMaxScores, course.finalsState.examScore, course.finalsState.examMaxScore, course.finalsState.attendance, course.finalsState.problemSet, periodWeights);
    const finalGrade = calculateFinalGrade(midtermGrade, finalsGrade, course.settings.midtermWeight, course.settings.finalsWeight);
    const gpe = calculateGPE(finalGrade);

    container.innerHTML = `
      <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #8b5cf6; font-size: 32px; margin: 0; font-weight: 900; letter-spacing: -1px;">GRADE GENIUS</h1>
          <p style="font-size: 10px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 3px; margin-top: 5px;">Academic Verification Protocol</p>
        </div>

        <!-- Grade Summary -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); text-align: center;">
            <div style="font-size: 10px; color: rgba(255,255,255,0.5); text-transform: uppercase; font-weight: 900; margin-bottom: 10px;">Midterm</div>
            <div style="font-size: 36px; font-weight: 900; color: ${midtermGrade >= 75 ? '#8b5cf6' : '#ef4444'}">${midtermGrade.toFixed(1)}%</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); text-align: center;">
            <div style="font-size: 10px; color: rgba(255,255,255,0.5); text-transform: uppercase; font-weight: 900; margin-bottom: 10px;">Finals</div>
            <div style="font-size: 36px; font-weight: 900; color: ${finalsGrade >= 75 ? '#8b5cf6' : '#ef4444'}">${finalsGrade.toFixed(1)}%</div>
          </div>
        </div>

        <!-- Calculations Table -->
        <div style="background: rgba(255,255,255,0.02); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 30px;">
          <h3 style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #8b5cf6; margin: 0 0 20px 0;">Mathematical Proof</h3>
          <div style="font-family: monospace; font-size: 13px; line-height: 1.8; color: rgba(255,255,255,0.7);">
            <div style="margin-bottom: 15px;">
              <span style="color: #8b5cf6;">[1] Midterm Aggregation:</span><br/>
              (AdjQuiz × ${periodWeights.quiz}) + (AdjExam × ${periodWeights.exam}) + (Att × ${periodWeights.attendance}) + (PSet × ${periodWeights.problemSet}) = ${midtermGrade.toFixed(2)}%
            </div>
            <div style="margin-bottom: 15px;">
              <span style="color: #8b5cf6;">[2] Finals Aggregation:</span><br/>
              (AdjQuiz × ${periodWeights.quiz}) + (AdjExam × ${periodWeights.exam}) + (Att × ${periodWeights.attendance}) + (PSet × ${periodWeights.problemSet}) = ${finalsGrade.toFixed(2)}%
            </div>
            <div style="margin-bottom: 5px;">
              <span style="color: #8b5cf6;">[3] Final Computation:</span><br/>
              (${midtermGrade.toFixed(1)} × ${course.settings.midtermWeight}) + (${finalsGrade.toFixed(1)} × ${course.settings.finalsWeight}) = <span style="color: #8b5cf6; font-weight: 900;">${finalGrade.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <!-- Final Standing -->
        <div style="background: rgba(139, 92, 246, 0.1); padding: 40px; border-radius: 24px; border: 1px solid rgba(139, 92, 246, 0.3); text-align: center; position: relative; overflow: hidden;">
          <div style="font-size: 14px; color: #8b5cf6; text-transform: uppercase; font-weight: 900; letter-spacing: 2px; margin-bottom: 10px;">Overall Standing</div>
          <div style="font-size: 80px; font-weight: 900; line-height: 1; color: #8b5cf6; margin-bottom: 15px;">${Math.round(finalGrade)}%</div>
          <div style="font-size: 32px; font-weight: 900; color: rgba(255,255,255,0.9);">GPE: ${gpe}</div>
        </div>

        <div style="margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: rgba(255,255,255,0.4);">
          <div>Generated on ${new Date().toLocaleDateString()} | Verified @ Grade Genius</div>
          <div style="font-weight: 900; color: #8b5cf6;">@DRYIQNN PROTOCOL</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    const canvas = await html2canvas(container, { backgroundColor: null, scale: 2, logging: false, useCORS: true });
    document.body.removeChild(container);
    const link = document.createElement('a');
    link.download = `${course.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_verification.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Failed to generate image:', error);
    throw new Error('Failed to generate image transcript');
  }
};
