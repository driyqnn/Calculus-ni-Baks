import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Settings, 
  User, 
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
  MoreVertical,
  Cpu,
  Boxes,
  FileCode,
  GraduationCap,
  Target,
  ChevronDown,
  ChevronUp
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

const ModernGradeCalculator: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [activeCourseId, setActiveCourseIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainTab, setMainTab] = useState("calculator");
  const [periodTab, setPeriodTab] = useState("midterm");
  const [showCalculations, setShowCalculations] = useState(false);

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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans pb-24 laptop:pb-0 laptop:flex-row">
      {/* Laptop Sidebar / Mobile Header */}
      <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl border-b border-white/5 p-4 laptop:w-80 laptop:h-screen laptop:sticky laptop:border-r laptop:border-b-0 laptop:bg-background/20">
        <div className="max-w-md mx-auto laptop:max-w-none laptop:h-full laptop:flex laptop:flex-col">
          <div className="flex items-center justify-between laptop:flex-col laptop:items-start laptop:gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Overall Grade</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-4xl font-black ${gradeColor} tabular-nums tracking-tighter laptop:text-6xl`}>{naturalRound(finalGrade)}</span>
                <span className="text-xs font-bold text-muted-foreground/50">%</span>
              </div>
            </div>
            <div className="flex flex-col items-end laptop:items-start">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Scale GPE</span>
              <span className={`text-2xl font-black ${gradeColor} tabular-nums tracking-tighter laptop:text-4xl`}>{gpe}</span>
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-full bg-white/5 h-1.5 laptop:h-2 laptop:mt-8">
            <div className={`h-full transition-all duration-700 ease-out rounded-full ${gradeColor.replace('text-', 'bg-')}`} style={{ width: `${Math.min(100, finalGrade)}%` }} />
          </div>

          {/* Laptop Navigation Links */}
          <nav className="hidden laptop:flex flex-col gap-2 mt-12 flex-1">
             <Button variant="ghost" onClick={() => setMainTab('calculator')} className={`justify-start h-14 rounded-2xl gap-4 px-6 ${mainTab === 'calculator' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground font-bold'}`}>
               <Calculator className="w-5 h-5" /> Calculator
             </Button>
             <Button variant="ghost" onClick={() => setMainTab('formulas')} className={`justify-start h-14 rounded-2xl gap-4 px-6 ${mainTab === 'formulas' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground font-bold'}`}>
               <BookOpen className="w-5 h-5" /> Formulas
             </Button>
             <Link to="/developer" className="w-full">
               <Button variant="ghost" className="w-full justify-start h-14 rounded-2xl gap-4 px-6 text-muted-foreground font-bold">
                 <User className="w-5 h-5" /> Developer
               </Button>
             </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto p-4 laptop:max-w-none laptop:grid laptop:grid-cols-[1fr_400px] laptop:gap-8 laptop:p-10 laptop:overflow-hidden">
        <ScrollArea className="laptop:h-[calc(100vh-80px)]">
          {mainTab === "calculator" ? (
            <div className="space-y-10 pb-20">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                    <LayoutGrid className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-black tracking-tight leading-none laptop:text-3xl">{activeCourse.name}</h1>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Stream</span>
                  </div>
                </div>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-2xl w-12 h-12 bg-muted/50 border-white/5 active:scale-95 transition-transform">
                      <Settings className="w-6 h-6" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="rounded-t-[40px] border-white/5 h-[90vh]">
                    <DrawerHeader><DrawerTitle className="text-center font-black uppercase tracking-widest text-xs py-2">Global Protocol</DrawerTitle></DrawerHeader>
                    <ScrollArea className="p-8 h-full">
                      <div className="max-w-md mx-auto space-y-10 pb-20">
                        {/* Course Selection */}
                        <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Subject Registry</Label>
                          <CourseSelector courses={courses} activeCourseId={activeCourseId} onCourseSelect={(id) => { setActiveCourseIdState(id); setActiveCourseId(id); }} onCourseCreate={(c) => setCourses([...courses, c])} onCourseDelete={(id) => setCourses(courses.filter(c => c.id !== id))} onCourseUpdate={(c) => setCourses(courses.map(cur => cur.id === c.id ? c : cur))} />
                        </div>

                        {/* Goal Feature Moved Here */}
                        <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Target Achievement</Label>
                          <div className="bg-primary/5 p-8 rounded-[36px] border border-primary/10 text-center space-y-6">
                             <div className="space-y-1">
                               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Passing Threshold</span>
                               <div className="text-6xl font-black text-primary tabular-nums tracking-tighter">{activeCourse.settings.targetGrade}%</div>
                             </div>
                             <div className="flex items-center justify-center gap-8">
                               <Button variant="outline" size="icon" className="rounded-full w-14 h-14 border-white/10" onClick={() => updateCourse({...activeCourse, settings: {...activeCourse.settings, targetGrade: activeCourse.settings.targetGrade - 1}})}><Minus className="w-5 h-5" /></Button>
                               <Button variant="outline" size="icon" className="rounded-full w-14 h-14 border-white/10" onClick={() => updateCourse({...activeCourse, settings: {...activeCourse.settings, targetGrade: activeCourse.settings.targetGrade + 1}})}><Plus className="w-5 h-5" /></Button>
                             </div>
                          </div>
                        </div>

                        {/* Weights */}
                        <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Ratio Balance</Label>
                          <Card className="rounded-[36px] border-white/5 bg-muted/20">
                            <CardContent className="p-6 space-y-8">
                              <div className="space-y-5">
                                <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase">Midterm Ratio</span><span className="text-xs font-mono font-black">{Math.round(activeCourse.settings.midtermWeight * 100)}%</span></div>
                                <Slider value={[activeCourse.settings.midtermWeight * 100]} max={100} min={0} step={5} onValueChange={(v) => handleWeightChange('midtermWeight', v[0])} />
                                <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase">Finals Ratio</span><span className="text-xs font-mono font-black">{Math.round(activeCourse.settings.finalsWeight * 100)}%</span></div>
                                <Slider value={[activeCourse.settings.finalsWeight * 100]} max={100} min={0} step={5} onValueChange={(v) => handleWeightChange('finalsWeight', v[0])} />
                              </div>
                              <Separator className="bg-white/5" />
                              <div className="space-y-5">
                                <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-primary">Quiz Block</span><span className="text-xs font-mono font-black">{Math.round((activeCourse.settings.quizWeight || 0.35) * 100)}%</span></div>
                                <Slider value={[(activeCourse.settings.quizWeight || 0.35) * 100]} max={80} min={0} step={5} onValueChange={(v) => handleWeightChange('quizWeight', v[0])} />
                                <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-purple-400">Exam Block</span><span className="text-xs font-mono font-black">{Math.round((activeCourse.settings.examWeight || 0.45) * 100)}%</span></div>
                                <Slider value={[(activeCourse.settings.examWeight || 0.45) * 100]} max={80} min={0} step={5} onValueChange={(v) => handleWeightChange('examWeight', v[0])} />
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" className="h-16 rounded-3xl font-black uppercase tracking-widest text-[10px] gap-2"><Download className="w-4 h-4" /> PDF Transcript</Button>
                          <Button variant="destructive" className="h-16 rounded-3xl font-black uppercase tracking-widest text-[10px] gap-2"><History className="w-4 h-4" /> Factory Reset</Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </DrawerContent>
                </Drawer>
              </div>

              <Tabs value={periodTab} onValueChange={setPeriodTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1.5 rounded-[24px] h-16 border border-white/5 laptop:max-w-sm">
                  <TabsTrigger value="midterm" className="rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-2xl transition-all duration-300">Midterm</TabsTrigger>
                  <TabsTrigger value="finals" className="rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-2xl transition-all duration-300">Finals</TabsTrigger>
                </TabsList>
                
                <div className="mt-10">
                  <TabsContent value="midterm" className="m-0 focus-visible:outline-none">
                    <GradingPeriod periodName="Midterm" quizNumbers={[]} quizScores={activeCourse.midtermState.quizScores} quizMaxScores={activeCourse.midtermState.quizMaxScores} examScore={activeCourse.midtermState.examScore} examMaxScore={activeCourse.midtermState.examMaxScore} attendance={null} problemSet={null} periodGrade={midtermGrade} onChange={(f, v, i) => handleInputChange('midterm', f, v, i)} onAddQuiz={() => handleAddQuiz('midterm')} onRemoveQuiz={(i) => handleRemoveQuiz('midterm', i)} onShowCalc={() => setShowCalculations(!showCalculations)} quizCount={activeCourse.midtermState.quizScores.length} />
                  </TabsContent>
                  <TabsContent value="finals" className="m-0 focus-visible:outline-none">
                    <GradingPeriod periodName="Finals" quizNumbers={[]} quizScores={activeCourse.finalsState.quizScores} quizMaxScores={activeCourse.finalsState.quizMaxScores} examScore={activeCourse.finalsState.examScore} examMaxScore={activeCourse.finalsState.examMaxScore} attendance={null} problemSet={null} periodGrade={finalsGrade} onChange={(f, v, i) => handleInputChange('finals', f, v, i)} onAddQuiz={() => handleAddQuiz('finals')} onRemoveQuiz={(i) => handleRemoveQuiz('finals', i)} onShowCalc={() => setShowCalculations(!showCalculations)} quizCount={activeCourse.finalsState.quizScores.length} />
                  </TabsContent>
                </div>
              </Tabs>

              {/* Inline Scroll-down Proof */}
              <Collapsible open={showCalculations} onOpenChange={setShowCalculations} className="w-full">
                <CollapsibleContent className="space-y-4 animate-accordion-down overflow-hidden">
                  <div className="bg-primary/5 border border-primary/10 rounded-[40px] p-6 laptop:p-10">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Calculation Stream</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowCalculations(false)} className="rounded-full hover:bg-primary/10"><ChevronUp className="w-4 h-4" /></Button>
                    </div>
                    <CalculationPreview midtermState={activeCourse.midtermState} finalsState={activeCourse.finalsState} grades={{midterm: midtermGrade, finals: finalsGrade, finalGrade}} quizCount={activeCourse.settings.quizCount} activeCourse={activeCourse} />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator className="bg-white/5" />
              <footer className="text-center py-10 space-y-6 opacity-40 laptop:text-left laptop:flex laptop:justify-between laptop:items-center">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] font-black uppercase tracking-[0.2em] laptop:justify-start">
                  <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                  <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                  <Link to="/feedback" className="hover:text-primary transition-colors text-primary">Feedback</Link>
                  <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
                  <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Calculus ni Baks · {new Date().getFullYear()}</p>
              </footer>
            </div>
          ) : (
            <FormulasPanel />
          )}
        </ScrollArea>

        {/* Laptop Sidebar Analytics Panel */}
        <aside className="hidden laptop:flex flex-col gap-8 bg-muted/20 border-l border-white/5 p-8 laptop:h-[calc(100vh-80px)] overflow-y-auto">
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">General Metrics</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ScoreInput label="Attendance & Participation" score={activeCourse.midtermState.attendance} onScoreChange={(v) => { handleInputChange('midterm', 'attendance', v); handleInputChange('finals', 'attendance', v); }} placeholder="0" showMaxScore={false} maxValue={100} />
              <ScoreInput label="Problem Sets & Tasks" score={activeCourse.midtermState.problemSet} onScoreChange={(v) => { handleInputChange('midterm', 'problemSet', v); handleInputChange('finals', 'problemSet', v); }} placeholder="0" showMaxScore={false} maxValue={100} />
            </div>
          </section>

          <Card className="border-none bg-primary/5 rounded-[32px]">
            <CardContent className="p-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Goal Progress</h4>
               <div className="flex justify-between items-baseline mb-2">
                 <span className="text-3xl font-black">{naturalRound(finalGrade)}%</span>
                 <span className="text-xs font-bold text-muted-foreground">Target: {activeCourse.settings.targetGrade}%</span>
               </div>
               <Progress value={(finalGrade / activeCourse.settings.targetGrade) * 100} className="h-2" />
            </CardContent>
          </Card>
        </aside>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-sm bg-background/60 backdrop-blur-2xl border border-white/5 p-2 rounded-[32px] shadow-2xl laptop:hidden">
        <div className="flex justify-around items-center">
          <Button variant="ghost" className={`flex-1 flex flex-col gap-1 h-14 rounded-2xl transition-all duration-300 ${mainTab === 'calculator' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground'}`} onClick={() => setMainTab('calculator')}><Calculator className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Calc</span></Button>
          <Button variant="ghost" className={`flex-1 flex flex-col gap-1 h-14 rounded-2xl transition-all duration-300 ${mainTab === 'formulas' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground'}`} onClick={() => setMainTab('formulas')}><BookOpen className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Rules</span></Button>
          <Link to="/developer" className="flex-1">
            <Button variant="ghost" className="w-full flex flex-col gap-1 h-14 rounded-2xl text-muted-foreground">
              <User className="w-5 h-5" />
              <span className="text-[9px] font-black uppercase tracking-widest">Dev</span>
            </Button>
          </Link>
          <Drawer>
            <DrawerTrigger asChild><Button variant="ghost" className="flex-1 flex flex-col gap-1 h-14 rounded-2xl text-muted-foreground"><MoreVertical className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Menu</span></Button></DrawerTrigger>
            <DrawerContent className="rounded-t-[40px] border-white/5 h-[85vh]">
              <DrawerHeader><DrawerTitle className="text-center font-black uppercase tracking-widest text-xs">Ecosystem</DrawerTitle></DrawerHeader>
              <ScrollArea className="h-full px-8 pb-20">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Professional Tools</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: <GraduationCap className="w-5 h-5" />, label: "GWA Calculator", desc: "Official Baks GWA Computing Suite", path: "https://gwa-calculator-ni-baks.vercel.app/" },
                        { icon: <FileCode className="w-5 h-5" />, label: "BSCE Curriculum", desc: "Complete CE roadmap", path: "#" },
                        { icon: <Boxes className="w-5 h-5" />, label: "PSet Generator", desc: "Automated engineering tasks", path: "#" },
                        { icon: <Cpu className="w-5 h-5" />, label: "File Tree Gen", desc: "Technical reporting structure", path: "#" },
                      ].map((tool, i) => (
                        <a key={i} href={tool.path} target="_blank" rel="noreferrer" className="flex items-center gap-5 p-5 bg-primary/5 border border-primary/10 rounded-[32px] active:scale-[0.98] transition-transform">
                          <div className="w-14 h-14 rounded-[20px] bg-primary/10 flex items-center justify-center text-primary shrink-0">{tool.icon}</div>
                          <div className="flex-1">
                            <h4 className="text-xs font-black uppercase tracking-tight">{tool.label}</h4>
                            <p className="text-[10px] text-muted-foreground font-medium">{tool.desc}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-20" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Academic Info</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: <User className="w-4 h-4" />, label: "About", path: "/about" },
                        { icon: <HelpCircle className="w-4 h-4" />, label: "FAQ", path: "/faq" },
                        { icon: <MessageSquare className="w-4 h-4 text-primary" />, label: "Feedback", path: "/feedback" },
                        { icon: <Calculator className="w-4 h-4" />, label: "Math Guide", path: "/calculations" },
                        { icon: <ShieldCheck className="w-4 h-4" />, label: "Privacy", path: "/privacy" },
                        { icon: <FileText className="w-4 h-4" />, label: "Terms", path: "/terms" },
                      ].map((item, i) => (
                        <Button key={i} variant="outline" className="h-24 rounded-[32px] flex flex-col items-center justify-center gap-2 border-white/5 bg-muted/20 active:scale-95 transition-all" asChild>
                          <Link to={item.path}>
                            <span className="opacity-40">{item.icon}</span>
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
