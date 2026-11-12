import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAudio } from '../../context/AudioContext';
import { 
  Wifi, 
  BatteryMedium, 
  Music
} from 'lucide-react';

interface DesktopMobileFrameProps {
  children: React.ReactNode;
}

export const DesktopMobileFrame: React.FC<DesktopMobileFrameProps> = ({ children }) => {
  const { frameSettings } = useApp();
  const { currentTrack, isPlaying } = useAudio();
  const [currentTime, setCurrentTime] = useState<string>('');

  // Update status bar clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      hours = hours % 12;
      hours = hours ? hours : 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const skinStyles = {
    titanium: 'border-[#2d3748] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(245,166,35,0.12)] bg-[#0b0f17]',
    midnight: 'border-[#1a2234] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(30,58,138,0.15)] bg-[#070a10]',
    gold: 'border-[#85642a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_45px_rgba(245,166,35,0.25)] bg-[#0f1118]',
    silver: 'border-[#4a5568] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.1)] bg-[#0d121c]'
  };

  return (
    <div className="w-full h-full min-h-[100dvh] max-h-[100dvh] bg-background text-foreground flex flex-col min-w-0 max-w-full overflow-hidden">
      {/* =========================================================================
          1. NATIVE MOBILE & TABLET VIEWPORT (<= 960px)
          Seamlessly adapts to phone and tablet viewports up to 960px
         ========================================================================= */}
      <div className="mobile-only-view flex-col w-full h-[100dvh] min-w-0 max-w-full overflow-hidden relative bg-background">
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col min-w-0">
          {children}
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP VIEWPORT (> 960px)
          Presents the high-end mobile frame simulator centered in the browser
         ========================================================================= */}
      <div className="desktop-only-frame min-h-screen w-full flex-col items-center justify-center relative p-4 bg-background overflow-hidden">
        {/* Background Ambient Glow & Subtle Texture */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-primary/10 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
          <div 
            className="absolute inset-0 opacity-[0.05] text-foreground" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', 
              backgroundSize: '32px 32px' 
            }} 
          />
        </div>

        {/* Smartphone Shell Centered on Desktop (> 960px) */}
        <div className="relative group my-auto z-10">
          <div
            className={`w-[412px] h-[850px] max-h-[calc(100vh-40px)] rounded-[48px] border-[10px] ${
              skinStyles[frameSettings.skin || 'titanium']
            } relative flex flex-col overflow-hidden transition-all duration-300 shadow-2xl min-w-0`}
          >
            {/* Hardware buttons on side */}
            <div className="absolute -left-[13px] top-28 w-[3px] h-8 bg-zinc-600 rounded-l-sm" />
            <div className="absolute -left-[13px] top-40 w-[3px] h-12 bg-zinc-600 rounded-l-sm" />
            <div className="absolute -left-[13px] top-56 w-[3px] h-12 bg-zinc-600 rounded-l-sm" />
            <div className="absolute -right-[13px] top-36 w-[3px] h-16 bg-zinc-600 rounded-r-sm" />

            {/* Mobile Phone Status Bar */}
            <header className="w-full pt-2.5 pb-1 px-6 flex items-center justify-between text-xs bg-background select-none shrink-0 border-b border-border/40">
              <span className="font-semibold text-[13px] tracking-tight text-foreground/90 pl-1">
                {currentTime || '9:41'}
              </span>

              {/* Dynamic Island */}
              <div className="flex items-center justify-center">
                <div className="bg-black text-white px-3 py-1 rounded-full flex items-center gap-2 border border-white/10 shadow-sm min-w-[100px] h-[26px]">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {isPlaying && currentTrack ? (
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <Music className="w-3 h-3 text-primary animate-spin-slow shrink-0" />
                      <span className="text-[10px] font-medium text-foreground truncate max-w-[70px]">
                        {currentTrack.title}
                      </span>
                      <div className="flex items-end gap-0.5 h-2.5 shrink-0">
                        <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="w-0.5 h-3 bg-primary rounded-full animate-bounce" />
                        <span className="w-0.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Avalon Live
                    </span>
                  )}
                </div>
              </div>

              {/* System Icons */}
              <div className="flex items-center gap-1.5 text-foreground/80 pr-1">
                <span className="text-[10px] font-bold text-muted-foreground">5G</span>
                <Wifi className="w-3.5 h-3.5" />
                <div className="flex items-center gap-0.5">
                  <BatteryMedium className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </header>

            {/* Inner App Content: Fills remaining height, contains fixed top/bottom and scrollable body */}
            <div className="flex-1 w-full overflow-hidden relative flex flex-col bg-background min-w-0 mobile-frame-view">
              {children}
            </div>

            {/* Bottom Home Indicator Pill */}
            <div className="w-full py-1.5 flex items-center justify-center bg-background select-none shrink-0 border-t border-border/30">
              <div className="w-32 h-1 bg-foreground/20 rounded-full hover:bg-foreground/40 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
