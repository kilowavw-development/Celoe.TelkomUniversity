import React, { useState } from 'react';
import { ArrowLeft, Settings, GraduationCap, X, Key, Check } from 'lucide-react';

export default function App() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [surpriseUrl, setSurpriseUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const triggerSurprise = (type: string) => {
    // Show a funny surprise full screen
    setSurpriseUrl(`https://picsum.photos/seed/funny-student-${type}/1200/800`);
    setShowSurprise(true);
    console.log(`Surprise triggered via ${type}!`);
  };

  const copyKey = async () => {
    const key = "AIzaSyDb40X42BAmll6bfOAXEyrbiDvJgZ3yFWY";
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white font-sans">
      {!showSurprise ? (
        <>
          {/* Real Website Content as Backdrop (Telkom University LMS) */}
          <iframe 
            src="https://lms.telkomuniversity.ac.id/" 
            className="w-full h-full border-none"
            title="Telkom University LMS"
          />

          {/* "Curiosity" Buttons - Top Right Corner */}
          <div className="absolute top-2 right-2 flex items-center gap-2 z-50">
            {/* 1. Back Button (Semi-visible) */}
            <button
              onClick={() => triggerSurprise('back')}
              className="p-2 rounded-md bg-black/5 hover:bg-black/10 text-black/20 hover:text-black/40 transition-all border border-black/5 flex items-center gap-1 cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[10px] font-medium uppercase tracking-tighter">Back</span>
            </button>

            {/* 2. Icon Button (Settings) */}
            <button
              onClick={() => triggerSurprise('settings')}
              className="p-2 rounded-md bg-black/5 hover:bg-black/10 text-black/20 hover:text-black/40 transition-all border border-black/5 cursor-pointer"
              title="Portal Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* 3. Copy Key Button (New) */}
            <button
              onClick={copyKey}
              className="p-2 rounded-md bg-black/5 hover:bg-black/10 text-black/20 hover:text-black/40 transition-all border border-black/5 flex items-center gap-1 cursor-pointer"
              title="Copy Access Key"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Key className="w-4 h-4" />}
              <span className="text-[10px] font-medium uppercase tracking-tighter">{copied ? 'Copied' : 'Key'}</span>
            </button>

            {/* 4. Button with Text (Grades/Academic) */}
            <button
              onClick={() => triggerSurprise('grades')}
              className="px-3 py-2 rounded-md bg-black/5 hover:bg-black/10 text-black/20 hover:text-black/40 transition-all border border-black/5 flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-600/40">Check Final Grades</span>
            </button>
          </div>
        </>
      ) : (
        /* The Surprise View */
        <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
          <img 
            src={surpriseUrl} 
            alt="Surprise!" 
            className="max-w-full max-h-full object-contain shadow-2xl shadow-white/10"
            referrerPolicy="no-referrer"
          />
          
          {/* Fun system text */}
          <div className="absolute bottom-10 left-10 right-10 text-center">
            <p className="text-red-500 font-mono text-sm animate-pulse">
              CRITICAL ACADEMIC ERROR: UNEXPECTED STUDENT ASSET DETECTED
            </p>
          </div>

          {/* A functional close button to return to the main site */}
          <button 
            onClick={() => setShowSurprise(false)}
            className="absolute top-5 right-5 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer z-[110]"
            title="Close"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
