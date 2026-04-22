import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, EyeOff, Database, CheckCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20">
      <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl border-b border-white/5 p-4 safe-top">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-muted/30">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-black uppercase tracking-tighter">Privacy</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8 animate-fade-in">
        <section className="text-center py-6 space-y-2">
          <div className="w-16 h-16 bg-green-500/10 rounded-[28px] flex items-center justify-center mx-auto mb-4 border border-green-500/20">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Zero Data Policy.</h2>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-8">Your academic life is your business, not ours.</p>
        </section>

        {/* Core Pillars */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {[
              { 
                icon: <Lock className="w-5 h-5" />, 
                title: "Local Execution", 
                desc: "All calculations and storage happen entirely on your phone.",
                color: "text-blue-500 bg-blue-500/10"
              },
              { 
                icon: <EyeOff className="w-5 h-5" />, 
                title: "No Tracking", 
                desc: "We don't use cookies, analytics, or fingerprinting. You are anonymous.",
                color: "text-purple-500 bg-purple-500/10"
              },
              { 
                icon: <Database className="w-5 h-5" />, 
                title: "No Servers", 
                desc: "Grade Genius has no database. We literally cannot see your data.",
                color: "text-orange-500 bg-orange-500/10"
              }
            ].map((pillar, i) => (
              <Card key={i} className="border-none bg-muted/20 rounded-[32px]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${pillar.color}`}>
                    {pillar.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-sm uppercase tracking-tight">{pillar.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{pillar.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="bg-white/5" />

        {/* Detailed Breakdown */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Technical Reality</h3>
          </div>

          <div className="space-y-4 px-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold tracking-tight mb-1">Local Storage API</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  We use your browser's LocalStorage to remember your subjects. This stays in your browser's secure sandbox.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold tracking-tight mb-1">CDN Assets</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Fonts and icons are loaded from secure CDNs. They receive standard network info (like IP) but no application data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold tracking-tight mb-1">Export Safety</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  PDF and Image generation is done client-side. Your transcript never touches a network during export.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 opacity-30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Smartphone className="w-3 h-3" />
            <span className="text-[9px] font-black uppercase tracking-widest">Privacy Verified</span>
          </div>
          <p className="text-[8px] font-black uppercase tracking-[0.3em]">Version 2.0.0 · Local-Only Architecture</p>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPage;
