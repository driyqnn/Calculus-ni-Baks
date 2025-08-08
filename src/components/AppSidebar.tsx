import React, { useState } from "react";
import { Settings, Target, Sliders, Calculator, Plus, Minus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FontSizeSlider from "./FontSizeSlider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseData, AppSettings } from "@/utils/storage";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { calculateAdjustedQuiz, calculateAdjustedExam } from "@/utils/calculationUtils";

import { generatePDFTranscript } from "@/utils/pdfGenerator";

interface AppSidebarProps {
  activeCourse: CourseData | null;
  appSettings: AppSettings;
  currentMidterm: number;
  currentFinals: number;
  onCourseUpdate: (course: CourseData) => void;
  onTargetGradeChange: (newTarget: number) => void;
  onSettingsChange: (settings: AppSettings) => void;
}

export function AppSidebar({
  activeCourse,
  appSettings,
  currentMidterm,
  currentFinals,
  onCourseUpdate,
  onTargetGradeChange,
  onSettingsChange,
}: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!activeCourse) {
    return (
      <Sidebar className={`${collapsed ? "w-14" : "w-72 xl:w-80"} bg-black border-r border-gray-800`} collapsible="icon">
        <SidebarContent className="text-white bg-black">
          <div className="p-4 text-center text-gray-400">
            <Settings className="w-8 h-8 mx-auto mb-2" />
            {!collapsed && <p>Select a course to configure settings</p>}
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  // Configuration handlers with real-time updates
  const handleQuizCountChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= 5) {
      // Calculate remaining weight after other components
      const otherWeights = activeCourse.settings.examWeight + 
                          activeCourse.settings.attendanceWeight + 
                          activeCourse.settings.problemSetWeight;
      const remainingWeight = 1 - otherWeights;
      const quizWeightPerQuiz = Math.max(0, remainingWeight / newCount);
      
      const updatedCourse = {
        ...activeCourse,
        settings: {
          ...activeCourse.settings,
          quizCount: newCount,
          quizWeights: Array(newCount).fill(quizWeightPerQuiz)
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
      onCourseUpdate(updatedCourse);
    }
  };

  const handleFontSizeChange = (fontSize: number) => {
    onSettingsChange({ ...appSettings, fontSize });
    
    // Apply font size immediately to root element
    const root = document.documentElement;
    root.style.setProperty('--dynamic-font-size', `${fontSize}rem`);
  };

  const handleWeightChange = (weightType: string, value: number) => {
    const newWeight = value / 100; // Convert percentage to decimal
    
    // If changing midterm/finals weight, ensure they add up to 100%
    if (weightType === 'midtermWeight') {
      const updatedCourse = {
        ...activeCourse,
        settings: {
          ...activeCourse.settings,
          midtermWeight: newWeight,
          finalsWeight: 1 - newWeight
        }
      };
      onCourseUpdate(updatedCourse);
    } else if (weightType === 'finalsWeight') {
      const updatedCourse = {
        ...activeCourse,
        settings: {
          ...activeCourse.settings,
          finalsWeight: newWeight,
          midtermWeight: 1 - newWeight
        }
      };
      onCourseUpdate(updatedCourse);
    } else {
      // For component weights, recalculate quiz weights
      const updatedSettings = {
        ...activeCourse.settings,
        [weightType]: newWeight
      };
      
      // Calculate remaining weight for quizzes
      const otherWeights = updatedSettings.examWeight + 
                          updatedSettings.attendanceWeight + 
                          updatedSettings.problemSetWeight;
      const remainingWeight = Math.max(0, 1 - otherWeights);
      const quizWeightPerQuiz = remainingWeight / updatedSettings.quizCount;
      
      const updatedCourse = {
        ...activeCourse,
        settings: {
          ...updatedSettings,
          quizWeights: Array(updatedSettings.quizCount).fill(quizWeightPerQuiz)
        }
      };
      onCourseUpdate(updatedCourse);
    }
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDFTranscript(activeCourse);
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const formatValue = (value: number | null | undefined): string => {
    return value !== null && value !== undefined ? value.toString() : "0";
  };

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-72 xl:w-80"} bg-black border-r border-gray-800`} collapsible="icon">
      <SidebarContent className="p-2 space-y-4 text-white bg-black">
        {!collapsed && (
          <>
            {/* Quick Status */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Quick Status
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="p-3 space-y-3 text-sm">
                  <div className="bg-muted/30 p-3 rounded">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Midterm:</span>
                        <span className="font-mono font-medium">{currentMidterm.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Finals:</span>
                        <span className="font-mono font-medium">{currentFinals.toFixed(1)}%</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Final Grade:</span>
                        <span className="font-mono">{(currentMidterm * activeCourse.settings.midtermWeight + currentFinals * activeCourse.settings.finalsWeight).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Configuration Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                Configuration
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="p-3 space-y-4">
                  {/* Quiz Count */}
                  <div>
                    <Label className="text-sm font-medium">Quizzes per Period</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuizCountChange(activeCourse.settings.quizCount - 1)}
                        disabled={activeCourse.settings.quizCount <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{activeCourse.settings.quizCount}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuizCountChange(activeCourse.settings.quizCount + 1)}
                        disabled={activeCourse.settings.quizCount >= 5}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Period Weight Configuration */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Period Weights</Label>
                    <div className="space-y-3">
                      {/* Midterm Weight */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Midterm:</span>
                          <span className="text-xs font-mono">{Math.round(activeCourse.settings.midtermWeight * 100)}%</span>
                        </div>
                        <Slider
                          value={[activeCourse.settings.midtermWeight * 100]}
                          onValueChange={(value) => handleWeightChange('midtermWeight', value[0])}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      
                      {/* Finals Weight */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Finals:</span>
                          <span className="text-xs font-mono">{Math.round(activeCourse.settings.finalsWeight * 100)}%</span>
                        </div>
                        <Slider
                          value={[activeCourse.settings.finalsWeight * 100]}
                          onValueChange={(value) => handleWeightChange('finalsWeight', value[0])}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Component Weight Configuration */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Component Weights</Label>
                    <div className="space-y-3">
                      {/* Exam Weight */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Exam:</span>
                          <span className="text-xs font-mono">{Math.round(activeCourse.settings.examWeight * 100)}%</span>
                        </div>
                        <Slider
                          value={[activeCourse.settings.examWeight * 100]}
                          onValueChange={(value) => handleWeightChange('examWeight', value[0])}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      
                      {/* Attendance Weight */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Attendance:</span>
                          <span className="text-xs font-mono">{Math.round(activeCourse.settings.attendanceWeight * 100)}%</span>
                        </div>
                        <Slider
                          value={[activeCourse.settings.attendanceWeight * 100]}
                          onValueChange={(value) => handleWeightChange('attendanceWeight', value[0])}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      
                      {/* Problem Set Weight */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Problem Set:</span>
                          <span className="text-xs font-mono">{Math.round(activeCourse.settings.problemSetWeight * 100)}%</span>
                        </div>
                        <Slider
                          value={[activeCourse.settings.problemSetWeight * 100]}
                          onValueChange={(value) => handleWeightChange('problemSetWeight', value[0])}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="bg-muted/20 p-2 rounded text-[10px] text-muted-foreground mt-2">
                      <div className="mb-1"><strong>Note:</strong> Quiz weight is automatically calculated: {Math.round((activeCourse.settings.quizWeights.reduce((sum, w) => sum + w, 0)) * 100)}%</div>
                      <div className="mb-1">Quizzes per period can be configured below (1-5 range)</div>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Target Grade Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Target Grade
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="p-3">
                  <Label className="text-sm font-medium">Target Grade (%)</Label>
                  <Input
                    type="number"
                    value={activeCourse.settings.targetGrade}
                    onChange={(e) => onTargetGradeChange(Number(e.target.value))}
                    min={60}
                    max={100}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Set your desired final grade (60-100%)
                  </p>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* GWA Calculator Promotion */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                More Tools
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="p-3">
                  <a
                    href="https://gwa-calculator-ni-baks.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gwa-promo-button gwa-promo-pulse block w-full p-3 text-center text-sm font-bold"
                  >
                    🎯 Try GWA Calculator!
                    <div className="text-xs opacity-90 mt-1">Calculate your General Weighted Average</div>
                  </a>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* App Settings Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                App Settings
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="p-3 space-y-4">
                  {/* Font Size Slider */}
                  <FontSizeSlider
                    fontSize={appSettings.fontSize}
                    onChange={handleFontSizeChange}
                  />

                  {/* Export Options */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Export</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleGeneratePDF}
                      disabled={isGeneratingPDF}
                    >
                      {isGeneratingPDF ? 'Generating...' : 'Download PDF Report'}
                    </Button>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}