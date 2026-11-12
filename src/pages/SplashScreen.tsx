import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 20;
      });
    }, 250);

    return () => clearInterval(timer);
  }, []);

  // When splash progress completes, automatically navigate to onboarding
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        navigate('/onboarding');
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  const handleProceed = () => {
    navigate('/onboarding');
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-between p-6 bg-gradient-to-b from-background via-card to-background text-foreground overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/15 blur-[90px] pointer-events-none" />
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
          <div className="absolute inset-0 -m-3 rounded-2xl border border-primary/20 animate-ping opacity-30 pointer-events-none" />
        </div>

        <h1 className="text-3xl font-extrabold font-display tracking-tight text-foreground">
          AVALON MUSIC
        </h1>
        <p className="text-xs uppercase tracking-widest text-primary font-bold mt-1">
          Houston, Texas
        </p>
      </div>

      {/* Bottom Actions & Loader */}
      <div className="pb-6 z-10 space-y-4 max-w-sm sm:max-w-md mx-auto w-full">
        {/* Progress bar */}
        <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
