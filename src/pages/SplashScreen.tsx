import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { hasCompletedOnboarding } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 25;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const handleProceed = () => {
    if (hasCompletedOnboarding) {
      navigate('/');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 bg-gradient-to-b from-background via-card to-background text-foreground overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/15 blur-[90px] pointer-events-none" />

      {/* Top Tagline */}
      <div className="pt-6 text-center z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wider uppercase border border-primary/20">
          <Sparkles className="w-3 h-3" /> Live Music Booking Since 1993
        </span>
      </div>

      {/* Center Brand Identity */}
      <div className="my-auto flex flex-col items-center justify-center text-center z-10 px-4">
        {/* Logo Container */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-3xl bg-secondary/80 border border-primary/30 p-4 shadow-[0_0_40px_var(--primary-glow)] flex items-center justify-center backdrop-blur-xl animate-float">
            <img
              src="/logo.png"
              alt="The Avalon Music Logo"
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          {/* Animated sound pulse circles */}
          <div className="absolute inset-0 -m-3 rounded-[36px] border border-primary/20 animate-ping opacity-30 pointer-events-none" />
        </div>

        <h1 className="text-3xl font-extrabold font-display tracking-tight text-foreground">
          AVALON MUSIC
        </h1>
        <p className="text-xs uppercase tracking-widest text-primary font-bold mt-1">
          Houston, Texas
        </p>

        <p className="mt-3 text-xs text-muted-foreground max-w-xs leading-relaxed">
          Book top-rated live bands, DJs, and classical ensembles for weddings, corporate galas, and celebrations.
        </p>

        {/* 30+ Years Trust Stamp */}
        <div className="mt-5 flex items-center gap-1.5 text-xs text-emerald-400 bg-secondary/60 px-3 py-1.5 rounded-full border border-border">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium text-[11px]">30+ Years of Unmatched Musical Excellence</span>
        </div>
      </div>

      {/* Bottom Actions & Loader */}
      <div className="pb-6 z-10 space-y-4">
        {/* Progress bar */}
        <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={handleProceed}
          className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_var(--primary-glow)] active:scale-95 transition-all hover:bg-primary-hover"
        >
          <span>Explore Live Talent</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
          <span>Weddings</span>
          <span>•</span>
          <span>Corporate Galas</span>
          <span>•</span>
          <span>Private Events</span>
        </div>
      </div>
    </div>
  );
};
