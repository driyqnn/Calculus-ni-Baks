import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Plus, 
  Minus,
  Download,
  History,
  LayoutGrid,
  ChevronUp,
  Image as ImageIcon,
  Share2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import GradingPeriod from "./GradingPeriod";
import CourseSelector from "./CourseSelector";
import FormulasPanel from "./FormulasPanel";
import CalculationPreview from "./CalculationPreview";
import ScoreInput from "./ScoreInput";
import { 
  calculatePeriodGrade, 
  calculateFinalGrade, 
  calculateGPE, 
  getGradeColor,
  naturalRound
} from "@/utils/calculationUtils";
import { 
  CourseData, 
  loadCourses, 
  saveCourse, 
  getActiveCourseId, 
  setActiveCourseId,
  createDefaultCourse
} from "@/utils/storage";
import { generateImageTranscript } from "@/utils/imageExport";

const ModernGradeCalculator: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [activeCourseId, setActiveCourseIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [periodTab, setPeriodTab] = useState("midterm");
  const [showCalculations, setShowCalculations] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const activeCourse = courses.find(c => c.id === activeCourseId);

  useEffect(() => {
    const init = async () => {
      const savedCourses = loadCourses();
      const savedActiveId = getActiveCourseId();
      
      if (savedCourses.length === 0) {
        const defaultCourse = createDefaultCourse("General Calculus");
        setCourses([defaultCourse]);
        setActiveCourseIdState(defaultCourse.id);
        setActiveCourseId(defaultCourse.id);
        saveCourse(defaultCourse);
      } else {
        setCourses(savedCourses);
        const idToSet = savedActiveId && savedCourses.find(c => c.id === savedActiveId) 
          ? savedActiveId 
          : savedCourses[0].id;
        setActiveCourseIdState(idToSet);
        setActiveCourseId(idToSet);
      }
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading || !activeCourse) return <div className="p-8 text-center animate-pulse">Initializing Grade Engine...</div>;

  const periodWeights = {
    quiz: activeCourse.settings.quizWeight || 0.35,
    exam: activeCourse.settings.examWeight || 0.45,
    attendance: activeCourse.settings.attendanceWeight || 0.1,
    problemSet: activeCourse.settings.problemSetWeight || 0.1
  };

  const midtermGrade = calculatePeriodGrade(
    activeCourse.midtermState.quizScores,
    activeCourse.midtermState.quizMaxScores,
    activeCourse.midtermState.examScore,
    activeCourse.midtermState.examMaxScore,
    activeCourse.midtermState.attendance,
    activeCourse.midtermState.problemSet,
    periodWeights
  );

  const finalsGrade = calculatePeriodGrade(
    activeCourse.finalsState.quizScores,
    activeCourse.finalsState.quizMaxScores,
    activeCourse.finalsState.examScore,
    activeCourse.finalsState.examMaxScore,
    activeCourse.finalsState.attendance,
    activeCourse.finalsState.problemSet,
    periodWeights
  );

  const finalGrade = calculateFinalGrade(
    midtermGrade, 
    finalsGrade, 
    activeCourse.settings.midtermWeight, 
    activeCourse.settings.finalsWeight
  );
  const gpe = calculateGPE(finalGrade);
  const gradeColor = getGradeColor(finalGrade);

  const updateCourse = (updatedCourse: CourseData) => {
    const updatedCourses = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    setCourses(updatedCourses);
    saveCourse(updatedCourse);
  };

  const handleInputChange = (period: 'midterm' | 'finals', field: string, value: number | null, index?: number) => {
    const updatedCourse = { ...activeCourse };
    const periodState = period === 'midterm' ? updatedCourse.midtermState : updatedCourse.finalsState;

    if (index !== undefined && (field === 'quizScores' || field === 'quizMaxScores')) {
      const arr = [...(periodState[field as 'quizScores' | 'quizMaxScores'])];
      arr[index] = value;
      (periodState as any)[field] = arr;
    } else {
      (periodState as Record<string, any>)[field] = value;
    }
    updateCourse(updatedCourse);
  };

  const handleWeightChange = (weightType: string, value: number) => {
    const newWeight = value / 100;
    const updatedCourse = { ...activeCourse };
    
    if (weightType === 'midtermWeight') {
      updatedCourse.settings.midtermWeight = newWeight;
      updatedCourse.settings.finalsWeight = Math.max(0, 1 - newWeight);
    } else if (weightType === 'finalsWeight') {
      updatedCourse.settings.finalsWeight = newWeight;
      updatedCourse.settings.midtermWeight = Math.max(0, 1 - newWeight);
    } else if (weightType === 'quizWeight') {
      updatedCourse.settings.quizWeight = newWeight;
      updatedCourse.settings.examWeight = Math.max(0, 0.8 - newWeight);
    } else if (weightType === 'examWeight') {
      updatedCourse.settings.examWeight = newWeight;
      updatedCourse.settings.quizWeight = Math.max(0, 0.8 - newWeight);
    }
    updateCourse(updatedCourse);
  };

  const handleAddQuiz = (period: 'midterm' | 'finals') => {
    const updatedCourse = { ...activeCourse };
    const periodState = period === 'midterm' ? updatedCourse.midtermState : updatedCourse.finalsState;
    if (periodState.quizScores.length >= 10) return;
    periodState.quizScores.push(null);
    periodState.quizMaxScores.push(100);
    updateCourse(updatedCourse);
  };

  const handleRemoveQuiz = (period: 'midterm' | 'finals', index: number) => {
    const updatedCourse = { ...activeCourse };
    const periodState = period === 'midterm' ? updatedCourse.midtermState : updatedCourse.finalsState;
    if (periodState.quizScores.length <= 1) return;
    periodState.quizScores.splice(index, 1);
    periodState.quizMaxScores.splice(index, 1);
    updateCourse(updatedCourse);
  };

  const handleSaveImage = async () => {
    setIsExporting(true);
    try {
      await generateImageTranscript(activeCourse);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Sticky Header Status */}
      <header className="w-full bg-background/60 backdrop-blur-xl border-b border-white/5 p-4 shrink-0">
        <div className="max-w-md mx-auto flex items-center justify-between lg:max-w-none">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Live Grade</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${gradeColor} tabular-nums tracking-tighter lg:text-5xl`}>{naturalRound(finalGrade)}</span>
              <span className="text-xs font-bold text-muted-foreground/50">%</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 flex-1 justify-center px-12">
             <div className="flex flex-col items-center">
               <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Midterm</span>
               <span className="font-mono text-xl font-bold">{midtermGrade.toFixed(1)}%</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Finals</span>
               <span className="font-mono text-xl font-bold">{finalsGrade.toFixed(1)}%</span>
             </div>
             <div className="w-full max-w-xs space-y-1">
               <Progress value={finalGrade} className="h-1.5" />
               <div className="flex justify-between text-[8px] font-black uppercase opacity-40"><span>0</span><span>Progress</span><span>100</span></div>
             </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Scale GPE</span>
            <span className={`text-2xl font-black ${gradeColor} tabular-nums tracking-tighter lg:text-3xl`}>{gpe}</span>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <main className="p-4 lg:p-12 pb-32">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                  <LayoutGrid className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight leading-none lg:text-4xl">{activeCourse.name}</h1>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Stream</span>
                </div>
              </div>

              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip defaultOpen>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleSaveImage} disabled={isExporting} className="rounded-xl w-12 h-12 border-white/10 active:scale-95 transition-transform bg-primary/10 hover:bg-primary/20">
                        <Share2 className={`w-5 h-5 text-primary ${isExporting ? 'animate-pulse' : ''}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary text-white font-black text-[10px] rounded-lg">WANT TO SHARE YOUR GRADES? SAVE IMAGE</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-xl w-12 h-12 bg-muted/50 border-white/5">
                      <Settings className="w-6 h-6" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="rounded-t-xl border-white/5 h-[90vh]">
                    <DrawerHeader><DrawerTitle className="text-center font-black uppercase tracking-widest text-xs">Configuration</DrawerTitle></DrawerHeader>
                    <ScrollArea className="p-8 h-full">
                      <div className="max-w-md mx-auto space-y-12 pb-20">
                        <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Subject Registry</Label>
                          <CourseSelector courses={courses} activeCourseId={activeCourseId} onCourseSelect={(id) => { setActiveCourseIdState(id); setActiveCourseId(id); }} onCourseCreate={(c) => setCourses([...courses, c])} onCourseDelete={(id) => setCourses(courses.filter(c => c.id !== id))} onCourseUpdate={(c) => setCourses(courses.map(cur => cur.id === c.id ? c : cur))} />
                        </div>

                        <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Target Achievement</Label>
                          <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 text-center space-y-6">
                            <div className="text-6xl font-black text-primary tabular-nums tracking-tighter">{activeCourse.settings.targetGrade}%</div>
                            <div className="flex items-center justify-center gap-8">
                              <Button variant="outline" size="icon" className="rounded-full w-14 h-14 border-white/10" onClick={() => updateCourse({...activeCourse, settings: {...activeCourse.settings, targetGrade: activeCourse.settings.targetGrade - 1}})}><Minus className="w-5 h-5" /></Button>
                              <Button variant="outline" size="icon" className="rounded-full w-14 h-14 border-white/10" onClick={() => updateCourse({...activeCourse, settings: {...activeCourse.settings, targetGrade: activeCourse.settings.targetGrade + 1}})}><Plus className="w-5 h-5" /></Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Ratio Balance</Label>
                          <Card className="rounded-xl border-white/5 bg-muted/20">
                            <CardContent className="p-6 space-y-8">
                              <div className="space-y-5">
                                <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase">Midterm</span><span className="text-xs font-mono font-black">{Math.round(activeCourse.settings.midtermWeight * 100)}%</span></div>
                                <Slider value={[activeCourse.settings.midtermWeight * 100]} max={100} min={0} step={5} onValueChange={(v) => handleWeightChange('midtermWeight', v[0])} />
                                <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase">Finals</span><span className="text-xs font-mono font-black">{Math.round(activeCourse.settings.finalsWeight * 100)}%</span></div>
                                <Slider value={[activeCourse.settings.finalsWeight * 100]} max={100} min={0} step={5} onValueChange={(v) => handleWeightChange('finalsWeight', v[0])} />
                              </div>
                              <Separator className="bg-white/5" />
                              <div className="space-y-5">
                                <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-primary">Quizzes</span><span className="text-xs font-mono font-black">{Math.round((activeCourse.settings.quizWeight || 0.35) * 100)}%</span></div>
                                <Slider value={[(activeCourse.settings.quizWeight || 0.35) * 100]} max={80} min={0} step={5} onValueChange={(v) => handleWeightChange('quizWeight', v[0])} />
                                <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-purple-400">Exams</span><span className="text-xs font-mono font-black">{Math.round((activeCourse.settings.examWeight || 0.45) * 100)}%</span></div>
                                <Slider value={[(activeCourse.settings.examWeight || 0.45) * 100]} max={80} min={0} step={5} onValueChange={(v) => handleWeightChange('examWeight', v[0])} />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <Button variant="outline" className="w-full h-16 rounded-xl font-black uppercase tracking-widest text-[10px] gap-2"><History className="w-4 h-4" /> Reset Course Data</Button>
                      </div>
                    </ScrollArea>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            <Tabs value={periodTab} onValueChange={setPeriodTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-xl h-16 border border-white/5 lg:max-w-sm">
                <TabsTrigger value="midterm" className="rounded-lg text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-background data-[state=active]:text-primary transition-all">Midterm</TabsTrigger>
                <TabsTrigger value="finals" className="rounded-lg text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-background data-[state=active]:text-primary transition-all">Finals</TabsTrigger>
              </TabsList>
              
              <div className="mt-12 lg:grid lg:grid-cols-[1fr_400px] lg:gap-16">
                <div className="space-y-12">
                  <TabsContent value="midterm" className="m-0 focus-visible:outline-none">
                    <GradingPeriod periodName="Midterm" quizScores={activeCourse.midtermState.quizScores} quizMaxScores={activeCourse.midtermState.quizMaxScores} examScore={activeCourse.midtermState.examScore} examMaxScore={activeCourse.midtermState.examMaxScore} periodGrade={midtermGrade} onChange={(f, v, i) => handleInputChange('midterm', f, v, i)} onAddQuiz={() => handleAddQuiz('midterm')} onRemoveQuiz={(i) => handleRemoveQuiz('midterm', i)} onShowCalc={() => setShowCalculations(!showCalculations)} />
                  </TabsContent>
                  <TabsContent value="finals" className="m-0 focus-visible:outline-none">
                    <GradingPeriod periodName="Finals" quizScores={activeCourse.finalsState.quizScores} quizMaxScores={activeCourse.finalsState.quizMaxScores} examScore={activeCourse.finalsState.examScore} examMaxScore={activeCourse.finalsState.examMaxScore} periodGrade={finalsGrade} onChange={(f, v, i) => handleInputChange('finals', f, v, i)} onAddQuiz={() => handleAddQuiz('finals')} onRemoveQuiz={(i) => handleRemoveQuiz('finals', i)} onShowCalc={() => setShowCalculations(!showCalculations)} />
                  </TabsContent>
                </div>

                <div className="space-y-10">
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 px-2">
                      <div className="w-1 h-6 bg-primary rounded-full" />
                      <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">General Metrics</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <ScoreInput label="Attendance (Max 10)" score={periodTab === 'midterm' ? activeCourse.midtermState.attendance : activeCourse.finalsState.attendance} onScoreChange={(v) => handleInputChange(periodTab as 'midterm' | 'finals', 'attendance', v)} placeholder="0" showMaxScore={false} maxValue={10} />
                      <ScoreInput label="Problem Sets (Max 10)" score={periodTab === 'midterm' ? activeCourse.midtermState.problemSet : activeCourse.finalsState.problemSet} onScoreChange={(v) => handleInputChange(periodTab as 'midterm' | 'finals', 'problemSet', v)} placeholder="0" showMaxScore={false} maxValue={10} />
                    </div>
                  </section>

                  <Collapsible open={showCalculations} onOpenChange={setShowCalculations} className="w-full">
                    <CollapsibleContent className="space-y-4 animate-accordion-down overflow-hidden">
                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 lg:p-10 relative">
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Live Proof</h3>
                          <Button variant="ghost" size="icon" onClick={() => setShowCalculations(false)} className="rounded-full hover:bg-primary/10"><ChevronUp className="w-4 h-4" /></Button>
                        </div>
                        <CalculationPreview midtermState={activeCourse.midtermState} finalsState={activeCourse.finalsState} grades={{midterm: midtermGrade, finals: finalsGrade, finalGrade}} quizCount={activeCourse.settings.quizCount} activeCourse={activeCourse} />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </Tabs>
          </div>
        </main>
      </ScrollArea>
    </div>
  );
};

export default ModernGradeCalculator;
