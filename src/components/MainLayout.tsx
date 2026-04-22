import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calculator, 
  Settings, 
  User, 
  BookOpen, 
  ExternalLink,
  GraduationCap,
  FileCode,
  Boxes,
  Cpu,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface MainLayoutProps {
  children: React.ReactNode;
  onSettingsClick?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onSettingsClick }) => {
  const location = useLocation();
  const path = location.pathname;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans lg:flex-row lg:overflow-hidden">
      {/* Laptop Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 h-screen sticky top-0 border-r border-white/5 bg-background/20 p-8 shrink-0">
        <div className="flex flex-col h-full">
          <div className="mb-12">
            <h1 className="text-2xl font-black tracking-tighter text-primary">GRADE GENIUS</h1>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Engineering Suite</p>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            <Link to="/">
              <Button variant="ghost" className={`w-full justify-start h-14 rounded-xl gap-4 px-6 ${path === '/' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground font-bold'}`}>
                <Calculator className="w-5 h-5" /> Calculator
              </Button>
            </Link>
            <Link to="/calculations">
              <Button variant="ghost" className={`w-full justify-start h-14 rounded-xl gap-4 px-6 ${path === '/calculations' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground font-bold'}`}>
                <BookOpen className="w-5 h-5" /> Formulas
              </Button>
            </Link>
            <Link to="/developer">
              <Button variant="ghost" className={`w-full justify-start h-14 rounded-xl gap-4 px-6 ${path === '/developer' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground font-bold'}`}>
                <User className="w-5 h-5" /> Developer
              </Button>
            </Link>
          </nav>

          <div className="mt-auto space-y-6">
            <Separator className="bg-white/5" />
            <div className="grid grid-cols-2 gap-4 px-2">
               <Link to="/faq" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
               <Link to="/feedback" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Feedback</Link>
            </div>
            <p className="text-[8px] font-medium text-muted-foreground/30 text-center uppercase tracking-widest">Code & Design by @chqrlzz</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative lg:h-screen lg:overflow-hidden">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-sm bg-background/60 backdrop-blur-2xl border border-white/5 p-2 rounded-2xl shadow-2xl lg:hidden">
        <div className="flex justify-around items-center">
          <Link to="/" className="flex-1">
            <Button variant="ghost" className={`w-full flex flex-col gap-1 h-14 rounded-xl transition-all ${path === '/' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground font-bold'}`}>
              <Calculator className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Calc</span>
            </Button>
          </Link>
          <Link to="/calculations" className="flex-1">
            <Button variant="ghost" className={`w-full flex flex-col gap-1 h-14 rounded-xl transition-all ${path === '/calculations' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground font-bold'}`}>
              <BookOpen className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Rules</span>
            </Button>
          </Link>
          <Link to="/developer" className="flex-1">
            <Button variant="ghost" className={`w-full flex flex-col gap-1 h-14 rounded-xl transition-all ${path === '/developer' ? 'bg-primary/10 text-primary font-black' : 'text-muted-foreground font-bold'}`}>
              <User className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Dev</span>
            </Button>
          </Link>
          
          <Drawer open={open} onOpenChange={setOpen}>
            {onSettingsClick ? (
               <Button 
                variant="ghost" 
                onClick={onSettingsClick}
                className="flex-1 flex flex-col gap-1 h-14 rounded-xl text-muted-foreground font-bold"
               >
                 <Settings className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Settings</span>
               </Button>
            ) : (
              <DrawerTrigger asChild>
                <Button variant="ghost" className="flex-1 flex flex-col gap-1 h-14 rounded-xl text-muted-foreground font-bold">
                  <Settings className="w-5 h-5" /><span className="text-[9px] font-black uppercase tracking-widest">Settings</span>
                </Button>
              </DrawerTrigger>
            )}
            <DrawerContent className="rounded-t-2xl border-white/5 h-[85vh]">
              <DrawerHeader><DrawerTitle className="text-center font-black uppercase tracking-widest text-xs py-4">System Console</DrawerTitle></DrawerHeader>
              <ScrollArea className="h-full px-8 pb-20">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Professional Tools</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: <GraduationCap className="w-5 h-5" />, label: "GWA Calculator", path: "https://gwa-calculator-ni-baks.vercel.app/" },
                        { icon: <FileCode className="w-5 h-5" />, label: "BSCE Curriculum", path: "https://psychiotric-sudo.github.io/curriculum/" },
                        { icon: <Boxes className="w-5 h-5" />, label: "PSet Generator", path: "https://psychiotric-sudo.github.io/pset_generator/" },
                        { icon: <Cpu className="w-5 h-5" />, label: "File Tree Gen", path: "https://09sychic.github.io/filetree/" },
                      ].map((tool, i) => (
                        <a 
                          key={i} 
                          href={tool.path} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-5 p-5 bg-primary/5 border border-primary/10 rounded-xl active:scale-[0.98] transition-transform"
                          onClick={() => setOpen(false)}
                        >
                          <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">{tool.icon}</div>
                          <div className="flex-1">
                            <h4 className="text-xs font-black uppercase tracking-tight">{tool.label}</h4>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-20" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Information</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: <HelpCircle className="w-4 h-4" />, label: "FAQ", path: "/faq" },
                        { icon: <MessageSquare className="w-4 h-4" />, label: "Feedback", path: "/feedback" },
                        { icon: <ShieldCheck className="w-4 h-4" />, label: "Privacy", path: "/privacy" },
                        { icon: <FileText className="w-4 h-4" />, label: "Terms", path: "/terms" },
                      ].map((item, i) => (
                        <Button 
                          key={i} 
                          variant="outline" 
                          className="h-20 rounded-xl flex flex-col items-center justify-center gap-2 border-white/5 bg-muted/20 active:scale-95 transition-all" 
                          asChild
                          onClick={() => setOpen(false)}
                        >
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

export default MainLayout;
