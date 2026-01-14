import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Add this to src/main.tsx

createRoot(document.getElementById("root")!).render(<App />);
