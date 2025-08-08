import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GradeCalculator from "@/components/GradeCalculator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, BarChart3 } from "lucide-react";

const Index: React.FC = () => {
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        {/* Floating Hamburger Menu */}
        <div className="fixed top-4 left-4 z-50">
          <SidebarTrigger className="p-3 lg:p-4 bg-primary/90 hover:bg-primary text-primary-foreground rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105">
          </SidebarTrigger>
        </div>

        {/* GWA Calculator Button - Desktop (bottom right) */}
        <div className="hidden lg:block fixed bottom-6 right-6 z-50">
          <a
            href="https://gwa-calculator-ni-baks.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="gwa-button-subtle"
          >
            <BarChart3 size={16} />
            GWA Calculator
          </a>
        </div>

        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11"></div> {/* Spacer for floating hamburger */}
            <h1 className="text-lg font-bold text-primary">Grade Calculator</h1>
          </div>
          {/* GWA Calculator Button - Mobile (header right) */}
          <a
            href="https://gwa-calculator-ni-baks.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="gwa-button-subtle gwa-button-mobile"
          >
            <BarChart3 size={14} />
            GWA
          </a>
        </header>


        <div className="flex w-full justify-center">
          {/* Main content container with max width */}
          <div className="w-full max-w-7xl flex">
            <main className="flex-1 p-4 lg:p-6 max-w-none">
              <div className="max-w-6xl mx-auto">
                <GradeCalculator />
              </div>
              
              {/* Footer */}
              <footer className="max-w-6xl mx-auto text-center text-xs sm:text-sm text-muted-foreground py-4 mt-8 border-t border-border space-y-2">
                <div className="flex flex-wrap justify-center gap-4 mb-2">
                  <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                  <Link to="/calculations" className="hover:text-primary transition-colors">Calculations</Link>
                  <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                  <Link to="/feedback" className="hover:text-primary transition-colors">Feedback</Link>
                  <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
                  <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                </div>
                <div>
                  Developed by{" "}
                  <a
                    href="https://facebook.com/driqnn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary transition-colors">
                    @driyqnn
                  </a>
                  {" · "}
                  <span className="text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()}
                  </span>
                </div>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
