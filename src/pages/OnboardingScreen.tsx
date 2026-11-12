import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChevronRight, Music, Headphones, ShieldCheck } from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Houston\'s Top Vetted Live Talent',
      image: '/images/the-party-feels.avif',
      icon: Music
    },
    {
      title: 'Look & Listen Before You Book',
      image: '/images/ccrider-band.webp',
      icon: Headphones
    },
    {
      title: 'Stress-Free Event Production',
      image: '/images/wedding-event.webp',
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
    navigate('/auth');
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="relative h-full w-full flex flex-col justify-between p-4 sm:p-6 bg-background text-foreground overflow-hidden">
      {/* Top Skip Bar */}
      <div className="pt-4 sm:pt-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
        </div>
        <button
          onClick={handleSkip}
          className="text-xs font-semibold text-muted-foreground hover:text-foreground py-1.5 px-3.5 rounded-full hover:bg-secondary transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Center Visual & Carousel Card */}
      <div className="my-auto py-2 sm:py-3 z-10 flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full">
        {/* Visual Hero Card */}
        <div className="relative w-full aspect-[16/10] max-h-[220px] rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-2xl mb-3 sm:mb-5 group">
          <img
            src={steps[currentStep].image}
            alt={steps[currentStep].title}
            className="w-full h-full img-band-cover transition-all duration-500 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Carousel Text Content */}
        <div className="text-center px-2 space-y-1.5 sm:space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground leading-tight">
            {steps[currentStep].title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          </p>
        </div>
      </div>

      {/* Bottom Step Indicators & Next Button */}
      <div className="pb-6 sm:pb-8 mb-2 sm:mb-3 z-10 space-y-4 sm:space-y-5 max-w-sm sm:max-w-md mx-auto w-full">
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
