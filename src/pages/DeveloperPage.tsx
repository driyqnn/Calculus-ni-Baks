import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Github, Globe, Mail, MessageSquare, Linkedin, Twitter, ExternalLink, ShieldCheck, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const DeveloperPage: React.FC = () => {
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
          <h1 className="text-xl font-black uppercase tracking-tighter">Developer</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8 animate-fade-in">
        {/* Profile Hero */}
        <section className="text-center py-6 space-y-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-tr from-primary to-purple-400 rounded-[36px] flex items-center justify-center mx-auto shadow-2xl shadow-primary/20 border-2 border-white/10">
              <User className="w-12 h-12 text-white" />
            </div>
            <Badge className="absolute -bottom-2 -right-2 bg-green-500 hover:bg-green-500 border-2 border-background px-3 py-1 text-[8px] font-black uppercase tracking-widest">Available</Badge>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter">@09sychic</h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Full-Stack Engineering Student</p>
          </div>
        </section>

        {/* Social Links */}
        <section className="grid grid-cols-2 gap-3">
          {[
            { icon: <Github className="w-4 h-4" />, label: "GitHub", path: "#" },
            { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn", path: "#" },
            { icon: <MessageSquare className="w-4 h-4" />, label: "Messenger", path: "https://m.me/09sychicc" },
            { icon: <Mail className="w-4 h-4" />, label: "Email", path: "mailto:contact@example.com" },
          ].map((social, i) => (
            <a key={social.label} href={social.path} target="_blank" rel="noreferrer">
              <Button variant="outline" className="w-full h-14 rounded-2xl border-white/5 bg-muted/20 gap-3 font-bold text-xs">
                {social.icon}
                {social.label}
              </Button>
            </a>
          ))}
        </section>

        <Separator className="bg-white/5" />

        {/* Bio / Expertise */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">The Protocol</h3>
          </div>
          <Card className="border-none bg-muted/20 rounded-[32px]">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                I build high-performance tools for engineering students. My goal is to bridge the gap between complex academic mathematics and modern UI/UX design.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Vite", "KaTeX", "Tailwind"].map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary text-[10px] font-black uppercase px-3 rounded-full border-none">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Featured Projects Advertising */}
        <section className="space-y-4 pb-10">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Baks Ecosystem</h3>
          </div>
          <div className="space-y-3">
            {[
              { title: "GWA Calculator", icon: <GraduationCap className="w-4 h-4" />, color: "bg-blue-500" },
              { title: "BSCE Curriculum", icon: <FileText className="w-4 h-4" />, color: "bg-purple-500" },
              { title: "PSet Generator", icon: <Cpu className="w-4 h-4" />, color: "bg-orange-500" },
              { title: "File Tree Gen", icon: <Boxes className="w-4 h-4" />, color: "bg-green-500" }
            ].map((p, i) => (
              <Card key={i} className="border-none bg-primary/5 rounded-[24px] border border-primary/10 group active:scale-[0.98] transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center text-white shadow-lg shadow-black/20`}>
                      {p.icon}
                    </div>
                    <span className="font-black text-sm uppercase tracking-tight">{p.title}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="text-center py-10 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Code & Design by @09sychic</p>
        </footer>
      </main>
    </div>
  );
};

export default DeveloperPage;
