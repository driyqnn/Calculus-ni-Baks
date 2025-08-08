import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage: React.FC = () => {
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
            <h1 className="text-4xl font-bold text-primary mb-4">About Grade Calculator</h1>
            <p className="text-lg text-muted-foreground">
              A comprehensive grade calculation tool designed specifically for Civil Engineering students
            </p>
          </header>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Overview</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  The Grade Calculator is a specialized tool built to help Civil Engineering students 
                  track their academic progress throughout the semester. It provides real-time 
                  calculation of grades based on the standard Philippine academic grading system.
                </p>
                <p>
                  This calculator supports multiple courses, customizable quiz counts, and provides 
                  detailed mathematical breakdowns of grade calculations to ensure transparency 
                  and accuracy.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Key Features</h2>
              <div className="bg-muted/30 p-6 rounded-lg">
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li>Multi-course support with individual grade tracking</li>
                  <li>Customizable quiz count per grading period (1-5 quizzes)</li>
                  <li>Real-time grade calculation with live preview</li>
                  <li>Target grade setting with required score calculations</li>
                  <li>Mathematical formula visualization using LaTeX</li>
                  <li>PDF transcript generation and data export</li>
                  <li>Responsive design for desktop and mobile devices</li>
                  <li>Font size adjustment for accessibility</li>
                  <li>Dark/Light theme support</li>
                  <li>Local data storage for offline access</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Grading System</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  This calculator follows the standard Philippine academic grading system with 
                  the following weight distribution:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border border-border rounded p-4">
                    <h3 className="font-semibold mb-2">Per Grading Period:</h3>
                    <ul className="space-y-1">
                      <li>Quiz: 35%</li>
                      <li>Major Exam: 45%</li>
                      <li>Attendance: 10%</li>
                      <li>Problem Set: 10%</li>
                    </ul>
                  </div>
                  <div className="border border-border rounded p-4">
                    <h3 className="font-semibold mb-2">Final Grade:</h3>
                    <ul className="space-y-1">
                      <li>Midterm Period: 30%</li>
                      <li>Finals Period: 70%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Technology Stack</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>Built with modern web technologies for optimal performance and user experience:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Frontend:</strong> React 18 with TypeScript</li>
                  <li><strong>Styling:</strong> Tailwind CSS with custom design system</li>
                  <li><strong>UI Components:</strong> shadcn/ui component library</li>
                  <li><strong>Math Rendering:</strong> KaTeX for LaTeX mathematical expressions</li>
                  <li><strong>PDF Generation:</strong> jsPDF for transcript exports</li>
                  <li><strong>Build Tool:</strong> Vite for fast development and building</li>
                  <li><strong>State Management:</strong> React hooks with local storage persistence</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Developer Information</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                 <p>
                   <strong>Developer:</strong> @09sychic<br />
                   <strong>Contact:</strong> 
                   <a 
                     href="https://m.me/09sychicc" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-primary hover:underline ml-2"
                   >
                     Facebook Messenger
                   </a>
                 </p>
                <p>
                  This project was developed as a tool to help fellow Civil Engineering students 
                  manage their academic progress more effectively. The calculator is designed 
                  to be accurate, user-friendly, and accessible across all devices.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Version History</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">Version 2.0 (Current)</h3>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Added multi-course support</li>
                    <li>Implemented live calculation preview</li>
                    <li>Added font size adjustment</li>
                    <li>Enhanced mobile responsiveness</li>
                    <li>Added comprehensive documentation pages</li>
                    <li>Improved PDF export functionality</li>
                  </ul>
                </div>
                <div className="border-l-4 border-muted-foreground pl-4">
                  <h3 className="font-semibold">Version 1.0</h3>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Initial release with basic grade calculation</li>
                    <li>Single course tracking</li>
                    <li>Basic PDF export</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">License & Usage</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  This Grade Calculator is provided as a free educational tool for students. 
                  While calculations are designed to be accurate according to standard academic 
                  grading systems, users should always verify final grades with their official 
                  academic records.
                </p>
                <p>
                  The tool is provided "as is" without warranty of any kind. The developer is 
                  not responsible for any academic decisions made based on the calculations 
                  provided by this tool.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;