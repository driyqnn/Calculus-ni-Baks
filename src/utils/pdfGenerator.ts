import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CourseData } from './storage';
import { calculatePeriodGrade, calculateFinalGrade, calculateGPE, formatFinalGrade, calculateAdjustedQuiz, calculateAdjustedExam } from './calculationUtils';

export const generatePDFTranscript = async (course: CourseData): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Set colors
    const primaryColor: [number, number, number] = [37, 99, 235]; // Blue
    const secondaryColor: [number, number, number] = [75, 85, 99]; // Gray
    const successColor: [number, number, number] = [34, 197, 94]; // Green
    const warningColor: [number, number, number] = [245, 158, 11]; // Orange
    
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
    
    // PDF Header with colors
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(24);
    pdf.text('Grade Calculator Report', 20, 25);
    
    // Add a colored line under header
    pdf.setDrawColor(...primaryColor);
    pdf.setLineWidth(0.5);
    pdf.line(20, 30, 190, 30);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.text(`Course: ${course.name}`, 20, 45);
    pdf.setFontSize(12);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55);
    pdf.text(`Host: ${window.location.host}`, 20, 62);
    
    // Grade Calculation Formulas
    let yPos = 80;
    pdf.setFontSize(16);
    pdf.text('Grading System Formulas', 20, yPos);
    yPos += 15;
    
    pdf.setFontSize(10);
    pdf.text('Per Period Calculation:', 20, yPos);
    yPos += 8;
    pdf.text('• Quiz (35%): (Average Score / 100 × 0.5 + 50) × 0.35', 25, yPos);
    yPos += 8;
    pdf.text('• Major Exam (45%): (Score / Max × 0.5 + 50) × 0.45', 25, yPos);
    yPos += 8;
    pdf.text('• Attendance (10%): Direct percentage score', 25, yPos);
    yPos += 8;
    pdf.text('• Problem Set (10%): Score × 0.10', 25, yPos);
    yPos += 15;
    
    pdf.text('Final Grade: Midterm × 30% + Finals × 70%', 20, yPos);
    yPos += 20;

    // Midterm Section
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(16);
    pdf.text('Midterm Period Details', 20, yPos);
    pdf.setTextColor(0, 0, 0);
    yPos += 15;
    
    pdf.setFontSize(12);
    // Quiz details with calculations
    const midtermQuizAdjusted = calculateAdjustedQuiz(
      course.midtermState.quizScores.filter((s): s is number => s !== null),
      course.midtermState.quizMaxScores.filter((s): s is number => s !== null)
    );
    
    pdf.text('Quizzes:', 30, yPos);
    yPos += 10;
    course.midtermState.quizScores.forEach((score, index) => {
      if (score !== null) {
        const maxScore = course.midtermState.quizMaxScores[index];
        const percentage = maxScore ? ((score / maxScore) * 100).toFixed(1) : '0';
        pdf.setFontSize(10);
        pdf.text(`  Quiz ${index + 1}: ${score}/${maxScore} (${percentage}%)`, 35, yPos);
        yPos += 8;
      }
    });
    
    pdf.setFontSize(10);
    pdf.text(`  Quiz Component: ${midtermQuizAdjusted.toFixed(2)} points`, 35, yPos);
    yPos += 12;
    
    // Exam details
    const midtermExamAdjusted = calculateAdjustedExam(
      course.midtermState.examScore || 0,
      course.midtermState.examMaxScore || 100
    );
    
    pdf.setFontSize(12);
    if (course.midtermState.examScore !== null) {
      const examPct = course.midtermState.examMaxScore 
        ? ((course.midtermState.examScore / course.midtermState.examMaxScore) * 100).toFixed(1)
        : '0';
      pdf.text(`Major Exam: ${course.midtermState.examScore}/${course.midtermState.examMaxScore} (${examPct}%)`, 30, yPos);
      yPos += 8;
      pdf.setFontSize(10);
      pdf.text(`  Exam Component: ${midtermExamAdjusted.toFixed(2)} points`, 35, yPos);
      yPos += 12;
    }
    
    pdf.setFontSize(12);
    pdf.text(`Attendance: ${course.midtermState.attendance}/10 (${course.midtermState.attendance}%)`, 30, yPos);
    yPos += 8;
    pdf.setFontSize(10);
    pdf.text(`  Attendance Component: ${(course.midtermState.attendance || 0).toFixed(2)} points`, 35, yPos);
    yPos += 12;
    
    pdf.setFontSize(12);
    pdf.text(`Problem Set: ${course.midtermState.problemSet}/10 (${course.midtermState.problemSet}%)`, 30, yPos);
    yPos += 8;
    pdf.setFontSize(10);
    pdf.text(`  Problem Set Component: ${(course.midtermState.problemSet || 0).toFixed(2)} points`, 35, yPos);
    yPos += 15;
    
    pdf.setFontSize(14);
    pdf.text(`Midterm Total: ${formatFinalGrade(midtermGrade)}`, 30, yPos);
    yPos += 25;
    
    // Finals Section
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(16);
    pdf.text('Finals Period Details', 20, yPos);
    pdf.setTextColor(0, 0, 0);
    yPos += 15;
    
    pdf.setFontSize(12);
    // Quiz details with calculations
    const finalsQuizAdjusted = calculateAdjustedQuiz(
      course.finalsState.quizScores.filter((s): s is number => s !== null),
      course.finalsState.quizMaxScores.filter((s): s is number => s !== null)
    );
    
    pdf.text('Quizzes:', 30, yPos);
    yPos += 10;
    course.finalsState.quizScores.forEach((score, index) => {
      if (score !== null) {
        const maxScore = course.finalsState.quizMaxScores[index];
        const percentage = maxScore ? ((score / maxScore) * 100).toFixed(1) : '0';
        pdf.setFontSize(10);
        pdf.text(`  Quiz ${index + course.settings.quizCount + 1}: ${score}/${maxScore} (${percentage}%)`, 35, yPos);
        yPos += 8;
      }
    });
    
    pdf.setFontSize(10);
    pdf.text(`  Quiz Component: ${finalsQuizAdjusted.toFixed(2)} points`, 35, yPos);
    yPos += 12;
    
    // Exam details
    const finalsExamAdjusted = calculateAdjustedExam(
      course.finalsState.examScore || 0,
      course.finalsState.examMaxScore || 100
    );
    
    pdf.setFontSize(12);
    if (course.finalsState.examScore !== null) {
      const examPct = course.finalsState.examMaxScore 
        ? ((course.finalsState.examScore / course.finalsState.examMaxScore) * 100).toFixed(1)
        : '0';
      pdf.text(`Major Exam: ${course.finalsState.examScore}/${course.finalsState.examMaxScore} (${examPct}%)`, 30, yPos);
      yPos += 8;
      pdf.setFontSize(10);
      pdf.text(`  Exam Component: ${finalsExamAdjusted.toFixed(2)} points`, 35, yPos);
      yPos += 12;
    }
    
    pdf.setFontSize(12);
    pdf.text(`Attendance: ${course.finalsState.attendance}/10 (${course.finalsState.attendance}%)`, 30, yPos);
    yPos += 8;
    pdf.setFontSize(10);
    pdf.text(`  Attendance Component: ${(course.finalsState.attendance || 0).toFixed(2)} points`, 35, yPos);
    yPos += 12;
    
    pdf.setFontSize(12);
    pdf.text(`Problem Set: ${course.finalsState.problemSet}/10 (${course.finalsState.problemSet}%)`, 30, yPos);
    yPos += 8;
    pdf.setFontSize(10);
    pdf.text(`  Problem Set Component: ${(course.finalsState.problemSet || 0).toFixed(2)} points`, 35, yPos);
    yPos += 15;
    
    pdf.setFontSize(14);
    pdf.text(`Finals Total: ${formatFinalGrade(finalsGrade)}`, 30, yPos);
    yPos += 25;
    
    // Final Results
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(18);
    pdf.text('Final Grade Calculation', 20, yPos);
    pdf.setTextColor(0, 0, 0);
    yPos += 15;
    
    pdf.setFontSize(12);
    pdf.text(`Midterm (30%): ${formatFinalGrade(midtermGrade)} × 0.30 = ${(midtermGrade * 0.3).toFixed(2)}`, 30, yPos);
    yPos += 12;
    pdf.text(`Finals (70%): ${formatFinalGrade(finalsGrade)} × 0.70 = ${(finalsGrade * 0.7).toFixed(2)}`, 30, yPos);
    yPos += 15;
    
    pdf.setTextColor(...successColor);
    pdf.setFontSize(16);
    pdf.text(`Final Grade: ${formatFinalGrade(finalGrade)}`, 30, yPos);
    yPos += 12;
    pdf.text(`GPE: ${gpe}`, 30, yPos);
    pdf.setTextColor(0, 0, 0);
    
    // Add footer
    const pageHeight = pdf.internal.pageSize.height;
    pdf.setDrawColor(...primaryColor);
    pdf.setLineWidth(0.3);
    pdf.line(20, pageHeight - 20, 190, pageHeight - 20);
    
    pdf.setTextColor(...secondaryColor);
    pdf.setFontSize(10);
    pdf.text('Developed by @09sychic', 20, pageHeight - 12);
    pdf.text(`Generated from ${window.location.host}`, 20, pageHeight - 6);
    
    // Use Outfit font if available
    pdf.setFont('helvetica');
    
    // Save the PDF
    pdf.save(`${course.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_grade_report.pdf`);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw new Error('Failed to generate PDF transcript');
  }
};

export const exportCalculationAsImage = async (elementId: string, filename: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }
    
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
    });
    
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL();
    link.click();
  } catch (error) {
    console.error('Failed to export as image:', error);
    throw new Error('Failed to export calculation as image');
  }
};