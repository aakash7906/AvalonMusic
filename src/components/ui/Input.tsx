import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type, icon, rightIcon, ...props }, ref) => {
    if (icon || rightIcon) {
      return (
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={`w-full rounded-xl border border-white/10 bg-[#181818] py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 ${
              icon ? 'pl-10' : 'pl-3.5'
            } ${rightIcon ? 'pr-10' : 'pr-3.5'} ${className}`}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={`w-full rounded-xl border border-white/10 bg-[#181818] px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
