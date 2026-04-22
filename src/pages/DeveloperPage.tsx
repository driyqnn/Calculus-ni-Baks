import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Github, Mail, MessageSquare, ExternalLink, Cpu, Boxes, GraduationCap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const DeveloperPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollArea className="h-full">
      <main className="max-w-2xl mx-auto p-4 lg:p-12 space-y-12 animate-fade-in pb-32">
        <section className="text-center py-6 space-y-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-tr from-primary to-purple-400 rounded-xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/20 border-2 border-white/10 overflow-hidden">
              <img 
                src="https://avatars.githubusercontent.com/u/163716236" 
                alt="Developer Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <Badge className="absolute -bottom-2 -right-2 bg-green-500 hover:bg-green-500 border-2 border-background px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg">Available</Badge>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter">@chqrlzz</h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Full-Stack Engineering Student</p>
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-xl mx-auto">
          {[
            { icon: <Github className="w-4 h-4" />, label: "GitHub", path: "https://github.com/driyqnn" },
            { icon: <MessageSquare className="w-4 h-4" />, label: "Messenger", path: "https://m.me/chqrlzz" },
            { icon: <Mail className="w-4 h-4" />, label: "Email", path: "mailto:chqrlzz.dev@gmail.com" },
          ].map((social) => (
            <a key={social.label} href={social.path} target="_blank" rel="noreferrer">
              <Button variant="outline" className="w-full h-14 rounded-xl border-white/5 bg-muted/20 gap-3 font-bold text-xs">
                {social.icon}
                {social.label}
              </Button>
            </a>
          ))}
        </section>

        <Separator className="bg-white/5" />

        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">The Protocol</h3>
          </div>
          <Card className="border-none bg-muted/20 rounded-xl">
            <CardContent className="p-8 space-y-6">
              <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                I build high-performance tools for engineering students. My goal is to bridge the gap between complex academic mathematics and modern UI/UX design.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Vite", "KaTeX", "Tailwind"].map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary text-[10px] font-black uppercase px-3 rounded-lg border-none">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4 pb-10">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Baks Ecosystem</h3>
          </div>
          <div className="space-y-3">
            {[
              { title: "GWA Calculator", icon: <GraduationCap className="w-4 h-4" />, color: "bg-blue-500", path: "https://gwa-calculator-ni-baks.vercel.app/" },
              { title: "BSCE Curriculum", icon: <FileText className="w-4 h-4" />, color: "bg-purple-500", path: "https://psychiotric-sudo.github.io/curriculum/" },
              { title: "PSet Generator", icon: <Cpu className="w-4 h-4" />, color: "bg-orange-500", path: "https://psychiotric-sudo.github.io/pset_generator/" },
              { title: "File Tree Gen", icon: <Boxes className="w-4 h-4" />, color: "bg-green-500", path: "https://09sychic.github.io/filetree/" }
            ].map((p, i) => (
              <a key={i} href={p.path} target="_blank" rel="noreferrer">
                <Card className="border-none bg-primary/5 rounded-xl border border-primary/10 group active:scale-[0.98] transition-all mb-3">
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
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-4 pb-10">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Shout Out</h3>
          </div>
          <Card className="border-none bg-muted/20 rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[
                  { name: "Josh Ammiel Azarce", id: "100085330537050" },
                  { name: "Ael John Gabriel Santural", id: "61567976189195" },
                  { name: "Sam Dasal", id: "100031669007344" },
                  { name: "Ram Rebadomia", id: "100042075660784" },
                  { name: "Rexer John Fuyonan", id: "100053709364471" },
                  { name: "Emmanuel John Osorio", id: "1513778046615001" },
                  { name: "Christofer John Delojero", id: "100015735784681" }
                ].map((person) => (
                  <a 
                    key={person.id} 
                    href={`https://m.me/${person.id}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors group"
                  >
                    <span className="text-sm font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors">{person.name}</span>
                    <MessageSquare className="w-4 h-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="text-center py-10 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Code & Design by @chqrlzz</p>
        </footer>
      </main>
    </ScrollArea>
  );
};

export default DeveloperPage;
