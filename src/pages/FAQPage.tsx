import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, GraduationCap, BookOpen, Users, Lightbulb, Download, Smartphone, FileText, BarChart3, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Calculator
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground">Everything you need to know about the Grade Calculator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FAQ Categories */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Quick Navigation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="#basics" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Basic Usage
                  </a>
                  <a href="#calculations" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Calculations
                  </a>
                  <a href="#features" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </a>
                  <a href="#technical" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Technical
                  </a>
                  <a href="#troubleshooting" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Troubleshooting
                  </a>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="font-medium text-primary flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export Regularly
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Back up your data weekly using the PDF or JSON export
                    </p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="font-medium text-primary flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Add to Home Screen
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Install as a web app for quick access
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Basic Usage Section */}
            <section id="basics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Basic Usage
                  </CardTitle>
                  <CardDescription>
                    Getting started with the Grade Calculator
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="getting-started">
                      <AccordionTrigger>How do I start using the calculator?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Getting started is simple:</p>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>Open the Grade Calculator in your browser</li>
                          <li>Create a new course using the course selector dropdown</li>
                          <li>Enter your quiz scores and exam results</li>
                          <li>The calculator automatically computes your grades in real-time</li>
                          <li>Use the sidebar to adjust settings and view calculations</li>
                        </ol>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500" />
                            First Time Tip
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Start with one course to familiarize yourself with the interface before adding more
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="multiple-courses">
                      <AccordionTrigger>Can I track multiple courses at once?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Absolutely! The calculator supports unlimited courses:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Each course has its own independent grade tracking</li>
                          <li>Switch between courses using the dropdown menu</li>
                          <li>Customize quiz count per course (1-5 quizzes per period)</li>
                          <li>Export data for each course separately</li>
                          <li>Delete courses you no longer need</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">Perfect for tracking all your subjects throughout the semester!</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-safety">
                      <AccordionTrigger>Is my data safe? Where is it stored?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p><strong>Your data is completely private and secure:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>All data is stored locally in your browser (no cloud storage)</li>
                          <li>No personal information is collected or transmitted</li>
                          <li>Works offline after initial load</li>
                          <li>Only you can access your grade data</li>
                        </ul>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Important
                          </p>
                          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                            Clearing browser data will delete all your grades. Export regularly as backup!
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* Calculations Section */}
            <section id="calculations">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-primary" />
                    Grade Calculations
                  </CardTitle>
                  <CardDescription>
                    Understanding how your grades are calculated
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="grading-system">
                      <AccordionTrigger>What grading system does this use?</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p>The calculator follows the standard Philippine academic grading system:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border border-border rounded-lg">
                            <h4 className="font-semibold mb-2">Per Grading Period</h4>
                            <ul className="text-sm space-y-1">
                              <li>Quiz: 35%</li>
                              <li>Major Exam: 45%</li>
                              <li>Attendance: 10%</li>
                              <li>Problem Set: 10%</li>
                            </ul>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <h4 className="font-semibold mb-2">Final Grade</h4>
                            <ul className="text-sm space-y-1">
                              <li>Midterm: 30%</li>
                              <li>Finals: 70%</li>
                            </ul>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This is the most common system used in Philippine universities and colleges.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="accuracy">
                      <AccordionTrigger>How accurate are the calculations?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>The calculations are mathematically precise, but accuracy depends on:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Correct data entry:</strong> Ensure all scores and maximums are accurate</li>
                          <li><strong>Institutional variations:</strong> Some schools may use slightly different formulas</li>
                          <li><strong>Additional factors:</strong> Some courses include extra credit or curve adjustments</li>
                          <li><strong>Rounding differences:</strong> Professors might round at different calculation stages</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          Always verify final grades with your official academic records.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="50-point-adjustment">
                      <AccordionTrigger>What is the 50-point adjustment?</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p>The 50-point adjustment is a standard academic formula that converts raw scores to adjusted grades:</p>
                        <div className="p-4 bg-muted/30 rounded-lg font-mono text-center">
                          <p className="text-lg">Adjusted Score = (Raw Score × 0.5) + 50</p>
                        </div>
                        <div className="space-y-2">
                          <p><strong>Examples:</strong></p>
                          <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                            <li>100% raw → 100 adjusted (100 × 0.5 + 50)</li>
                            <li>80% raw → 90 adjusted (80 × 0.5 + 50)</li>
                            <li>60% raw → 80 adjusted (60 × 0.5 + 50)</li>
                          </ul>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This adjustment makes the grading system more forgiving and is applied to quiz and exam scores.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="target-grades">
                      <AccordionTrigger>How does the "Scores Needed to Pass" feature work?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>This feature calculates what grades you need in remaining periods to achieve your target:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Set your target grade</strong> in the sidebar (default: 75%)</li>
                          <li><strong>Required scores</strong> are calculated for incomplete periods</li>
                          <li><strong>Feasibility check</strong> tells you if your target is still achievable</li>
                          <li><strong>Strategic planning</strong> helps you focus on important assessments</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          The calculations consider the 30%/70% weight distribution between midterm and finals.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* Features Section */}
            <section id="features">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Features & Tools
                  </CardTitle>
                  <CardDescription>
                    Making the most of the calculator's features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="export-options">
                      <AccordionTrigger>What export options are available?</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p>The calculator offers multiple export formats:</p>
                        <div className="space-y-4">
                          <div className="p-4 border border-border rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              PDF Transcript
                            </h4>
                            <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                              <li>Professional formatted grade report</li>
                              <li>Includes all calculations and mathematical breakdowns</li>
                              <li>Perfect for sharing with advisors or keeping records</li>
                              <li>Shows course information and grade distribution</li>
                            </ul>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              JSON Data Export
                            </h4>
                            <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                              <li>Raw data backup in structured format</li>
                              <li>Can be imported back into the calculator</li>
                              <li>Useful for data analysis or transferring between devices</li>
                              <li>Contains all course data and settings</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="customization">
                      <AccordionTrigger>Can I customize the calculator settings?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Yes! The calculator offers several customization options:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li><strong>Quiz Count:</strong> Set 1-5 quizzes per grading period for each course</li>
                          <li><strong>Font Size:</strong> Choose from Small, Medium, or Large text</li>
                          <li><strong>Theme:</strong> Switch between Light and Dark modes</li>
                          <li><strong>Target Grades:</strong> Set custom passing grade targets</li>
                          <li><strong>Course Names:</strong> Use descriptive names for easy identification</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          All settings are saved automatically and persist between sessions.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="mobile-features">
                      <AccordionTrigger>Does it work well on mobile devices?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Absolutely! The calculator is fully optimized for mobile use:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Responsive design that adapts to any screen size</li>
                          <li>Touch-friendly interface with appropriate button sizes</li>
                          <li>Collapsible sidebar for better mobile navigation</li>
                          <li>Font size adjustment for better readability</li>
                          <li>Works offline after initial load</li>
                          <li>Can be installed as a web app ("Add to Home Screen")</li>
                        </ul>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-200 flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Mobile Tip
                          </p>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                            Install as a web app for quick access from your home screen!
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* Technical Section */}
            <section id="technical">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-primary" />
                    Technical Questions
                  </CardTitle>
                  <CardDescription>
                    Technical aspects and troubleshooting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="browser-compatibility">
                      <AccordionTrigger>Which browsers are supported?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>The calculator works on all modern browsers:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Desktop:</strong> Chrome, Firefox, Safari, Edge (latest versions)</li>
                          <li><strong>Mobile:</strong> Safari (iOS), Chrome (Android), Samsung Internet</li>
                          <li><strong>Requirements:</strong> JavaScript enabled, localStorage support</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          For the best experience, use an updated browser with JavaScript enabled.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="offline-usage">
                      <AccordionTrigger>Can I use it offline?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Yes! The calculator works offline after the initial load:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>All calculations happen locally in your browser</li>
                          <li>No internet connection required for basic functionality</li>
                          <li>Data is stored locally and persists offline</li>
                          <li>PDF generation works offline</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          Only the initial page load requires an internet connection.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-limits">
                      <AccordionTrigger>Are there any usage limits?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>The calculator has minimal limitations:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Courses:</strong> No hard limit (depends on browser storage)</li>
                          <li><strong>Data Storage:</strong> Limited by browser's localStorage capacity (~5-10MB)</li>
                          <li><strong>Performance:</strong> Optimized for typical student use (10-20 courses)</li>
                          <li><strong>Quiz Count:</strong> 1-5 quizzes per grading period per course</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          For normal academic use, you won't encounter any practical limitations.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* Troubleshooting Section */}
            <section id="troubleshooting">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    Troubleshooting
                  </CardTitle>
                  <CardDescription>
                    Common issues and solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="data-loss">
                      <AccordionTrigger>I lost my data! How can I recover it?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Data loss can happen if browser storage is cleared. Prevention is key:</p>
                        <div className="space-y-4">
                          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm font-medium text-red-800 dark:text-red-200">❌ Data Recovery</p>
                            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                              Unfortunately, once browser data is cleared, it cannot be recovered without a backup.
                            </p>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">✅ Prevention</p>
                            <ul className="text-xs text-green-700 dark:text-green-300 mt-1 list-disc list-inside space-y-1">
                              <li>Export your data weekly using the JSON export feature</li>
                              <li>Download PDF transcripts for important milestones</li>
                              <li>Avoid clearing browser data or using incognito mode</li>
                              <li>Consider using the same browser consistently</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="calculation-errors">
                      <AccordionTrigger>My grades don't match my professor's calculations</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Differences can occur for several reasons:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li><strong>Input Errors:</strong> Double-check all entered scores and maximums</li>
                          <li><strong>Different Weights:</strong> Your course might use different percentage distributions</li>
                          <li><strong>Additional Components:</strong> Extra credit, participation, or other factors</li>
                          <li><strong>Rounding Differences:</strong> Professors might round at different stages</li>
                          <li><strong>Manual Adjustments:</strong> Curve adjustments or bonus points</li>
                        </ul>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Solution
                          </p>
                          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                            Use the calculator as a guide, but always refer to your syllabus and official grades for authoritative information.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="zero-scores">
                      <AccordionTrigger>Why are some scores showing as zero?</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Zero scores usually indicate incomplete or invalid data entry:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Empty Fields:</strong> Blank score fields are treated as zero</li>
                          <li><strong>Invalid Maximums:</strong> Maximum scores must be greater than zero</li>
                          <li><strong>Missing Pairs:</strong> Both score and maximum must be entered</li>
                          <li><strong>Invalid Values:</strong> Check for negative numbers or non-numeric entries</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          The calculator ignores entries where either score or maximum is missing/invalid.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="performance-issues">
                      <AccordionTrigger>The calculator is running slowly</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p>Performance issues are rare but can be resolved:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Browser Cache:</strong> Clear browser cache and reload the page</li>
                          <li><strong>Too Many Courses:</strong> Consider archiving old courses by exporting data</li>
                          <li><strong>Browser Memory:</strong> Close other tabs or restart your browser</li>
                          <li><strong>Device Storage:</strong> Ensure your device has adequate free storage</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          The calculator is optimized for performance, but very large datasets might slow it down.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Calculator
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/feedback" className="text-muted-foreground hover:text-primary transition-colors">
                Feedback
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Developed by{" "}
              <a
                href="https://m.me/09sychicc"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                @09sychic
              </a>
              {" · "}
              <span className="text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQPage;