import React from "react";
import GradeCalculator from "@/components/GradeCalculator";
import ThemeToggle from "@/components/ThemeToggle";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-6 text-center relative">
          <div className="absolute right-2 top-2">
            <ThemeToggle />
          </div>
        </header>
        <GradeCalculator />
        <footer className="text-center text-sm text-muted-foreground mt-8 pb-4">
          Developed by{" "}
          <a
            href="https://facebook.com/driqnn"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}>
            @driyqnn
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;
