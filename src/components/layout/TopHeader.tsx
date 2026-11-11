import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, MapPin, ChevronLeft, Phone, X, Search, Info, HelpCircle } from 'lucide-react';
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
      <header className="sticky top-0 z-20 w-full px-3.5 py-2.5 flex items-center justify-between glass-nav border-b border-border min-w-0">
        {/* Left Side: Brand Logo or Back Button */}
        <div className="flex items-center gap-2 min-w-0">
          {!isRootTab ? (
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1 rounded-xl bg-card hover:bg-secondary text-foreground border border-border transition-all active:scale-95 shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 cursor-pointer group shrink-0"
            >
              <div className="h-7 w-auto px-1.5 py-0.5 rounded-lg bg-black/40 border border-border flex items-center justify-center">
                <img src="/logo.png" alt="Avalon Music" className="h-5 w-auto object-contain" />
              </div>
            </div>
          )}

          {/* Location Badge */}
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full border border-border/60 shrink-0">
            <MapPin className="w-2.5 h-2.5 text-primary shrink-0" />
            <span className="font-semibold text-foreground">Houston</span>
          </div>
        </div>

        {/* Right Side: Search, Quick Call & Notifications */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Search */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              title="Search bands & tracks"
              className="p-1.5 rounded-xl bg-secondary/70 hover:bg-secondary text-foreground border border-border transition-colors active:scale-95"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Concierge Hotline */}
          <a
            href="tel:8327238886"
            title="Call Avalon Music (832) 723-8886"
            className="p-1.5 rounded-xl bg-secondary/70 hover:bg-secondary text-primary border border-border transition-colors flex items-center gap-1 text-xs active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px] font-bold">Call</span>
          </a>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded-xl bg-secondary/70 hover:bg-secondary text-foreground border border-border transition-all active:scale-95 relative"
            >
              <Bell className="w-3.5 h-3.5 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 p-3 bg-card border border-border rounded-2xl shadow-2xl z-50">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-xs font-bold text-foreground">Notifications</span>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
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
