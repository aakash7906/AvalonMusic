import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChevronRight, Music, Headphones, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Houston\'s Top Vetted Live Talent',
      subtitle: 'From 10-piece high-energy brass party bands to intimate jazz quartets and ceremony strings, explore Houston\'s finest musicians.',
      image: '/images/the-party-feels.avif',
      tag: 'Handpicked Excellence',
      icon: Music
    },
    {
      title: 'Look & Listen Before You Book',
      subtitle: 'Stream studio tracks, compare vocalists, and watch live wedding and corporate gala videos before making any decision.',
      image: '/images/ccrider-band.webp',
      tag: 'Studio & Live Audio',
      icon: Headphones
    },
    {
      title: 'Stress-Free Event Production',
      subtitle: 'Backed by over 30 years of experience, our music directors handle all logistics, timeline planning, and vendor coordination.',
      image: '/images/wedding-event.webp',
      tag: 'Avalon Guarantee',
      icon: ShieldCheck
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/');
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 bg-background text-foreground overflow-hidden">
      {/* Top Skip Bar */}
      <div className="pt-2 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-black/40 border border-border p-1 flex items-center justify-center">
            <img src="/logo.png" alt="Avalon" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-bold font-display tracking-wide text-foreground">AVALON MUSIC</span>
        </div>

        <button
          onClick={handleSkip}
          className="text-xs font-medium text-muted-foreground hover:text-foreground py-1 px-3 rounded-full hover:bg-secondary transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Center Visual & Carousel Card */}
      <div className="my-auto py-4 z-10 flex flex-col items-center">
        {/* Visual Hero Card */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-2xl mb-6 group">
          <img
            src={steps[currentStep].image}
            alt={steps[currentStep].title}
            className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Floating Pill Tag */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-primary">
            <StepIcon className="w-3.5 h-3.5 text-primary" />
            <span>{steps[currentStep].tag}</span>
          </div>
        </div>

        {/* Carousel Text Content */}
        <div className="text-center px-2 space-y-2">
          <h2 className="text-2xl font-extrabold font-display text-foreground leading-tight">
            {steps[currentStep].title}
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {steps[currentStep].subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Step Indicators & Next Button */}
      <div className="pb-4 z-10 space-y-6">
        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-8 bg-primary' : 'w-2 bg-secondary hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="py-3 px-4 rounded-2xl bg-secondary hover:bg-secondary-hover text-foreground font-semibold text-xs border border-border transition-colors active:scale-95"
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_20px_var(--primary-glow)] active:scale-95 transition-all hover:bg-primary-hover"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
