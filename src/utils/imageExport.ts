import html2canvas from 'html2canvas';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { CourseData } from './storage';
import { 
  calculatePeriodGrade, 
  calculateFinalGrade, 
  calculateGPE, 
  calculateAdjustedQuiz, 
  calculateAdjustedExam 
} from './calculationUtils';

const formatValue = (value: number | null | undefined): string => {
  return value !== null && value !== undefined ? value.toString() : "0";
};

const createQuizDisplayString = (scores: (number | null)[], maxScores: (number | null)[], quizCount: number): string => {
  const quizPairs = scores.map((score, index) => {
    const max = maxScores[index];
    const scoreStr = score !== null ? score.toString() : "0";
    const maxStr = max !== null ? max.toString() : "100";
    return `\\frac{${scoreStr}}{${maxStr}}`;
  });
  
  if (quizPairs.length === 0) return `\\text{Avg} = \\frac{0}{100}`;
  return `\\text{Avg} = \\frac{${quizPairs.join(" + ")}}{${quizCount}}`;
};

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

    // Prepare KaTeX formulas
    const quizCount = Math.max(course.midtermState.quizScores.length, course.finalsState.quizScores.length, 1);
    
    const midtermQuizFormula = createQuizDisplayString(course.midtermState.quizScores, course.midtermState.quizMaxScores, quizCount);
    const midtermExamFormula = `\\text{Exam} = (\\frac{${formatValue(course.midtermState.examScore)}}{${formatValue(course.midtermState.examMaxScore)}} \\times 0.5) + 50`;
    
    const finalsQuizFormula = createQuizDisplayString(course.finalsState.quizScores, course.finalsState.quizMaxScores, quizCount);
    const finalsExamFormula = `\\text{Exam} = (\\frac{${formatValue(course.finalsState.examScore)}}{${formatValue(course.finalsState.examMaxScore)}} \\times 0.5) + 50`;
    
    const finalTotalFormula = `\\text{Total} = (${midtermGrade.toFixed(1)} \\times ${course.settings.midtermWeight}) + (${finalsGrade.toFixed(1)} \\times ${course.settings.finalsWeight})`;

    container.innerHTML = `
      <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #8b5cf6; font-size: 32px; margin: 0; font-weight: 900; letter-spacing: -1px;">GRADE GENIUS</h1>
          <p style="font-size: 10px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 3px; margin-top: 5px;">Academic Verification Protocol</p>
        </div>

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

        <div style="background: rgba(255,255,255,0.02); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 30px;">
          <h3 style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #8b5cf6; margin: 0 0 20px 0;">Mathematical Proof</h3>
          
          <div style="margin-bottom: 25px;">
            <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 10px;">[1] Midterm Formulae</div>
            <div id="midterm-quiz" style="margin-bottom: 10px; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 12px;"></div>
            <div id="midterm-exam" style="padding: 15px; background: rgba(255,255,255,0.02); border-radius: 12px;"></div>
          </div>

          <div style="margin-bottom: 25px;">
            <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 10px;">[2] Finals Formulae</div>
            <div id="finals-quiz" style="margin-bottom: 10px; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 12px;"></div>
            <div id="finals-exam" style="padding: 15px; background: rgba(255,255,255,0.02); border-radius: 12px;"></div>
          </div>

          <div>
            <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 10px;">[3] Final Integration</div>
            <div id="final-total" style="padding: 20px; background: rgba(139, 92, 246, 0.05); border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);"></div>
          </div>
        </div>

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

    // Render KaTeX into the container
    katex.render(midtermQuizFormula, container.querySelector('#midterm-quiz') as HTMLElement, { displayMode: true });
    katex.render(midtermExamFormula, container.querySelector('#midterm-exam') as HTMLElement, { displayMode: true });
    katex.render(finalsQuizFormula, container.querySelector('#finals-quiz') as HTMLElement, { displayMode: true });
    katex.render(finalsExamFormula, container.querySelector('#finals-exam') as HTMLElement, { displayMode: true });
    katex.render(finalTotalFormula, container.querySelector('#final-total') as HTMLElement, { displayMode: true });

    // Wait a bit for KaTeX to finish rendering styles
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(container, { 
      backgroundColor: null, 
      scale: 2, 
      logging: false, 
      useCORS: true,
      onclone: (clonedDoc) => {
        // Ensure KaTeX styles are preserved in the clone
        const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
        styles.forEach(style => {
          clonedDoc.head.appendChild(style.cloneNode(true));
        });
      }
    });
    
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
