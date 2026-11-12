import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, ChevronLeft, X, Search, Users, Music, ArrowRight, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAudio } from '../../context/AudioContext';
import { AVALON_BANDS, AVALON_TRACKS } from '../../data/mockData';
import { Band } from '../../types';

interface TopHeaderProps {
  onSelectBand?: (band: Band) => void;
  onOpenSearch?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onSelectBand }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications, markNotificationRead } = useApp();
  const { playTrack } = useAudio();

  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isRootTab = ['/', '/music', '/roster', '/book', '/profile'].includes(location.pathname);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto-focus input when search expands
  useEffect(() => {
    if (isSearchExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isSearchExpanded]);

  // Close search on route change
  useEffect(() => {
    setIsSearchExpanded(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Click outside to collapse search or notification
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        // If clicking outside search dropdown while open
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCloseSearch = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  const matchedBands = searchQuery.trim()
    ? AVALON_BANDS.filter(b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.genre.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const matchedTracks = searchQuery.trim()
    ? AVALON_TRACKS.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <>
      <header className="sticky top-0 z-30 w-full px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/60 to-black/20 backdrop-blur-xl border-b border-white/[0.06] min-w-0 transition-all">
        {/* Inline Search Bar Mode */}
        {isSearchExpanded ? (
          <div className="w-full flex items-center gap-2 animate-in fade-in duration-200">
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-secondary/80 border border-primary/40 shadow-sm focus-within:border-primary transition-all">
              <Search className="header-action-icon text-primary shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search bands, songs, genres..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') handleCloseSearch();
                }}
                className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={handleCloseSearch}
              className="px-2 py-1 text-xs font-semibold text-primary hover:text-primary-hover shrink-0 transition-colors active:scale-95"
            >
              Cancel
            </button>
          </div>
        ) : (
          /* Standard Header Mode */
          <>
            {/* Left Side: Brand Logo or Back Button */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {!isRootTab ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(-1)}
                    className="header-action-btn -ml-1 rounded-xl bg-card hover:bg-secondary text-foreground border border-border transition-all active:scale-95 shrink-0 flex items-center justify-center"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="header-action-icon text-foreground" />
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
                      className="h-8.5 sm:h-9.5 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
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
                    className="h-9 sm:h-10.5 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                  />
                </div>
              )}
            </div>

            {/* Right Side: Inline Search Trigger & Notifications */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Inline Search Trigger Button */}
              <button
                onClick={() => setIsSearchExpanded(true)}
                title="Search bands & tracks"
                className="header-action-btn rounded-xl bg-secondary/70 hover:bg-secondary text-foreground border border-border transition-all active:scale-95 flex items-center justify-center group"
                aria-label="Open inline search"
              >
                <Search className="header-action-icon text-foreground/90 group-hover:text-foreground transition-transform group-hover:scale-105" />
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="header-action-btn rounded-xl bg-secondary/70 hover:bg-secondary text-foreground border border-border transition-all active:scale-95 flex items-center justify-center relative group"
                  aria-label="Notifications"
                >
                  <Bell className="header-action-icon text-foreground/90 group-hover:text-foreground transition-transform group-hover:scale-105" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown Panel */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 sm:w-80 p-3 bg-card border border-border rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-border">
                      <span className="text-xs sm:text-sm font-bold text-foreground">Notifications</span>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-muted-foreground hover:text-foreground text-xs p-1"
                        aria-label="Close notifications"
                      >
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <div className="space-y-2 mt-2 max-h-60 overflow-y-auto no-scrollbar scroll-touch">
                      {notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${n.read
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
          </>
        )}
      </header>

      {/* Inline Search Live Dropdown Results (Floats right beneath the header) */}
      {isSearchExpanded && (
        <div
          ref={dropdownRef}
          className="sticky top-[53px] sm:top-[57px] z-20 w-full px-3.5 sm:px-6 pointer-events-auto"
        >
          <div className="w-full max-w-2xl mx-auto bg-card/98 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl p-3 max-h-[70vh] overflow-y-auto no-scrollbar scroll-touch animate-in fade-in slide-in-from-top-2 duration-200">
            {!searchQuery.trim() ? (
              <div className="space-y-2 py-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Quick Suggestions</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['The Party Feels', 'David Caceres Jazz', 'Wedding Bands', 'CC Rider Band', 'Chamber Music', 'Corporate Gala'].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary-hover text-foreground text-[11px] border border-border active:scale-95 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Matching Bands */}
                {matchedBands.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                      <Users className="w-3 h-3 text-primary" /> Bands ({matchedBands.length})
                    </span>
                    {matchedBands.map(b => (
                      <div
                        key={b.id}
                        onClick={() => {
                          if (onSelectBand) onSelectBand(b);
                          handleCloseSearch();
                        }}
                        className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border flex items-center justify-between cursor-pointer transition-colors active:scale-[0.99]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={b.imageUrl} alt={b.name} className="w-9 h-9 rounded-lg img-avatar-focus shrink-0" />
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-foreground truncate">{b.name}</h4>
                            <p className="text-[10px] text-muted-foreground truncate">{b.genre}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Matching Tracks */}
                {matchedTracks.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                      <Music className="w-3 h-3 text-primary" /> Live Tracks ({matchedTracks.length})
                    </span>
                    {matchedTracks.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          playTrack(t);
                          handleCloseSearch();
                        }}
                        className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border flex items-center justify-between cursor-pointer transition-colors active:scale-[0.99]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                            <img src={t.coverUrl} alt={t.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Play className="w-3 h-3 text-primary fill-primary" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-foreground truncate">{t.title}</h4>
                            <p className="text-[10px] text-muted-foreground truncate">{t.artist}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">{t.duration}</span>
                      </div>
                    ))}
                  </div>
                )}

                {matchedBands.length === 0 && matchedTracks.length === 0 && (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    No matching bands or tracks found for <span className="font-semibold text-foreground">"{searchQuery}"</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
