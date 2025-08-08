import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database, AlertTriangle, CheckCircle, Lightbulb, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Calculator
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Privacy Policy
                </h1>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  <Shield className="h-3 w-3 mr-1" />
                  Privacy First
                </Badge>
              </div>
              <p className="text-muted-foreground">Your privacy is our top priority</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Last updated: January {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Privacy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-300">
                <Lock className="h-5 w-5" />
                Local Storage Only
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600 dark:text-green-400">
                All your grade data stays on your device. No cloud storage, no data transmission.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Eye className="h-5 w-5" />
                No Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Zero analytics, cookies, or tracking. We don't know who you are or how you use the app.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Database className="h-5 w-5" />
                Full Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                You own your data completely. Export, delete, or modify it anytime.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Privacy Overview
              </CardTitle>
              <CardDescription>
                Understanding how the Grade Calculator protects your privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-3 text-primary">Our Privacy Promise</h3>
                <p className="text-sm leading-relaxed">
                  The Grade Calculator is built with <strong>privacy by design</strong>. We believe your academic data 
                  is private and should stay private. That's why we've architected the entire application to work 
                  locally in your browser without any need for data collection or transmission.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">✅ What We DO</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Store data locally in your browser</li>
                    <li>• Provide offline functionality</li>
                    <li>• Give you full data control</li>
                    <li>• Respect your privacy completely</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">❌ What We DON'T DO</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Collect personal information</li>
                    <li>• Track your usage or behavior</li>
                    <li>• Store data on our servers</li>
                    <li>• Share data with third parties</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                Information We Do NOT Collect
              </CardTitle>
              <CardDescription>
                Complete transparency about data collection (or lack thereof)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">We Explicitly Do NOT Collect:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Personal identification (names, emails, IDs)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Academic records or grade data
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Usage analytics or tracking data
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Device fingerprints or browser info
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      IP addresses or location data
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Login credentials or passwords
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Tracking cookies or advertising data
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Third-party service integrations
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  How We Achieve This
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  The Grade Calculator is a <strong>client-side application</strong> that runs entirely in your browser. 
                  It has no backend servers, no databases, and no data collection mechanisms. It's technically impossible 
                  for us to collect your data because we never built that capability.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Local Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                Local Data Storage
              </CardTitle>
              <CardDescription>
                How your data is stored safely on your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      What Gets Stored Locally
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside ml-4">
                      <li>Course names and grade data you enter</li>
                      <li>Quiz scores and exam results</li>
                      <li>Application preferences (theme, font size)</li>
                      <li>Target grade settings</li>
                      <li>Quiz count configurations</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      Storage Security
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside ml-4">
                      <li>Data stored in browser's localStorage</li>
                      <li>Protected by browser security measures</li>
                      <li>Isolated from other websites</li>
                      <li>Encrypted at rest by the operating system</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Your Data Control
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">You have complete control:</p>
                    <ul className="text-xs space-y-1 text-green-600 dark:text-green-400 list-disc list-inside ml-2">
                      <li>View all data within the application</li>
                      <li>Export data anytime (JSON or PDF)</li>
                      <li>Delete individual courses or all data</li>
                      <li>Clear data through browser settings</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Important Notes
                    </h4>
                    <ul className="text-xs space-y-1 text-amber-700 dark:text-amber-300 list-disc list-inside ml-2">
                      <li>Clearing browser data will delete all grades</li>
                      <li>Data doesn't sync between devices</li>
                      <li>Export regularly for backup</li>
                      <li>Private/incognito mode doesn't save data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Third-Party Services & Analytics
              </CardTitle>
              <CardDescription>
                Transparency about external services (spoiler: there aren't any)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ No Analytics</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">We don't use:</p>
                  <ul className="text-xs space-y-1 text-red-600 dark:text-red-400 list-disc list-inside ml-2">
                    <li>Google Analytics</li>
                    <li>Facebook Pixel</li>
                    <li>Hotjar or similar tools</li>
                    <li>Any tracking services</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What We Do Use</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-2">Only essential services:</p>
                  <ul className="text-xs space-y-1 text-green-600 dark:text-green-400 list-disc list-inside ml-2">
                    <li>CDN for fonts (no data transmitted)</li>
                    <li>Client-side PDF generation</li>
                    <li>Local mathematical calculations</li>
                    <li>Browser APIs for storage</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Content Delivery
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  The application may load fonts and styling resources from Content Delivery Networks (CDNs) for better 
                  performance. These requests are standard web practice and contain no personal data.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Your Privacy Rights
              </CardTitle>
              <CardDescription>
                Rights that are automatically fulfilled by our privacy-first design
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Since we don't collect personal data, traditional privacy rights are inherently fulfilled:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Right to Access
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      View all your data directly in the application interface
                    </p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Right to Rectification
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Edit any data directly in the app anytime
                    </p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Right to Erasure
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Delete data through the app or browser settings
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Right to Portability
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Export your data using the JSON export function
                    </p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Right to Control
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete control over all data management
                    </p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Right to Know
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Full transparency about data practices (this page!)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Children's Privacy & Educational Use
              </CardTitle>
              <CardDescription>
                Safe for students of all ages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">👶 Safe for All Ages</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  The Grade Calculator is designed for educational use and is safe for students of all ages. 
                  Since we collect no personal information whatsoever, there are no privacy concerns regarding minors.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">For Parents & Guardians</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside ml-2">
                    <li>No account creation or personal info required</li>
                    <li>Data stays on the device being used</li>
                    <li>No communication with external servers</li>
                    <li>No advertising or inappropriate content</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">For Educators</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside ml-2">
                    <li>COPPA and FERPA compliant by design</li>
                    <li>No student data collection</li>
                    <li>Safe to recommend for any educational level</li>
                    <li>Encourages academic responsibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                International Users & Compliance
              </CardTitle>
              <CardDescription>
                Privacy compliance across jurisdictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🌍 Global Privacy Compliance</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  The Grade Calculator's privacy-first architecture automatically complies with major privacy regulations:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white/50 dark:bg-background/50 rounded-lg">
                    <h4 className="font-medium text-sm">GDPR</h4>
                    <p className="text-xs text-muted-foreground">European Union</p>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-background/50 rounded-lg">
                    <h4 className="font-medium text-sm">CCPA</h4>
                    <p className="text-xs text-muted-foreground">California, USA</p>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-background/50 rounded-lg">
                    <h4 className="font-medium text-sm">PIPEDA</h4>
                    <p className="text-xs text-muted-foreground">Canada</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-2">Why Compliance is Automatic</h4>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside ml-2">
                  <li>No international data transfers (all processing is local)</li>
                  <li>No data collection means no compliance requirements</li>
                  <li>Local privacy laws apply to your use of the service</li>
                  <li>No cookies or tracking mechanisms to manage</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Questions About This Policy
              </CardTitle>
              <CardDescription>
                How to reach us about privacy concerns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Developer:</strong> @09sychic
                  </p>
                  <p className="text-sm">
                    <strong>Contact:</strong>{" "}
                    <a 
                      href="https://m.me/09sychicc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Facebook Messenger
                    </a>
                  </p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💭 Common Questions Answered</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Most privacy questions are addressed by our local-storage approach. Since we don't collect 
                  personal data, most privacy inquiries don't apply to our service model. Feel free to reach 
                  out if you need clarification!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Policy Updates
              </CardTitle>
              <CardDescription>
                How we handle changes to this privacy policy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Changes to This Policy</h3>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside ml-2">
                  <li>Updates will be posted on this page with revision dates</li>
                  <li>Material changes will be highlighted prominently</li>
                  <li>Continued use constitutes acceptance of updates</li>
                  <li>We recommend periodic review of this policy</li>
                </ul>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Notification Limitation
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Since we don't collect contact information, we cannot notify users directly of policy changes. 
                  We encourage bookmarking this page and checking back periodically.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
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
              <Link to="/feedback" className="text-muted-foreground hover:text-primary transition-colors">
                Feedback
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
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

export default PrivacyPage;