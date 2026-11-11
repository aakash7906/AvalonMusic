import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative w-full">
          <div className="absolute left-3.5 top-3 flex items-center pointer-events-none text-muted-foreground">
            {icon}
          </div>
          <textarea
            className={`w-full rounded-xl border border-white/10 bg-[#181818] py-2.5 sm:py-3 pl-10 pr-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <textarea
        className={`w-full rounded-xl border border-white/10 bg-[#181818] px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
