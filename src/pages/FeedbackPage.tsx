import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Star, Heart, MessageSquare, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const FeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert("Please enter your feedback before submitting.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send feedback to Discord webhook
      const webhookUrl = "REPLACE_WITH_YOUR_DISCORD_WEBHOOK_URL"; // Replace this with your actual webhook URL
      
      const discordPayload = {
        embeds: [{
          title: "New Feedback Received",
          color: 0x2563eb,
          fields: [
            {
              name: "Rating",
              value: rating > 0 ? `${rating}/5 stars` : "No rating",
              inline: true
            },
            {
              name: "Email",
              value: email || "Not provided",
              inline: true
            },
            {
              name: "Feedback",
              value: feedback.length > 1024 ? feedback.substring(0, 1021) + "..." : feedback
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: `From: ${window.location.host}`
          }
        }]
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordPayload),
      });

      if (response.ok) {
        alert("Thank you for your feedback! Your suggestions help us improve the grade calculator for everyone.");
        
        // Reset form
        setFeedback("");
        setEmail("");
        setRating(0);
      } else {
        throw new Error("Failed to send feedback");
      }
    } catch (error) {
      alert("Your feedback was recorded but couldn't be sent to our servers. Thank you!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Calculator
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary">Feedback & Suggestions</h1>
              <p className="text-muted-foreground">Help us improve the Grade Calculator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Share Your Thoughts
              </CardTitle>
              <CardDescription>
                Your feedback helps us make the calculator better for everyone. Tell us about bugs, 
                feature requests, or any improvements you'd like to see.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-2">
                  <Label>How would you rate your experience? (Optional)</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        className="transition-colors"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground hover:text-yellow-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll only use this to follow up if needed
                  </p>
                </div>

                {/* Feedback */}
                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback *</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us about your experience, suggestions for improvement, bugs you've encountered, or features you'd love to see..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* What we're looking for */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  What We're Looking For
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium">Bug Reports</h4>
                      <p className="text-sm text-muted-foreground">
                        Found something that's not working correctly? Let us know!
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium">Feature Requests</h4>
                      <p className="text-sm text-muted-foreground">
                        Ideas for new features or improvements to existing ones
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium">Usability Feedback</h4>
                      <p className="text-sm text-muted-foreground">
                        Is something confusing or hard to use? Tell us how to make it better
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium">General Suggestions</h4>
                      <p className="text-sm text-muted-foreground">
                        Any ideas to make the calculator more helpful for students
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Thank You!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This grade calculator is built with students in mind. Your feedback helps us understand 
                  how to make it more useful, accurate, and user-friendly for everyone.
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Quick Tip
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The more specific your feedback, the better we can address your suggestions!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Calculator
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Developed by{" "}
               <a
                 href="https://m.me/09sychicc"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="underline hover:text-primary transition-colors"
               >
                 @09sychic
               </a>
              {" · "}
              <span className="text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeedbackPage;