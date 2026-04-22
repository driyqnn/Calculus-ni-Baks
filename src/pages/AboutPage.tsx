import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Code2, Globe, Shield, History, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl border-b border-white/5 p-4 safe-top">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-muted/30">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-black uppercase tracking-tighter">About</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8 animate-fade-in">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-6">
          <div className="w-20 h-20 bg-primary/20 rounded-[32px] flex items-center justify-center mx-auto border border-primary/20 shadow-2xl shadow-primary/10">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter">Grade Genius</h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Calculus ni Baks v2.0</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            A high-precision grade tracking system engineered for Civil Engineering students and academic high-achievers.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Capabilities</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Globe className="w-4 h-4" />, label: "Multi-Course" },
              { icon: <History className="w-4 h-4" />, label: "Auto-Save" },
              { icon: <Shield className="w-4 h-4" />, label: "Private" },
              { icon: <Code2 className="w-4 h-4" />, label: "KaTeX Math" },
            ].map((f, i) => (
              <div key={i} className="bg-muted/20 p-4 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
                <span className="text-primary opacity-70">{f.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-white/5" />

        {/* Mission */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Our Mission</h3>
          </div>
          <Card className="border-none bg-muted/20 rounded-[32px]">
            <CardContent className="p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                We believe in academic transparency. Our tool is designed to eliminate the anxiety of "manual computations" by providing a verified, real-time breakdown of your academic standing.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Developer Card */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Developer</h3>
          </div>
          <a href="https://m.me/09sychicc" target="_blank" rel="noreferrer">
            <Card className="border-none bg-primary/10 rounded-[32px] overflow-hidden group active:scale-95 transition-all">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-lg tracking-tight">@09sychic</h4>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Connect on Messenger</p>
                </div>
                <ArrowLeft className="w-5 h-5 rotate-180 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </a>
        </section>

        <footer className="text-center py-10 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Built for the Engineering Community</p>
        </footer>
      </main>
    </div>
  );
};

export default AboutPage;
