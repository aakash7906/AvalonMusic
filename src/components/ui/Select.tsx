import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  registerItem: (value: string, label: string) => void;
  getItemLabel: (value: string) => string | undefined;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const SelectContext = createContext<SelectContextType | null>(null);

function useSelect() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components must be used within a <Select />');
  }
  return context;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  children,
  disabled = false,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const itemsMap = useRef<Map<string, string>>(new Map());
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
      setOpen(false);
    },
    [isControlled, onValueChange]
  );

  const registerItem = useCallback((val: string, label: string) => {
    itemsMap.current.set(val, label);
  }, []);

  const getItemLabel = useCallback((val: string) => {
    return itemsMap.current.get(val);
  }, []);

  // Close on outside click or escape
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open: disabled ? false : open,
        setOpen: disabled ? () => {} : setOpen,
        registerItem,
        getItemLabel,
        triggerRef,
      }}
    >
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: React.ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className = '', children, icon, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef } = useSelect();

    return (
      <button
        ref={(node) => {
          triggerRef.current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 text-xs sm:text-sm text-foreground transition-all duration-200 cursor-pointer shadow-sm select-none ${
          open ? 'border-white/40 ring-1 ring-white/20 bg-[#202020]' : ''
        } ${className}`}
        {...props}
      >
        <div className="flex items-center gap-2.5 min-w-0 overflow-hidden text-left flex-1">
          {icon && <span className="text-muted-foreground shrink-0">{icon}</span>}
          <div className="truncate flex-1">{children}</div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-foreground' : ''
          }`}
        />
      </button>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

export interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder = 'Select an option...',
  className = '',
}) => {
  const { value, getItemLabel } = useSelect();
  const label = getItemLabel(value);

  if (!value && !label) {
    return <span className={`text-muted-foreground ${className}`}>{placeholder}</span>;
  }

  return (
    <span className={`text-foreground font-medium truncate block ${className}`}>
      {label || value}
    </span>
  );
};

export interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const SelectContent: React.FC<SelectContentProps> = ({
  children,
  className = '',
  maxHeight = 'max-h-64',
}) => {
  const { open } = useSelect();

  if (!open) return null;

  return (
    <div
      role="listbox"
      className={`absolute left-0 right-0 top-full mt-1.5 z-50 min-w-[8rem] ${maxHeight} overflow-y-auto rounded-xl bg-[#1c1c1c] border border-white/15 shadow-[0_14px_45px_rgba(0,0,0,0.92)] p-1.5 text-foreground backdrop-blur-2xl transition-all duration-150 animate-in fade-in-0 zoom-in-95 ${className}`}
      style={{
        scrollbarWidth: 'none',
      }}
    >
      <div className="space-y-0.5">{children}</div>
    </div>
  );
};

export interface SelectItemProps {
  value: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  sublabel?: string;
  badge?: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  label,
  children,
  className = '',
  disabled = false,
  sublabel,
  badge,
}) => {
  const { value: selectedValue, onValueChange, registerItem } = useSelect();
  const isSelected = selectedValue === value;

  // Register string label for display in SelectValue
  useEffect(() => {
    const textLabel = label || (typeof children === 'string' ? children : value);
    registerItem(value, textLabel);
  }, [value, label, children, registerItem]);

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => {
        if (!disabled) {
          onValueChange(value);
        }
      }}
      className={`relative flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs sm:text-sm cursor-pointer select-none transition-colors duration-150 ${
        disabled
          ? 'opacity-40 pointer-events-none'
          : isSelected
          ? 'bg-white/15 text-white font-semibold'
          : 'text-neutral-300 hover:bg-white/8 hover:text-white'
      } ${className}`}
    >
      <div className="flex flex-col min-w-0 pr-2">
        <span className="truncate">{children}</span>
        {sublabel && (
          <span className="text-[10px] sm:text-[11px] text-muted-foreground font-normal truncate mt-0.5">
            {sublabel}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-auto">
        {badge && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/5">
            {badge}
          </span>
        )}
        {isSelected && (
          <Check className="w-3.5 h-3.5 text-white shrink-0" />
        )}
      </div>
    </div>
  );
};

export const SelectGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`py-1 ${className}`}>{children}</div>;
};

export const SelectLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground ${className}`}>
      {children}
    </div>
  );
};

export const SelectSeparator: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`my-1 h-px bg-white/10 ${className}`} />;
};
