import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, ChevronLeft, X, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TopHeaderProps {
  onOpenSearch?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications, markNotificationRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const isRootTab = ['/', '/music', '/roster', '/book', '/profile'].includes(location.pathname);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-20 w-full px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between glass-nav border-b border-border min-w-0">
        {/* Left Side: Brand Logo or Back Button */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {!isRootTab ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-1.5 sm:p-2 -ml-1 rounded-xl bg-card hover:bg-secondary text-foreground border border-border transition-all active:scale-95 shrink-0"
                aria-label="Go back"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div 
                onClick={() => navigate('/')} 
                className="flex items-center cursor-pointer select-none active:scale-95 transition-transform shrink-0"
                role="button"
                aria-label="Avalon Music Home"
              >
                <img 
                  src="/logo.png" 
                  alt="Avalon Music" 
                  className="h-7 sm:h-8 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" 
                />
              </div>
            </div>
          ) : (
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center cursor-pointer select-none active:scale-95 transition-transform shrink-0"
              role="button"
              aria-label="Avalon Music Home"
            >
              <img 
                src="/logo.png" 
                alt="Avalon Music" 
                className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" 
              />
            </div>
          )}
        </div>

        {/* Right Side: Search & Notifications */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Search */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              title="Search bands & tracks"
              className="p-1.5 sm:p-2 rounded-xl bg-secondary/70 hover:bg-secondary text-foreground border border-border transition-colors active:scale-95"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 sm:p-2 rounded-xl bg-secondary/70 hover:bg-secondary text-foreground border border-border transition-all active:scale-95 relative"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 sm:w-80 p-3 bg-card border border-border rounded-2xl shadow-2xl z-50">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-xs sm:text-sm font-bold text-foreground">Notifications</span>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="space-y-2 mt-2 max-h-60 overflow-y-auto no-scrollbar scroll-touch">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        n.read 
                          ? 'bg-secondary/40 border-border text-muted-foreground' 
                          : 'bg-primary/10 border-primary/30 text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{n.title}</span>
                        <span className="text-[10px] text-muted-foreground">{n.time}</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
