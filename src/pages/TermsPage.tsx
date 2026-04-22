import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle2, AlertCircle, Scale, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TermsPage: React.FC = () => {
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
          <h1 className="text-xl font-black uppercase tracking-tighter">Terms</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8 animate-fade-in">
        <section className="text-center py-6 space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-[28px] flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Legal Clarity.</h2>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-8">Fair use rules for the next-gen calculator.</p>
        </section>

        {/* Essential Terms */}
        <section className="space-y-4">
          {[
            {
              title: "Educational Use Only",
              desc: "Grade Genius is a tool for academic planning. It is NOT an official record-keeping system.",
              icon: <FileText className="w-5 h-5 text-blue-400" />
            },
            {
              title: "Accuracy Disclaimer",
              desc: "While highly precise, we are not responsible for discrepancies with your school's final portal.",
              icon: <AlertCircle className="w-5 h-5 text-orange-400" />
            },
            {
              title: "Data Ownership",
              desc: "You own your data. We don't store it, so backup via export is your responsibility.",
              icon: <ShieldCheck className="w-5 h-5 text-green-400" />
            }
          ].map((item, i) => (
            <div key={i} className="bg-muted/20 p-6 rounded-[32px] border border-white/5 space-y-2">
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="font-black text-sm uppercase tracking-tight">{item.title}</h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed font-medium pl-8">{item.desc}</p>
            </div>
          ))}
        </section>

        <Separator className="bg-white/5" />

        {/* Full Details Scroll */}
        <section className="space-y-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">The Protocol</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-primary">1. Acceptance</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                By using this app, you agree to these terms. If you don't agree, please discontinue use immediately.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-primary">2. User Conduct</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                You agree not to reverse engineer or attempt to disrupt the service's client-side logic.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-primary">3. No Liability</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                We are not liable for any academic or financial decisions made based on these calculations. Always verify with your registrar.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 opacity-30">
          <p className="text-[8px] font-black uppercase tracking-[0.3em]">Last Updated: April 2026</p>
        </footer>
      </main>
    </div>
  );
};

export default TermsPage;
