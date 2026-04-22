import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, BookOpen, Calculator, Shield, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const FAQPage: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
  }, []);

  const faqData = [
    {
      category: "Basics",
      icon: <Calculator className="w-4 h-4" />,
      questions: [
        {
          q: "How do I start calculating?",
          a: "Simply select a course (or create a new one) from the settings menu, then enter your quiz scores and exam results in the respective tabs. Calculations happen in real-time."
        },
        {
          q: "Can I save my progress?",
          a: "Everything is automatically saved to your device's local storage. You don't need to create an account or click 'save'—just enter your data and it stays there."
        }
      ]
    },
    {
      category: "Math & Rules",
      icon: <BookOpen className="w-4 h-4" />,
      questions: [
        {
          q: "What is the 50-point adjustment?",
          a: "It's a common academic system where a 0% raw score results in 50%, and 100% remains 100%. The formula is: Adjusted = (Raw × 0.5) + 50."
        },
        {
          q: "How are periods weighted?",
          a: "By default, your Midterm period accounts for 30% of your final grade, while the Finals period accounts for 70%."
        }
      ]
    },
    {
      category: "Privacy",
      icon: <Shield className="w-4 h-4" />,
      questions: [
        {
          q: "Is my grade data uploaded?",
          a: "No. All your data stays strictly on your device. We do not have servers and we cannot see your grades or course information."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20">
      <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl border-b border-white/5 p-4 safe-top">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-muted/30">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-black uppercase tracking-tighter">Support</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8 animate-fade-in">
        <section className="py-4">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight leading-none">FAQs</h2>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Common Questions</span>
            </div>
          </div>

          <div className="space-y-8">
            {faqData.map((cat, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <div className="w-1 h-4 bg-primary/50 rounded-full" />
                  <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    {cat.icon} {cat.category}
                  </h3>
                </div>
                
                <Accordion type="single" collapsible className="space-y-3">
                  {cat.questions.map((item, j) => (
                    <AccordionItem key={j} value={`item-${i}-${j}`} className="border-none">
                      <AccordionTrigger className="bg-muted/20 hover:bg-muted/30 px-5 py-4 rounded-3xl border border-white/5 transition-all hover:no-underline text-left">
                        <span className="text-sm font-bold tracking-tight pr-4">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 text-sm text-muted-foreground leading-relaxed bg-primary/5 rounded-b-[24px] -mt-4 border-x border-b border-white/5 pt-8">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-white/5" />

        <section className="space-y-4 pb-10">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Still need help?</h3>
          </div>
          <Link to="/feedback">
            <Card className="border-none bg-primary/10 rounded-[32px] group active:scale-95 transition-all">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-sm uppercase tracking-wider">Contact Support</h4>
                  <p className="text-[10px] font-medium text-muted-foreground">Send us your feedback or issues</p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary opacity-50" />
              </CardContent>
            </Card>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default FAQPage;
