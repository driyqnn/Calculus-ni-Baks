import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Settings, 
  Target, 
  BookOpen, 
  Plus, 
  Minus,
  Download,
  History,
  LayoutGrid,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  FileText,
  ShieldCheck,
  User,
  MoreVertical,
  Cpu,
  Boxes,
  FileCode,
  GraduationCap
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
import GradingPeriod from "./GradingPeriod";
import CourseSelector from "./CourseSelector";
import FormulasPanel from "./FormulasPanel";
import CalculationPreview from "./CalculationPreview";
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

const ModernGradeCalculator: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [activeCourseId, setActiveCourseIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainTab, setMainTab] = useState("calculator");
  const [periodTab, setPeriodTab] = useState("midterm");
  const [isCalcDrawerOpen, setIsCalcDrawerOpen] = useState(false);

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

  const midtermGrade = calculatePeriodGrade(
    activeCourse.midtermState.quizScores.filter((s): s is number => s !== null),
    activeCourse.midtermState.quizMaxScores,
    activeCourse.midtermState.examScore || 0,
    activeCourse.midtermState.examMaxScore,
    activeCourse.midtermState.attendance || 0,
    activeCourse.midtermState.problemSet || 0
  );

  const finalsGrade = calculatePeriodGrade(
    activeCourse.finalsState.quizScores.filter((s): s is number => s !== null),
    activeCourse.finalsState.quizMaxScores,
    activeCourse.finalsState.examScore || 0,
    activeCourse.finalsState.examMaxScore,
    activeCourse.finalsState.attendance || 0,
    activeCourse.finalsState.problemSet || 0
  );

  const finalGrade = calculateFinalGrade(midtermGrade, finalsGrade);
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
      updatedCourse.settings.finalsWeight = 1 - newWeight;
    } else if (weightType === 'finalsWeight') {
      updatedCourse.settings.finalsWeight = newWeight;
      updatedCourse.settings.midtermWeight = 1 - newWeight;
    } else if (weightType === 'quizWeight') {
      updatedCourse.settings.quizWeight = newWeight;
      updatedCourse.settings.examWeight = Math.max(0, 0.8 - newWeight); // Assume Quiz + Exam = 80% default block
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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans pb-24">
      <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl border-b border-white/5 p-4 safe-top">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Overall Grade</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${gradeColor} tabular-nums tracking-tighter`}>{naturalRound(finalGrade)}</span>
              <span className="text-xs font-bold text-muted-foreground/50">%</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Scale GPE</span>
            <span className={`text-2xl font-black ${gradeColor} tabular-nums tracking-tighter`}>{gpe}</span>
          </div>
        </div>
        <div className="max-w-md mx-auto mt-4 overflow-hidden rounded-full bg-white/5 h-1.5">
          <div className={`h-full transition-all duration-700 ease-out rounded-full ${gradeColor.replace('text-', 'bg-')}`} style={{ width: `${Math.min(100, finalGrade)}%` }} />
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto p-4">
        {mainTab === "calculator" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                  <LayoutGrid className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-black tracking-tight leading-none">{activeCourse.name}</h1>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Calculus Stream</span>
                </div>
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-2xl w-10 h-10 bg-muted/50 border-white/5">
                    <Settings className="w-5 h-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="rounded-t-[32px] border-white/5 h-[85vh]">
                  <DrawerHeader><DrawerTitle className="text-center font-black uppercase tracking-widest text-xs">Global Configuration</DrawerTitle></DrawerHeader>
                  <ScrollArea className="p-6 h-full">
                    <div className="space-y-8 pb-10">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Active Subject</Label>
                        <CourseSelector courses={courses} activeCourseId={activeCourseId} onCourseSelect={(id) => { setActiveCourseIdState(id); setActiveCourseId(id); }} onCourseCreate={(c) => setCourses([...courses, c])} onCourseDelete={(id) => setCourses(courses.filter(c => c.id !== id))} onCourseUpdate={(c) => setCourses(courses.map(cur => cur.id === c.id ? c : cur))} />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Ratio Balance</Label>
                        <Card className="rounded-3xl border-white/5 bg-muted/20">
                          <CardContent className="p-5 space-y-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center"><span className="text-xs font-bold uppercase">Midterm</span><span className="text-xs font-mono">{Math.round(activeCourse.settings.midtermWeight * 100)}%</span></div>
                              <Slider value={[activeCourse.settings.midtermWeight * 100]} max={100} min={0} step={5} onValueChange={(v) => handleWeightChange('midtermWeight', v[0])} />
                              <div className="flex justify-between items-center"><span className="text-xs font-bold uppercase">Finals</span><span className="text-xs font-mono">{Math.round(activeCourse.settings.finalsWeight * 100)}%</span></div>
                              <Slider value={[activeCourse.settings.finalsWeight * 100]} max={100} min={0} step={5} onValueChange={(v) => handleWeightChange('finalsWeight', v[0])} />
                            </div>
                            <Separator className="bg-white/5" />
                            <div className="space-y-4">
                              <div className="flex justify-between items-center"><span className="text-xs font-bold uppercase text-primary">Quiz Block</span><span className="text-xs font-mono">{Math.round((activeCourse.settings.quizWeight || 0.35) * 100)}%</span></div>
                              <Slider value={[(activeCourse.settings.quizWeight || 0.35) * 100]} max={80} min={0} step={5} onValueChange={(v) => handleWeightChange('quizWeight', v[0])} />
                              <div className="flex justify-between items-center"><span className="text-xs font-bold uppercase text-purple-400">Exam Block</span><span className="text-xs font-mono">{Math.round((activeCourse.settings.examWeight || 0.45) * 100)}%</span></div>
                              <Slider value={[(activeCourse.settings.examWeight || 0.45) * 100]} max={80} min={0} step={5} onValueChange={(v) => handleWeightChange('examWeight', v[0])} />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-14 rounded-2xl font-bold gap-2"><Download className="w-4 h-4" /> PDF</Button>
                        <Button variant="destructive" className="h-14 rounded-2xl font-bold gap-2"><History className="w-4 h-4" /> Reset</Button>
                      </div>
                    </div>
                  </ScrollArea>
                </DrawerContent>
              </Drawer>
            </div>

            <Tabs value={periodTab} onValueChange={setPeriodTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1.5 rounded-[20px] h-14 border border-white/5">
                <TabsTrigger value="midterm" className="rounded-[14px] text-xs font-black uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-xl transition-all duration-300">Midterm</TabsTrigger>
                <TabsTrigger value="finals" className="rounded-[14px] text-xs font-black uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-xl transition-all duration-300">Finals</TabsTrigger>
              </TabsList>
              <div className="mt-8">
                <TabsContent value="midterm" className="m-0 focus-visible:outline-none">
                  <GradingPeriod periodName="Midterm" quizNumbers={[]} quizScores={activeCourse.midtermState.quizScores} quizMaxScores={activeCourse.midtermState.quizMaxScores} examScore={activeCourse.midtermState.examScore} examMaxScore={activeCourse.midtermState.examMaxScore} attendance={activeCourse.midtermState.attendance} problemSet={activeCourse.midtermState.problemSet} periodGrade={midtermGrade} onChange={(f, v, i) => handleInputChange('midterm', f, v, i)} onAddQuiz={() => handleAddQuiz('midterm')} onRemoveQuiz={(i) => handleRemoveQuiz('midterm', i)} onShowCalc={() => setIsCalcDrawerOpen(true)} quizCount={activeCourse.midtermState.quizScores.length} />
                </TabsContent>
                <TabsContent value="finals" className="m-0 focus-visible:outline-none">
                  <GradingPeriod periodName="Finals" quizNumbers={[]} quizScores={activeCourse.finalsState.quizScores} quizMaxScores={activeCourse.finalsState.quizMaxScores} examScore={activeCourse.finalsState.examScore} examMaxScore={activeCourse.finalsState.examMaxScore} attendance={activeCourse.finalsState.attendance} problemSet={activeCourse.finalsState.problemSet} periodGrade={finalsGrade} onChange={(f, v, i) => handleInputChange('finals', f, v, i)} onAddQuiz={() => handleAddQuiz('finals')} onRemoveQuiz={(i) => handleRemoveQuiz('finals', i)} onShowCalc={() => setIsCalcDrawerOpen(true)} quizCount={activeCourse.finalsState.quizScores.length} />
                </TabsContent>
              </div>
            </Tabs>

            <Separator className="bg-white/5" />
            <footer className="text-center py-6 space-y-4 opacity-50">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-widest">
                <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                <Link to="/feedback" className="hover:text-primary transition-colors text-primary">Feedback</Link>
                <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
                <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              </div>
              <p className="text-[9px] uppercase tracking-widest">Calculus ni Baks · {new Date().getFullYear()}</p>
            </footer>
          </div>
        ) : (
          <FormulasPanel />
        )}
      </main>

      {/* Persistent Calc Proof Drawer */}
      <Drawer open={isCalcDrawerOpen} onOpenChange={setIsCalcDrawerOpen}>
        <DrawerContent className="rounded-t-[32px] border-white/5 h-[85vh]">
          <DrawerHeader><DrawerTitle className="text-center font-black uppercase tracking-widest text-xs">Mathematical Proof</DrawerTitle></DrawerHeader>
          <ScrollArea className="p-6 h-full">
             <CalculationPreview midtermState={activeCourse.midtermState} finalsState={activeCourse.finalsState} grades={{midterm: midtermGrade, finals: finalsGrade, finalGrade}} quizCount={activeCourse.settings.quizCount} activeCourse={activeCourse} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-background/60 backdrop-blur-2xl border border-white/5 p-2 rounded-[28px] shadow-2xl">
        <div className="flex justify-around items-center">
          <Button variant="ghost" className={`flex-1 flex flex-col gap-1 h-14 rounded-2xl transition-all duration-300 ${mainTab === 'calculator' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`} onClick={() => setMainTab('calculator')}><Calculator className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Calc</span></Button>
          <Button variant="ghost" className={`flex-1 flex flex-col gap-1 h-14 rounded-2xl transition-all duration-300 ${mainTab === 'formulas' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`} onClick={() => setMainTab('formulas')}><BookOpen className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Rules</span></Button>
          <Drawer>
            <DrawerTrigger asChild><Button variant="ghost" className="flex-1 flex flex-col gap-1 h-14 rounded-2xl text-muted-foreground"><Target className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Goal</span></Button></DrawerTrigger>
            <DrawerContent className="rounded-t-[32px] border-white/5">
              <DrawerHeader><DrawerTitle className="text-center font-black uppercase tracking-widest text-xs">Target Achievement</DrawerTitle></DrawerHeader>
              <div className="p-8 space-y-6">
                <div className="bg-primary/5 p-6 rounded-[24px] border border-primary/10 text-center space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Desired Final Grade</span>
                  <div className="text-5xl font-black text-primary tabular-nums tracking-tighter">{activeCourse.settings.targetGrade}%</div>
                  <Progress value={activeCourse.settings.targetGrade} className="h-1.5 mt-4" />
                </div>
                <div className="space-y-3 text-center">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Adjust Target</Label>
                  <div className="flex items-center justify-center gap-6">
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={() => updateCourse({...activeCourse, settings: {...activeCourse.settings, targetGrade: activeCourse.settings.targetGrade - 1}})}><Minus className="w-4 h-4" /></Button>
                    <span className="text-3xl font-black tabular-nums">{activeCourse.settings.targetGrade}</span>
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={() => updateCourse({...activeCourse, settings: {...activeCourse.settings, targetGrade: activeCourse.settings.targetGrade + 1}})}><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild><Button variant="ghost" className="flex-1 flex flex-col gap-1 h-14 rounded-2xl text-muted-foreground"><MoreVertical className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Menu</span></Button></DrawerTrigger>
            <DrawerContent className="rounded-t-[32px] border-white/5 h-[85vh]">
              <DrawerHeader><DrawerTitle className="text-center font-black uppercase tracking-widest text-xs">Engineering Ecosystem</DrawerTitle></DrawerHeader>
              <ScrollArea className="h-full px-6 pb-12">
                <div className="space-y-8">
                  {/* Advertising Section */}
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Professional Tools</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: <GraduationCap className="w-5 h-5" />, label: "GWA Calculator", desc: "Compute overall semestral weighted average", path: "https://gwa-calculator-ni-baks.vercel.app/" },
                        { icon: <FileCode className="w-5 h-5" />, label: "BSCE Curriculum", desc: "Track your Civil Engineering roadmap", path: "#" },
                        { icon: <Boxes className="w-5 h-5" />, label: "PSet Generator", desc: "Automated problem set formatting", path: "#" },
                        { icon: <FileCode className="w-5 h-5" />, label: "File Tree Gen", desc: "Generate structures for technical reports", path: "#" },
                      ].map((tool, i) => (
                        <a key={i} href={tool.path} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-3xl active:scale-[0.98] transition-transform">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{tool.icon}</div>
                          <div className="flex-1">
                            <h4 className="text-xs font-black uppercase tracking-tight">{tool.label}</h4>
                            <p className="text-[10px] text-muted-foreground font-medium">{tool.desc}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-30" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Standard Navigation */}
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Information</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: <User className="w-4 h-4" />, label: "About", path: "/about" },
                        { icon: <HelpCircle className="w-4 h-4" />, label: "FAQ", path: "/faq" },
                        { icon: <MessageSquare className="w-4 h-4 text-primary" />, label: "Feedback", path: "/feedback" },
                        { icon: <Calculator className="w-4 h-4" />, label: "Math Guide", path: "/calculations" },
                        { icon: <ShieldCheck className="w-4 h-4" />, label: "Privacy", path: "/privacy" },
                        { icon: <FileText className="w-4 h-4" />, label: "Terms", path: "/terms" },
                      ].map((item, i) => (
                        <Button key={i} variant="outline" className="h-20 rounded-3xl flex flex-col items-center justify-center gap-2 border-white/5 bg-muted/20 active:scale-95 transition-all" asChild>
                          <Link to={item.path}>
                            <span className="opacity-50">{item.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </div>
  );
};

export default ModernGradeCalculator;
