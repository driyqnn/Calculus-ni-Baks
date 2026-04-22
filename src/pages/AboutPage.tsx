import React, { useEffect } from "react";
import { Sparkles, Globe, History, Shield, Code2, User, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollArea className="h-full">
      <main className="max-w-2xl mx-auto p-4 lg:p-12 space-y-12 animate-fade-in pb-32">
        <section className="text-center space-y-4 py-6">
          <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mx-auto border border-primary/20 shadow-2xl shadow-primary/10">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter lg:text-5xl">Grade Genius</h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Calculus ni Baks v2.0</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed px-4 max-w-md mx-auto">
            A high-precision grade tracking system engineered for Civil Engineering students and academic high-achievers.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Capabilities</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: <Globe className="w-4 h-4" />, label: "Multi-Course" },
              { icon: <History className="w-4 h-4" />, label: "Auto-Save" },
              { icon: <Shield className="w-4 h-4" />, label: "Private" },
              { icon: <Code2 className="w-4 h-4" />, label: "KaTeX Math" },
            ].map((f, i) => (
              <div key={i} className="bg-muted/20 p-6 rounded-xl border border-white/5 flex flex-col items-center gap-3 active:scale-95 transition-all">
                <span className="text-primary opacity-70">{f.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-white/5" />

        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Our Mission</h3>
          </div>
          <Card className="border-none bg-muted/20 rounded-xl">
            <CardContent className="p-8">
              <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                We believe in academic transparency. Our tool is designed to eliminate the anxiety of "manual computations" by providing a verified, real-time breakdown of your academic standing.
              </p>
            </CardContent>
          </Card>
        </section>

        <footer className="text-center py-10 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Built for the Engineering Community</p>
        </footer>
      </main>
    </ScrollArea>
  );
};

export default AboutPage;
