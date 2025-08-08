import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GradingPeriod from "./GradingPeriod";
import CalculationPreview from "./CalculationPreview";
import CourseSelector from "./CourseSelector";
import { AppSidebar } from "./AppSidebar";
import { Calculator, AlertCircle, Settings, ChevronRight, Plus, Minus, ChevronDown, Info, Heart, Brain, Clock, Users, Award, Lightbulb, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/components/ui/sidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import {
  calculatePeriodGrade,
  calculateFinalGrade,
  calculateGPE,
  getGradeColor,
  formatFinalGrade,
  calculatePointsNeeded,
  naturalRound,
} from "@/utils/calculationUtils";
import {
  CourseData,
  AppSettings,
  loadCourses,
  saveCourse,
  deleteCourse,
  getActiveCourseId,
  setActiveCourseId,
  loadAppSettings,
  saveAppSettings,
  createDefaultCourse,
} from "@/utils/storage";

const GradeCalculator: React.FC = () => {
  // Core state
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [activeCourseId, setActiveCourseIdState] = useState<string | null>(null);
  const [appSettings, setAppSettings] = useState<AppSettings>({
    fontSize: 1.0,
    theme: 'system',
    defaultTargetGrade: 75
  });
  const [isLoading, setIsLoading] = useState(true);

  
  const { toggleSidebar, state } = useSidebar();

  // Derived state
  const activeCourse = courses.find(c => c.id === activeCourseId);

  // Validation state
  const [errors, setErrors] = useState<{
    midterm: { [key: string]: string | null };
    finals: { [key: string]: string | null };
  }>({
    midterm: {},
    finals: {},
  });

  // Calculated grades
  const [grades, setGrades] = useState({
    midterm: 0,
    finals: 0,
    finalGrade: 0,
    gpe: "N/A",
  });

  // Points needed to reach target
  const [pointsNeeded, setPointsNeeded] = useState({
    midtermNeeded: null as number | null,
    finalsNeeded: null as number | null,
    isPossible: true,
  });
  
  // Enhanced UI state
  const [showDetailedInfo, setShowDetailedInfo] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedCourses = loadCourses();
        const savedActiveId = getActiveCourseId();
        const savedSettings = loadAppSettings();

        setCourses(savedCourses);
        setAppSettings(savedSettings);

        // Set active course or create default if none exist
        if (savedCourses.length === 0) {
          const defaultCourse = createDefaultCourse("My Course");
          setCourses([defaultCourse]);
          setActiveCourseIdState(defaultCourse.id);
          setActiveCourseId(defaultCourse.id);
          saveCourse(defaultCourse);
        } else if (savedActiveId && savedCourses.find(c => c.id === savedActiveId)) {
          setActiveCourseIdState(savedActiveId);
        } else {
          setActiveCourseIdState(savedCourses[0].id);
          setActiveCourseId(savedCourses[0].id);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        console.error('Failed to load saved data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply font size setting
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--dynamic-font-size', `${appSettings.fontSize}rem`);
  }, [appSettings.fontSize]);

  // Check if there are any validation errors
  const hasErrors = () => {
    return (
      Object.values(errors.midterm).some((error) => error !== null) ||
      Object.values(errors.finals).some((error) => error !== null)
    );
  };

  // Validate inputs
  const validateInput = (
    value: number | null,
    field: string,
    max: number = 100
  ): string | null => {
    if (value === null) return null;
    if (isNaN(Number(value))) return "Must be a number";
    if (value < 0) return "Cannot be negative";
    if (field.includes("attendance") || field.includes("problemSet")) {
      if (value > 10) return "Maximum is 10";
    } else if (value > max) {
      return `Maximum is ${max}`;
    }
    return null;
  };

  // Handle changes to midterm inputs with validation
  const handleMidtermChange = (
    field: string,
    value: number | null,
    index?: number
  ) => {
    if (!activeCourse) return;

    // Validate the input
    let error: string | null = null;
    let maxValue = 100;

    if (field === "quizScores" && index !== undefined) {
      maxValue = activeCourse.midtermState.quizMaxScores[index] || 100;
    } else if (field === "examScore") {
      maxValue = activeCourse.midtermState.examMaxScore || 100;
    }

    error = validateInput(value, field, maxValue);

    // Update errors state
    setErrors((prev) => ({
      ...prev,
      midterm: {
        ...prev.midterm,
        [index !== undefined ? `${field}${index}` : field]: error,
      },
    }));

    // Update the course state
    const updatedCourse = { ...activeCourse };
    if (index !== undefined && (field === "quizScores" || field === "quizMaxScores")) {
      const newArray = [...updatedCourse.midtermState[field]];
      newArray[index] = value;
      updatedCourse.midtermState = {
        ...updatedCourse.midtermState,
        [field]: newArray,
      };
    } else {
      updatedCourse.midtermState = {
        ...updatedCourse.midtermState,
        [field]: value,
      };
    }

    // Update courses and save
    const updatedCourses = courses.map(c => c.id === activeCourse.id ? updatedCourse : c);
    setCourses(updatedCourses);
    saveCourse(updatedCourse);
  };

  // Handle changes to finals inputs with validation
  const handleFinalsChange = (
    field: string,
    value: number | null,
    index?: number
  ) => {
    if (!activeCourse) return;

    // Validate the input
    let error: string | null = null;
    let maxValue = 100;

    if (field === "quizScores" && index !== undefined) {
      maxValue = activeCourse.finalsState.quizMaxScores[index] || 100;
    } else if (field === "examScore") {
      maxValue = activeCourse.finalsState.examMaxScore || 100;
    }

    error = validateInput(value, field, maxValue);

    // Update errors state
    setErrors((prev) => ({
      ...prev,
      finals: {
        ...prev.finals,
        [index !== undefined ? `${field}${index}` : field]: error,
      },
    }));

    // Update the course state
    const updatedCourse = { ...activeCourse };
    if (index !== undefined && (field === "quizScores" || field === "quizMaxScores")) {
      const newArray = [...updatedCourse.finalsState[field]];
      newArray[index] = value;
      updatedCourse.finalsState = {
        ...updatedCourse.finalsState,
        [field]: newArray,
      };
    } else {
      updatedCourse.finalsState = {
        ...updatedCourse.finalsState,
        [field]: value,
      };
    }

    // Update courses and save
    const updatedCourses = courses.map(c => c.id === activeCourse.id ? updatedCourse : c);
    setCourses(updatedCourses);
    saveCourse(updatedCourse);
  };

  // Calculate grades whenever the active course changes
  useEffect(() => {
    if (!activeCourse || hasErrors()) {
      return;
    }

    // Calculate midterm grade
    const midtermGrade = calculatePeriodGrade(
      activeCourse.midtermState.quizScores.filter((score): score is number => score !== null),
      activeCourse.midtermState.quizMaxScores.filter((max): max is number => max !== null),
      activeCourse.midtermState.examScore || 0,
      activeCourse.midtermState.examMaxScore || 100,
      activeCourse.midtermState.attendance || 10,
      activeCourse.midtermState.problemSet || 10
    );

    // Calculate finals grade
    const finalsGrade = calculatePeriodGrade(
      activeCourse.finalsState.quizScores.filter((score): score is number => score !== null),
      activeCourse.finalsState.quizMaxScores.filter((max): max is number => max !== null),
      activeCourse.finalsState.examScore || 0,
      activeCourse.finalsState.examMaxScore || 100,
      activeCourse.finalsState.attendance || 10,
      activeCourse.finalsState.problemSet || 10
    );

    // Calculate final grade and GPE
    const finalGrade = calculateFinalGrade(midtermGrade, finalsGrade);
    const gpe = calculateGPE(finalGrade);

    setGrades({
      midterm: midtermGrade,
      finals: finalsGrade,
      finalGrade: finalGrade,
      gpe: gpe,
    });

    // Calculate points needed to reach target
    const needed = calculatePointsNeeded(midtermGrade, finalsGrade, activeCourse.settings.targetGrade);
    setPointsNeeded(needed);
  }, [activeCourse, errors]);

  // Course management handlers
  const handleCourseSelect = (courseId: string) => {
    setActiveCourseIdState(courseId);
    setActiveCourseId(courseId);
  };

  const handleCourseCreate = (course: CourseData) => {
    setCourses([...courses, course]);
    setActiveCourseIdState(course.id);
    setActiveCourseId(course.id);
    saveCourse(course);
    console.log(`Course created: ${course.name}`);
  };

  const handleCourseDelete = (courseId: string) => {
    const courseToDelete = courses.find(c => c.id === courseId);
    const updatedCourses = courses.filter(c => c.id !== courseId);
    setCourses(updatedCourses);
    deleteCourse(courseId);

    // Set new active course if the deleted one was active
    if (activeCourseId === courseId) {
      if (updatedCourses.length > 0) {
        setActiveCourseIdState(updatedCourses[0].id);
        setActiveCourseId(updatedCourses[0].id);
      } else {
        // Create a new default course if none exist
        const newCourse = createDefaultCourse("My Course");
        setCourses([newCourse]);
        setActiveCourseIdState(newCourse.id);
        setActiveCourseId(newCourse.id);
        saveCourse(newCourse);
      }
    }

    console.log(`Course deleted: ${courseToDelete?.name}`);
  };

  const handleCourseUpdate = (updatedCourse: CourseData) => {
    const updatedCourses = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    setCourses(updatedCourses);
    saveCourse(updatedCourse);
    console.log(`Course updated: ${updatedCourse.name}`);
  };

  const handleTargetGradeChange = (newTarget: number) => {
    if (!activeCourse) return;
    
    const updatedCourse = {
      ...activeCourse,
      settings: {
        ...activeCourse.settings,
        targetGrade: newTarget
      }
    };
    
    handleCourseUpdate(updatedCourse);
  };

  const handleAppSettingsChange = (newSettings: AppSettings) => {
    setAppSettings(newSettings);
    saveAppSettings(newSettings);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!activeCourse) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <CourseSelector
          courses={courses}
          activeCourseId={activeCourseId}
          onCourseSelect={handleCourseSelect}
          onCourseCreate={handleCourseCreate}
          onCourseDelete={handleCourseDelete}
          onCourseUpdate={handleCourseUpdate}
        />
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No course selected. Please create or select a course.</p>
        </div>
      </div>
    );
  }

  // Generate quiz numbers for display
  const midtermQuizNumbers = Array.from({ length: activeCourse.settings.quizCount }, (_, i) => i + 1);
  const finalsQuizNumbers = Array.from({ length: activeCourse.settings.quizCount }, (_, i) => i + 1 + activeCourse.settings.quizCount);

  return (
    <div className="flex w-full max-w-none">
      {/* Sidebar */}
      <AppSidebar
        activeCourse={activeCourse}
        appSettings={appSettings}
        currentMidterm={grades.midterm}
        currentFinals={grades.finals}
        onCourseUpdate={handleCourseUpdate}
        onTargetGradeChange={handleTargetGradeChange}
        onSettingsChange={handleAppSettingsChange}
      />

      {/* Main Content */}
      <div className="flex-1 w-full animate-fade-in min-w-0">
        {/* Course Selector */}
        <div className="mb-6">
          <CourseSelector
            courses={courses}
            activeCourseId={activeCourseId}
            onCourseSelect={handleCourseSelect}
            onCourseCreate={handleCourseCreate}
            onCourseDelete={handleCourseDelete}
            onCourseUpdate={handleCourseUpdate}
          />
          
          {/* Enhanced Configuration Notice */}
          <div className="mt-4 relative">
            <Alert className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 dark:border-orange-700">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <AlertDescription className="text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <strong className="text-orange-800 dark:text-orange-200 font-semibold">Configure First!</strong>
                        <span className="text-orange-700 dark:text-orange-300 ml-2">
                          Before entering scores, configure your quiz settings, exam maximum scores, and target grade in the sidebar.
                        </span>
                      </div>
                      <Button
                        onClick={toggleSidebar}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-orange-300 hover:bg-orange-100 dark:border-orange-600 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                      >
                        <Settings className="h-4 w-4" />
                        {state === "collapsed" ? "Open Settings" : "View Settings"}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>

          {/* Comprehensive Information Panel */}
          <TooltipProvider>
            <div className="mt-4 space-y-4">
              {/* Quick Disclaimer */}
              <Alert className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-700">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                          <strong className="font-semibold">Important:</strong>
                          <span className="ml-2">
                            Calculations are estimates. Your professor may curve grades, use different weightings, or have specific policies.
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDetailedInfo(!showDetailedInfo)}
                          className="flex items-center gap-2 border-blue-300 hover:bg-blue-100 dark:border-blue-600 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        >
                          <Info className="h-4 w-4" />
                          {showDetailedInfo ? "Less Info" : "More Info"}
                          <ChevronDown className={`h-4 w-4 transition-transform ${showDetailedInfo ? 'rotate-180' : ''}`} />
                        </Button>
                      </div>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>

              {/* Detailed Information Panel */}
              <Collapsible open={showDetailedInfo} onOpenChange={setShowDetailedInfo}>
                <CollapsibleContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Academic Context */}
                    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-amber-800 dark:text-amber-200">
                          <BookOpen className="h-5 w-5" />
                          Academic Context
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-amber-700 dark:text-amber-300">
                        <div>
                          <strong>Grading Variations:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                            <li>Grade curves (bell curves, set percentages)</li>
                            <li>Bonus points and extra credit opportunities</li>
                            <li>Attendance/participation adjustments</li>
                            <li>Late penalty policies and makeup options</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Institution Policies:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                            <li>Grade replacement (retaking exams/courses)</li>
                            <li>Pass/fail vs. letter grade options</li>
                            <li>Academic standing and probation thresholds</li>
                            <li>Withdrawal deadlines and impact on GPA</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Success & Support Resources */}
                  <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-green-800 dark:text-green-200">
                        <Heart className="h-5 w-5" />
                        Academic Support & Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-green-700 dark:text-green-300">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <strong>When Struggling:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                            <li>Visit professor during office hours</li>
                            <li>Form or join study groups</li>
                            <li>Utilize tutoring services</li>
                            <li>Seek academic advising support</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Mental Health Matters:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                            <li>Campus counseling services</li>
                            <li>Stress management workshops</li>
                            <li>Academic accommodations office</li>
                            <li>Peer support networks</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

            </div>
          </TooltipProvider>

          {/* Quiz Configuration */}
          <div className="mt-4">
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-foreground">Quizzes per Period</Label>
                  <p className="text-xs text-muted-foreground mt-1">Configure how many quizzes per grading period (1-5)</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newCount = Math.max(1, activeCourse.settings.quizCount - 1);
                      if (newCount !== activeCourse.settings.quizCount) {
                        const updatedCourse = {
                          ...activeCourse,
                          settings: {
                            ...activeCourse.settings,
                            quizCount: newCount,
                            quizWeights: Array(newCount).fill(activeCourse.settings.quizWeights.reduce((a,b) => a+b, 0) / newCount)
                          },
                          midtermState: {
                            ...activeCourse.midtermState,
                            quizScores: Array(newCount).fill(null).map((_, i) => 
                              activeCourse.midtermState.quizScores[i] || null
                            ),
                            quizMaxScores: Array(newCount).fill(100).map((_, i) => 
                              activeCourse.midtermState.quizMaxScores[i] || 100
                            ),
                          },
                          finalsState: {
                            ...activeCourse.finalsState,
                            quizScores: Array(newCount).fill(null).map((_, i) => 
                              activeCourse.finalsState.quizScores[i] || null
                            ),
                            quizMaxScores: Array(newCount).fill(100).map((_, i) => 
                              activeCourse.finalsState.quizMaxScores[i] || 100
                            ),
                          },
                        };
                        handleCourseUpdate(updatedCourse);
                      }
                    }}
                    disabled={activeCourse.settings.quizCount <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{activeCourse.settings.quizCount}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newCount = Math.min(5, activeCourse.settings.quizCount + 1);
                      if (newCount !== activeCourse.settings.quizCount) {
                        const updatedCourse = {
                          ...activeCourse,
                          settings: {
                            ...activeCourse.settings,
                            quizCount: newCount,
                            quizWeights: Array(newCount).fill(activeCourse.settings.quizWeights.reduce((a,b) => a+b, 0) / newCount)
                          },
                          midtermState: {
                            ...activeCourse.midtermState,
                            quizScores: Array(newCount).fill(null).map((_, i) => 
                              activeCourse.midtermState.quizScores[i] || null
                            ),
                            quizMaxScores: Array(newCount).fill(100).map((_, i) => 
                              activeCourse.midtermState.quizMaxScores[i] || 100
                            ),
                          },
                          finalsState: {
                            ...activeCourse.finalsState,
                            quizScores: Array(newCount).fill(null).map((_, i) => 
                              activeCourse.finalsState.quizScores[i] || null
                            ),
                            quizMaxScores: Array(newCount).fill(100).map((_, i) => 
                              activeCourse.finalsState.quizMaxScores[i] || 100
                            ),
                          },
                        };
                        handleCourseUpdate(updatedCourse);
                      }
                    }}
                    disabled={activeCourse.settings.quizCount >= 5}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contextual Performance Alerts */}
        {grades.finalGrade !== 0 && (
          <div className="mb-6">
            {grades.finalGrade < 60 && (
              <Alert className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 dark:border-red-700">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  <strong>Academic Alert:</strong> Your current grade is below passing. Consider reaching out to your professor, 
                  joining study groups, or visiting the academic success center for support strategies.
                </AlertDescription>
              </Alert>
            )}
            {grades.finalGrade >= 85 && (
              <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  <strong>Excellent Progress!</strong> You're performing very well. Keep up the great work and consider 
                  helping classmates who might be struggling.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Grading Periods with Context Tooltips */}
        <TooltipProvider>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Midterm Period</h3>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="text-sm">
                      Enter your scores as you receive them. Missing scores are treated as 0 in calculations. 
                      You can adjust quiz counts in the sidebar settings.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <GradingPeriod
                periodName="Midterm"
                quizNumbers={midtermQuizNumbers}
                quizScores={activeCourse.midtermState.quizScores}
                quizMaxScores={activeCourse.midtermState.quizMaxScores}
                examScore={activeCourse.midtermState.examScore}
                examMaxScore={activeCourse.midtermState.examMaxScore}
                attendance={activeCourse.midtermState.attendance}
                problemSet={activeCourse.midtermState.problemSet}
                periodGrade={grades.midterm}
                onChange={handleMidtermChange}
                errors={errors.midterm}
                quizCount={activeCourse.settings.quizCount}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Finals Period</h3>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="text-sm">
                      Plan ahead! Use target grades to see what scores you need. 
                      Remember that some professors may offer makeup opportunities.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <GradingPeriod
                periodName="Finals"
                quizNumbers={finalsQuizNumbers}
                quizScores={activeCourse.finalsState.quizScores}
                quizMaxScores={activeCourse.finalsState.quizMaxScores}
                examScore={activeCourse.finalsState.examScore}
                examMaxScore={activeCourse.finalsState.examMaxScore}
                attendance={activeCourse.finalsState.attendance}
                problemSet={activeCourse.finalsState.problemSet}
                periodGrade={grades.finals}
                onChange={handleFinalsChange}
                errors={errors.finals}
                quizCount={activeCourse.settings.quizCount}
              />
            </div>
          </div>
        </TooltipProvider>

        {/* Scores Needed to Pass Section */}
        <div className="calculator-card mt-8">
          <div className="card-header border-b border-border">
            Scores Needed to Pass ({activeCourse.settings.targetGrade}%)
          </div>
          <div className="calculator-body">
            <div className="text-sm text-muted-foreground mb-4">
              Based on your current grades, here's what final score you need to
              achieve your target grade ({activeCourse.settings.targetGrade}%):
            </div>

            {pointsNeeded.midtermNeeded !== null && (
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <div className="font-medium mb-1">Midterm Score Needed:</div>
                <div className="text-xl font-bold text-yellow-500">
                  {pointsNeeded.isPossible
                    ? `${naturalRound(pointsNeeded.midtermNeeded)}% overall score`
                    : "Not possible with current finals grade"}
                </div>
                {pointsNeeded.isPossible && (
                  <div className="text-sm mt-1 text-muted-foreground">
                    You need to achieve this score in your midterm period to reach
                    your target grade.
                  </div>
                )}
              </div>
            )}

            {pointsNeeded.finalsNeeded !== null && (
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <div className="font-medium mb-1">Finals Score Needed:</div>
                <div className="text-xl font-bold text-yellow-500">
                  {pointsNeeded.isPossible
                    ? `${naturalRound(pointsNeeded.finalsNeeded)}% overall score`
                    : "Not possible with current midterm grade"}
                </div>
                {pointsNeeded.isPossible && (
                  <div className="text-sm mt-1 text-muted-foreground">
                    You need to achieve this score in your finals period to reach
                    your target grade.
                  </div>
                )}
              </div>
            )}

            {pointsNeeded.midtermNeeded === null && pointsNeeded.finalsNeeded === null && (
              <div
                className={`p-4 rounded-lg mb-4 ${
                  grades.finalGrade >= activeCourse.settings.targetGrade
                    ? "bg-green-800/20"
                    : "bg-destructive/20"
                }`}>
                <div className="font-medium mb-1">Current Status:</div>
                <div
                  className={`text-xl font-bold ${
                    grades.finalGrade >= activeCourse.settings.targetGrade
                      ? "text-green-500"
                      : "text-destructive"
                  }`}>
                  {grades.finalGrade >= activeCourse.settings.targetGrade
                    ? "You are currently passing!"
                    : `You need to improve your overall grade by ${Math.ceil(
                        activeCourse.settings.targetGrade - grades.finalGrade
                      )}% to pass.`}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Final Results */}
        <div className="calculator-card mt-8">
          <div className="card-header border-b border-border">Final Results</div>
          <div className="calculator-body grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grade-result">
              <h3>Final Grade</h3>
              <div
                className={`grade-value text-2xl ${getGradeColor(
                  grades.finalGrade
                )}`}>
                {formatFinalGrade(grades.finalGrade)}
              </div>
            </div>
            <div className="grade-result">
              <h3>Grade Point Equivalent (GPE)</h3>
              <div
                className={`grade-value text-2xl ${getGradeColor(
                  grades.finalGrade
                )}`}>
                {grades.gpe}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="calculator-card mt-8 text-center">
          <div className="calculator-body">
            <p className="text-sm text-muted-foreground mb-4">
              Calculations update automatically as you type
            </p>
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                Have suggestions to improve the calculator? We'd love to hear from you!
              </p>
              <Link 
                to="/feedback" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Share Your Feedback
              </Link>
            </div>
          </div>
        </div>

        {/* Show Calculation Button */}
        <div className="mt-6">
          <Button
            onClick={() => setShowCalculation(!showCalculation)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-3 text-base font-medium border-primary/20 hover:bg-primary/5"
          >
            <Calculator className="h-5 w-5" />
            {showCalculation ? "Hide Calculation" : "Show Calculation"}
            <ChevronDown className={`h-4 w-4 transition-transform ${showCalculation ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Collapsible Calculation Preview */}
        <Collapsible open={showCalculation} onOpenChange={setShowCalculation}>
          <CollapsibleContent>
            <CalculationPreview 
              midtermState={activeCourse.midtermState}
              finalsState={activeCourse.finalsState}
              grades={grades}
              quizCount={activeCourse.settings.quizCount}
              activeCourse={activeCourse}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default GradeCalculator;