import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAudio } from '../../context/AudioContext';
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  BatteryMedium, 
  PhoneCall, 
  Sparkles, 
  QrCode, 
  Music,
  Share2,
  X
} from 'lucide-react';

interface DesktopMobileFrameProps {
  children: React.ReactNode;
}

export const DesktopMobileFrame: React.FC<DesktopMobileFrameProps> = ({ children }) => {
  const { frameSettings, updateFrameSettings, showToast } = useApp();
  const { currentTrack, isPlaying } = useAudio();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

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

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('App URL copied to clipboard!', 'success');
  };

  return (
    <div className="w-full h-full min-h-screen bg-background text-foreground flex flex-col min-w-0 max-w-full overflow-hidden">
      {/* =========================================================================
          1. NATIVE MOBILE VIEWPORT (< 768px md:hidden)
          100% full screen with native mobile ergonomics, locked to viewport height!
         ========================================================================= */}
      <div className="flex md:hidden flex-col w-full h-[100dvh] min-w-0 max-w-full overflow-hidden relative bg-background">
        {children}
      </div>

      {/* =========================================================================
          2. DESKTOP VIEWPORT (>= 768px hidden md:flex)
          Presents the high-end mobile frame simulator with desktop utilities
         ========================================================================= */}
      <div className="hidden md:flex min-h-screen w-full flex-col items-center justify-center relative py-12 bg-background overflow-hidden">
        {/* Background Ambient Glow & Subtle Texture */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-primary/10 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', 
              backgroundSize: '36px 36px' 
            }} 
          />
        </div>

        {/* Desktop Top Floating Utility Bar */}
        <div className="fixed top-3 z-40 flex items-center justify-between w-[92%] max-w-5xl px-5 py-2.5 rounded-2xl glass-panel-elevated text-xs transition-all">
          {/* Brand identity */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-black/40 p-1 flex items-center justify-center border border-border">
              <img src="/logo.png" alt="Avalon Music" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-display font-bold text-foreground flex items-center gap-1.5">
                <span>AVALON MUSIC</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">HOUSTON</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Premier Live Bands & DJs • Since 1993</p>
            </div>
          </div>

          {/* Center Controls: View Toggle & Device Skin */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-secondary/80 p-0.5 rounded-xl border border-border">
              <button
                onClick={() => updateFrameSettings({ enabled: true })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  frameSettings.enabled
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Frame</span>
              </button>
              <button
                onClick={() => updateFrameSettings({ enabled: false })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  !frameSettings.enabled
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </button>
            </div>

            {frameSettings.enabled && (
              <div className="hidden lg:flex items-center gap-1 bg-secondary/60 px-2 py-1 rounded-xl border border-border">
                <span className="text-[10px] text-muted-foreground mr-1">Finish:</span>
                {(['titanium', 'midnight', 'gold', 'silver'] as const).map(skin => (
                  <button
                    key={skin}
                    onClick={() => updateFrameSettings({ skin })}
                    className={`px-2 py-0.5 rounded-md text-[10px] capitalize transition-all ${
                      frameSettings.skin === skin
                        ? 'bg-card text-primary font-semibold border border-primary/30'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {skin}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right utilities: Concierge hotline & QR */}
          <div className="flex items-center gap-2">
            <a
              href="tel:8327238886"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card hover:bg-secondary text-primary border border-border transition-colors font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="font-semibold">(832) 723-8886</span>
            </a>
            <button
              onClick={() => setShowQrModal(true)}
              title="Scan QR to open on phone"
              className="p-2 rounded-xl bg-secondary hover:bg-secondary-hover text-muted-foreground hover:text-foreground border border-border transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyLink}
              title="Share App"
              className="p-2 rounded-xl bg-secondary hover:bg-secondary-hover text-muted-foreground hover:text-foreground border border-border transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Desktop Container */}
        {frameSettings.enabled ? (
          /* Smartphone Shell on Desktop */
          <div className="relative group my-auto">
            <div
              className={`w-[412px] h-[850px] max-h-[calc(100vh-80px)] rounded-[48px] border-[10px] ${
                skinStyles[frameSettings.skin]
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
                      <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-primary" /> Avalon Live
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
              <div className="flex-1 w-full overflow-hidden relative flex flex-col bg-background min-w-0">
                {children}
              </div>

              {/* Bottom Home Indicator Pill */}
              <div className="w-full py-1.5 flex items-center justify-center bg-background select-none shrink-0 border-t border-border/30">
                <div className="w-32 h-1 bg-white/20 rounded-full hover:bg-white/40 transition-colors" />
              </div>
            </div>
          </div>
        ) : (
          /* Full Screen Responsive Desktop View */
          <div className="w-full max-w-2xl mx-auto h-[90vh] flex flex-col bg-background relative shadow-2xl border-x border-border min-w-0 rounded-2xl overflow-hidden">
            {children}
          </div>
        )}
      </div>

      {/* QR Code Modal for Phone Testing */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-card border border-border p-6 rounded-2xl max-w-sm w-full relative shadow-2xl text-center">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-foreground">Open on Mobile Device</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Scan with your smartphone camera to experience Avalon Music native mobile responsive app directly.
            </p>
            <div className="bg-white p-4 rounded-xl inline-block shadow-inner">
              <svg className="w-40 h-40 text-black" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z" />
                <path d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z" />
                <path d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z" />
                <path d="M35,10 h10 v5 h-10 z M50,5 h5 v15 h-5 z M35,25 h15 v5 h-15 z M55,20 h10 v10 h-10 z" />
                <path d="M10,40 h15 v5 h-15 z M5,55 h10 v10 h-10 z M25,45 h10 v15 h-10 z" />
                <path d="M40,40 h20 v20 h-20 z M45,45 h10 v10 h-10 z" />
                <path d="M70,40 h10 v10 h-10 z M85,45 h10 v20 h-10 z M65,55 h15 v5 h-15 z" />
                <path d="M35,70 h10 v10 h-10 z M50,65 h10 v15 h-10 z M40,85 h20 v10 h-20 z" />
                <path d="M70,75 h15 v5 h-15 z M75,85 h10 v10 h-10 z M90,70 h5 v25 h-5 z" />
              </svg>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{window.location.origin}</span>
              <button
                onClick={handleCopyLink}
                className="text-primary hover:underline font-semibold"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
