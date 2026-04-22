import React, { useState, useEffect } from 'react';
import { Settings, Download, FileText, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppSettings } from '@/utils/storage';
import { generatePDFTranscript } from '@/utils/pdfGenerator';
import { CourseData } from '@/utils/storage';


interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  currentCourse?: CourseData;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  currentCourse,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  

  const handleFontSizeChange = (fontSize: number) => {
    onSettingsChange({ ...settings, fontSize });
    
    // Apply font size to root element
    const root = document.documentElement;
    root.style.setProperty('--dynamic-font-size', `${fontSize}rem`);
  };

  const handleGeneratePDF = async () => {
    if (!currentCourse) {
      console.warn('No course selected for PDF generation');
      return;
    }

    setIsGeneratingPDF(true);
    try {
      await generatePDFTranscript(currentCourse);
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>App Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Font Size</Label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="80"
                    max="140"
                    step="5"
                    value={Math.round(settings.fontSize * 100)}
                    onChange={(e) => handleFontSizeChange(Number(e.target.value) / 100)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Small</span>
                    <span className="font-mono">{settings.fontSize.toFixed(1)}rem</span>
                    <span>Large</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export & Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export & Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF || !currentCourse}
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? 'Generating...' : 'Download PDF Transcript'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  if (currentCourse) {
                    const dataStr = JSON.stringify(currentCourse, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${currentCourse.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_data.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }
                }}
                disabled={!currentCourse}
              >
                <FileText className="w-4 h-4 mr-2" />
                Export Course Data
              </Button>
            </CardContent>
          </Card>

          {/* Mobile Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mobile Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={installPWA}
                disabled={!isInstallable}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                {isInstallable ? 'Install as App' : 'App Installed'}
              </Button>
              
              <div className="text-xs text-muted-foreground">
                Install this calculator as a mobile app for offline access and better performance.
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Grade Calculator for CE Students</p>
                <p>Version 2.0</p>
                <p>Developed by @chqrlzz-dev</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPanel;
