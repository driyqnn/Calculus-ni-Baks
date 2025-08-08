import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const CalculationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculator
            </Button>
          </Link>
        </div>

        <div className="font-mono space-y-8">
          <header className="border-b border-border pb-6">
            <h1 className="text-4xl font-bold text-primary mb-4">Calculation Methods</h1>
            <p className="text-lg text-muted-foreground">
              Detailed explanation of the mathematical formulas used in grade calculations
            </p>
          </header>

          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Overview</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  The Grade Calculator uses the standard Philippine academic grading system 
                  with specific weight distributions and adjustment formulas to ensure 
                  accurate grade calculations.
                </p>
                <p>
                  All calculations are performed using precise mathematical formulas that 
                  account for the relative importance of different assessment components.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Grade Computation Formula</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-6 text-sm">
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">QUIZ (35%)</h3>
                    <div className="overflow-x-auto">
                      <BlockMath>
                        {`\\left( 
                            \\left( \\frac{Q_1}{Q_{1\\_max}} + \\frac{Q_2}{Q_{2\\_max}} \\right) \\div 2 \\times 100 \\times 0.5 + 50
                        \\right) \\times 0.35`}
                      </BlockMath>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-lg">MAJOR EXAM (45%)</h3>
                    <div className="overflow-x-auto">
                      <BlockMath>
                        {`\\left(
                            \\frac{\\text{MajorExamScore}}{\\text{MajorExamMax}} \\times 100 \\times 0.75 + 50
                        \\right) \\times 0.45`}
                      </BlockMath>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-lg">ATTENDANCE (10%)</h3>
                    <div className="overflow-x-auto">
                      <BlockMath>
                        {`\\left(
                            \\frac{\\text{AttendanceScore}}{\\text{AttendanceMax}} \\times 100
                        \\right) \\times 0.10`}
                      </BlockMath>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-lg">PROBLEM SET (10%)</h3>
                    <div className="overflow-x-auto">
                      <BlockMath>
                        {`\\left(
                            \\frac{\\text{ProblemSetScore}}{\\text{ProblemSetMax}} \\times 100
                        \\right) \\times 0.10`}
                      </BlockMath>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-lg">FINAL GRADE COMPUTATION</h3>
                    <div className="overflow-x-auto">
                      <BlockMath>
                        {`\\text{MidtermGrade} \\times 0.30 + \\text{FinalGrade} \\times 0.70`}
                      </BlockMath>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="border border-border rounded p-4">
                    <h3 className="font-semibold mb-2">Component Weights:</h3>
                    <ul className="space-y-1">
                      <li>Quiz: 35%</li>
                      <li>Major Exam: 45%</li>
                      <li>Attendance: 10%</li>
                      <li>Problem Set: 10%</li>
                    </ul>
                  </div>
                  <div className="border border-border rounded p-4">
                    <h3 className="font-semibold mb-2">Final Grade Weights:</h3>
                    <ul className="space-y-1">
                      <li>Midterm Period: 30%</li>
                      <li>Finals Period: 70%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Quiz Score Calculation</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-6 text-sm">
                <h3 className="font-semibold">Step 1: Calculate Individual Quiz Ratios</h3>
                <p>For each quiz, calculate the ratio of score to maximum points:</p>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Quiz Ratio}_i = \\frac{\\text{Quiz Score}_i}{\\text{Max Score}_i}`}
                  </BlockMath>
                </div>

                <h3 className="font-semibold">Step 2: Calculate Average Quiz Ratio</h3>
                <p>Find the average of all quiz ratios:</p>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Average Ratio} = \\frac{\\sum_{i=1}^{n} \\text{Quiz Ratio}_i}{n}`}
                  </BlockMath>
                </div>

                <h3 className="font-semibold">Step 3: Apply Adjustment Formula</h3>
                <p>Convert the average ratio to adjusted score using the 50-point adjustment:</p>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Adjusted Quiz Score} = (\\text{Average Ratio} \\times 50) + 50`}
                  </BlockMath>
                </div>

                <div className="border-l-4 border-accent pl-4 bg-accent/10 p-4 rounded">
                  <h4 className="font-semibold mb-2">Example Calculation:</h4>
                  <p>Given quiz scores: 85/100, 90/100, 78/100</p>
                  <div className="space-y-2 mt-2">
                    <p>Quiz ratios: 0.85, 0.90, 0.78</p>
                    <p>Average ratio: (0.85 + 0.90 + 0.78) ÷ 3 = 0.8433</p>
                    <p>Adjusted score: (0.8433 × 50) + 50 = 92.17</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Exam Score Calculation</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-6 text-sm">
                <h3 className="font-semibold">Step 1: Calculate Exam Ratio</h3>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Exam Ratio} = \\frac{\\text{Exam Score}}{\\text{Max Score}}`}
                  </BlockMath>
                </div>

                <h3 className="font-semibold">Step 2: Apply Adjustment Formula</h3>
                <p>Similar to quiz calculation, apply the 50-point adjustment:</p>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Adjusted Exam Score} = (\\text{Exam Ratio} \\times 50) + 50`}
                  </BlockMath>
                </div>

                <div className="border-l-4 border-accent pl-4 bg-accent/10 p-4 rounded">
                  <h4 className="font-semibold mb-2">Example Calculation:</h4>
                  <p>Given exam score: 78/100</p>
                  <div className="space-y-2 mt-2">
                    <p>Exam ratio: 78 ÷ 100 = 0.78</p>
                    <p>Adjusted score: (0.78 × 50) + 50 = 89.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Attendance and Problem Set</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-6 text-sm">
                <p>
                  Attendance and Problem Set scores are used directly without adjustment, 
                  as they are typically already in the 0-10 point scale.
                </p>
                
                <h3 className="font-semibold">Attendance Score</h3>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Attendance Component} = \\text{Attendance Score (\\%)`}
                  </BlockMath>
                </div>

                <h3 className="font-semibold">Problem Set Score</h3>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Problem Set Component} = \\text{Problem Set Score} \\times 0.10`}
                  </BlockMath>
                </div>

                <div className="border-l-4 border-accent pl-4 bg-accent/10 p-4 rounded">
                  <h4 className="font-semibold mb-2">Typical Scoring:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Perfect attendance: 10 points</li>
                    <li>Perfect problem set: 10 points</li>
                    <li>Each component contributes 10% to the period grade</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Final Grade Calculation</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-6 text-sm">
                <p>
                  The final grade combines both grading periods with different weights to 
                  reflect the increased importance of the finals period.
                </p>

                <h3 className="font-semibold">Formula</h3>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Final Grade} = (\\text{Midterm Grade} \\times 0.30) + (\\text{Finals Grade} \\times 0.70)`}
                  </BlockMath>
                </div>

                <div className="border-l-4 border-accent pl-4 bg-accent/10 p-4 rounded">
                  <h4 className="font-semibold mb-2">Complete Example:</h4>
                  <div className="space-y-2">
                    <p><strong>Midterm Period:</strong></p>
                    <p>• Quiz (adjusted): 92.17 × 0.35 = 32.26</p>
                    <p>• Exam (adjusted): 89.00 × 0.45 = 40.05</p>
                    <p>• Attendance: 10.00</p>
                    <p>• Problem Set: 9.00</p>
                    <p><strong>Midterm Total: 74.21</strong></p>
                    
                    <p className="mt-4"><strong>Finals Period:</strong></p>
                    <p>• Quiz (adjusted): 88.50 × 0.35 = 30.98</p>
                    <p>• Exam (adjusted): 91.00 × 0.45 = 40.95</p>
                    <p>• Attendance: 10.00</p>
                    <p>• Problem Set: 10.00</p>
                    <p><strong>Finals Total: 73.93</strong></p>
                    
                    <p className="mt-4"><strong>Final Grade:</strong></p>
                    <p>(74.21 × 0.30) + (73.93 × 0.70) = 22.26 + 51.75 = <strong>74.01</strong></p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Grade Point Equivalent (GPE)</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-6 text-sm">
                <p>
                  The Grade Point Equivalent converts the numerical grade to the 
                  standard 4.0 GPA scale used in Philippine universities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border rounded p-4">
                    <h3 className="font-semibold mb-2">Grade Scale:</h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>97-100:</span><span>1.00 (Excellent)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>94-96:</span><span>1.25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>91-93:</span><span>1.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>88-90:</span><span>1.75</span>
                      </div>
                      <div className="flex justify-between">
                        <span>85-87:</span><span>2.00 (Good)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>82-84:</span><span>2.25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>79-81:</span><span>2.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>76-78:</span><span>2.75</span>
                      </div>
                      <div className="flex justify-between">
                        <span>75:</span><span>3.00 (Passing)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>&lt;75:</span><span>5.00 (Failed)</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-border rounded p-4">
                    <h3 className="font-semibold mb-2">Calculation Logic:</h3>
                    <div className="space-y-2 text-xs">
                      <p>The GPE is determined by checking which range the final grade falls into:</p>
                      <div className="bg-background p-2 rounded font-mono">
                        if (grade ≥ 97) return "1.00"<br />
                        else if (grade ≥ 94) return "1.25"<br />
                        else if (grade ≥ 91) return "1.50"<br />
                        // ... and so on
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Target Grade Calculations</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-6 text-sm">
                <p>
                  The calculator can determine what scores you need in remaining assessments 
                  to achieve your target grade.
                </p>

                <h3 className="font-semibold">Required Finals Score</h3>
                <p>If you want to know what finals grade you need:</p>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Required Finals} = \\frac{\\text{Target} - (\\text{Midterm} \\times 0.30)}{0.70}`}
                  </BlockMath>
                </div>

                <h3 className="font-semibold">Required Midterm Score</h3>
                <p>If you want to know what midterm grade you need:</p>
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`\\text{Required Midterm} = \\frac{\\text{Target} - (\\text{Finals} \\times 0.70)}{0.30}`}
                  </BlockMath>
                </div>

                <div className="border-l-4 border-accent pl-4 bg-accent/10 p-4 rounded">
                  <h4 className="font-semibold mb-2">Example:</h4>
                  <p>Target grade: 75, Current midterm: 74.21</p>
                  <div className="space-y-2 mt-2">
                    <p>Required finals: (75 - (74.21 × 0.30)) ÷ 0.70</p>
                    <p>Required finals: (75 - 22.26) ÷ 0.70 = 75.34</p>
                    <p>You need a finals grade of 75.34 to achieve your target.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Implementation Notes</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <h3 className="font-semibold">Precision and Rounding</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All calculations use JavaScript's native floating-point arithmetic</li>
                  <li>Results are typically displayed to 2 decimal places</li>
                  <li>Internal calculations maintain full precision until display</li>
                  <li>Final grades are rounded using standard mathematical rounding</li>
                </ul>

                <h3 className="font-semibold">Error Handling</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Invalid inputs (non-numeric, negative, exceeding maximums) are flagged</li>
                  <li>Missing quiz scores are excluded from average calculations</li>
                  <li>Division by zero scenarios are handled gracefully</li>
                  <li>Impossible target grades are identified and reported</li>
                </ul>

                <h3 className="font-semibold">Real-time Updates</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All calculations update instantly as you enter data</li>
                  <li>The live preview shows intermediate calculation steps</li>
                  <li>Target grade requirements update automatically</li>
                  <li>All formulas are recalculated on any input change</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CalculationsPage;