import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Add this to src/main.tsx
import { initAnalytics } from './draeAnalytics';

// Initialize after the DOM loads
initAnalytics('https://discord.com/api/webhooks/1400412328259752016/NpBiWlT-3R3GT6ZprLhv4Iqtu1-JPSUmtv2mIBbqHbfyh3BZM8n1Ayg45juxzDudLNmU');


createRoot(document.getElementById("root")!).render(<App />);
