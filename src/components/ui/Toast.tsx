import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { activeToast, clearToast } = useApp();

  if (!activeToast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-primary shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
  };

  return (
    <div className="toast-notification fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
      <div className="glass-panel-elevated p-3 rounded-2xl flex items-center justify-between gap-3 shadow-2xl border border-primary/30">
        <div className="flex items-center gap-2.5 min-w-0">
          {icons[activeToast.type]}
          <p className="text-xs font-medium text-foreground truncate">
            {activeToast.message}
          </p>
        </div>
        <button
          onClick={clearToast}
          className="p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
