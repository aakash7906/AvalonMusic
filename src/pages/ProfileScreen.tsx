import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Heart, 
  CalendarCheck, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Play, 
  Smartphone, 
  CheckCircle2, 
  Trash2,
  HelpCircle,
  Info,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { AVALON_BANDS, AVALON_TRACKS } from '../data/mockData';
import { Band } from '../types';

interface ProfileScreenProps {
  onSelectBand: (band: Band) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSelectBand }) => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, favorites, toggleFavorite, inquiries, frameSettings, updateFrameSettings } = useApp();
  const { playTrack } = useAudio();

  const [activeTab, setActiveTab] = useState<'favorites' | 'inquiries' | 'settings'>('favorites');

  const favoriteBands = AVALON_BANDS.filter(b => favorites.includes(b.id));
  const favoriteTracks = AVALON_TRACKS.filter(t => favorites.includes(t.id));

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-4 px-3.5 pt-3 pb-24 text-foreground overflow-x-hidden">
      {/* User Header Profile Card */}
      <div className="p-4 rounded-3xl bg-card border border-border shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-amber-300 text-primary-foreground font-black text-lg flex items-center justify-center shadow-lg">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold font-display text-foreground truncate">
                {user?.name || 'Avalon Guest'}
              </h2>
              <p className="text-xs text-primary font-semibold truncate">
                {user?.role || 'Live Music Enthusiast'}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">{user?.email || 'guest@avalonmusic.com'}</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isLoggedIn) {
                logout();
                navigate('/auth');
              } else {
                navigate('/auth');
              }
            }}
            className="p-2 rounded-xl bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-colors shrink-0"
          >
            {isLoggedIn ? <LogOut className="w-4 h-4 text-red-400" /> : <User className="w-4 h-4 text-primary" />}
            <span className="text-[11px]">{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
          </button>
        </div>

        {/* Quick event tracker */}
        {user?.eventDate && (
          <div className="p-2.5 rounded-xl bg-secondary/60 border border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Target Event Date:</span>
            <span className="font-bold text-foreground">{user.eventDate}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-secondary/80 p-1 rounded-2xl border border-border">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Saved ({favoriteBands.length + favoriteTracks.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'inquiries'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Quotes ({inquiries.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </div>

      {/* Tab 1: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-4 pt-1">
          {favoriteBands.length === 0 && favoriteTracks.length === 0 ? (
            <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-2">
              <Heart className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
              <h3 className="text-xs font-bold text-foreground">No Favorites Saved Yet</h3>
              <p className="text-[11px] text-muted-foreground">
                Tap the heart icon on any band or track to save it here for easy reference.
              </p>
              <button
                onClick={() => navigate('/roster')}
                className="mt-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs"
              >
                Browse Bands
              </button>
            </div>
          ) : (
            <>
              {/* Saved Bands */}
              {favoriteBands.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Shortlisted Bands ({favoriteBands.length})
                  </h3>
                  {favoriteBands.map(band => (
                    <div
                      key={band.id}
                      onClick={() => onSelectBand(band)}
                      className="p-3 rounded-2xl bg-card border border-border flex items-center justify-between gap-3 cursor-pointer hover:border-primary/50 transition-all min-w-0"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={band.imageUrl} alt={band.name} className="w-11 h-11 rounded-xl object-cover shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-foreground truncate">{band.name}</h4>
                          <p className="text-[10px] text-muted-foreground truncate">{band.genre} • {band.startingPrice}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => navigate(`/book?band=${encodeURIComponent(band.name)}`)}
                          className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
                        >
                          Book
                        </button>
                        <button
                          onClick={() => toggleFavorite(band.id)}
                          className="p-1.5 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Saved Tracks */}
              {favoriteTracks.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Favorite Tracks ({favoriteTracks.length})
                  </h3>
                  {favoriteTracks.map(track => (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className="p-2.5 rounded-2xl bg-card border border-border flex items-center justify-between gap-3 cursor-pointer hover:border-primary/50 transition-all min-w-0"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">
                          <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-foreground truncate">{track.title}</h4>
                          <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => playTrack(track)}
                          className="p-1.5 rounded-lg bg-primary/20 text-primary"
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(track.id)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Tab 2: Booking Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="space-y-3 pt-1">
          {inquiries.length === 0 ? (
            <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-2">
              <CalendarCheck className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
              <h3 className="text-xs font-bold text-foreground">No Active Inquiries</h3>
              <p className="text-[11px] text-muted-foreground">
                Request a quote for any band or DJ to see your real-time booking status here.
              </p>
              <button
                onClick={() => navigate('/book')}
                className="mt-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs"
              >
                Request Quote
              </button>
            </div>
          ) : (
            inquiries.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-card border border-border shadow-lg space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold">
                    Ref #{item.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'Reviewing'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    ● {item.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-foreground">{item.bandOrService}</h4>
                  <p className="text-xs text-muted-foreground">{item.eventType} • {item.venue}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-secondary/60 border border-border text-xs flex justify-between">
                  <div>
                    <span className="text-muted-foreground text-[10px]">Date:</span>
                    <p className="font-semibold text-foreground">{item.eventDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground text-[10px]">Estimated Range:</span>
                    <p className="font-bold text-primary">{item.estimatedBudget || '$3,200+'}</p>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">Created {item.createdAt}</span>
                  <a
                    href="tel:8327238886"
                    className="text-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Concierge</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Settings & Preferences */}
      {activeTab === 'settings' && (
        <div className="space-y-3 pt-1">
          {/* Quick Nav Links */}
          <div className="p-3 rounded-2xl bg-card border border-border space-y-1">
            <button
              onClick={() => navigate('/about')}
              className="w-full p-2.5 rounded-xl hover:bg-secondary flex items-center justify-between text-xs font-semibold text-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                <span>About Avalon Music (30+ Years)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button
              onClick={() => navigate('/faq')}
              className="w-full p-2.5 rounded-xl hover:bg-secondary flex items-center justify-between text-xs font-semibold text-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span>Frequently Asked Questions</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button
              onClick={() => navigate('/events')}
              className="w-full p-2.5 rounded-xl hover:bg-secondary flex items-center justify-between text-xs font-semibold text-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Live Band Showcases in Houston</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Frame Skin Preference */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Desktop Frame Device Skin</span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Select the smartphone shell appearance when viewing on desktop browsers.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {(['titanium', 'midnight', 'gold', 'silver'] as const).map(skin => (
                <button
                  key={skin}
                  onClick={() => updateFrameSettings({ skin })}
                  className={`p-2.5 rounded-xl border text-xs font-semibold capitalize text-left transition-all ${
                    frameSettings.skin === skin
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {skin} Edition
                </button>
              ))}
            </div>
          </div>

          {/* Concierge Info */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
            <h4 className="text-xs font-bold text-foreground">Avalon Music Concierge Contact</h4>
            <div className="space-y-2 text-xs">
              <a href="tel:8327238886" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-semibold">(832) 723-8886</span>
              </a>
              <a href="mailto:info@theavalonmusic.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@theavalonmusic.com</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Houston, Texas • Established 1993</span>
              </div>
            </div>
          </div>

          {/* Theme Token Guarantee Note */}
          <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border text-[11px] text-muted-foreground space-y-1">
            <span className="font-semibold text-foreground flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Centralized Design System
            </span>
            <p>
              All colors, surfaces, typography, radii, and paddings are systematically managed in <code className="text-primary font-mono text-[10px]">src/index.css</code>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
