import React, { useState, useEffect } from 'react';
import { Search, X, Music, Users, HelpCircle, ArrowRight, Play } from 'lucide-react';
import { AVALON_BANDS, AVALON_TRACKS } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';
import { Band } from '../../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBand: (band: Band) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose, onSelectBand }) => {
  const navigate = useNavigate();
  const { playTrack } = useAudio();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const matchedBands = query.trim()
    ? AVALON_BANDS.filter(b => 
        b.name.toLowerCase().includes(query.toLowerCase()) || 
        b.genre.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedTracks = query.trim()
    ? AVALON_TRACKS.filter(t => 
        t.title.toLowerCase().includes(query.toLowerCase()) || 
        t.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-start p-4 pt-12 animate-in fade-in duration-200">
      <div className="w-full max-w-md sm:max-w-xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-border flex items-center gap-2 bg-secondary/50">
          <Search className="w-4 h-4 text-primary shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search bands, songs, genres..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-3 overflow-y-auto space-y-3 flex-1 text-xs no-scrollbar scroll-touch">
          {!query.trim() ? (
            <div className="space-y-2 py-4">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Quick Suggestions</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['The Party Feels', 'David Caceres Jazz', 'Wedding Bands', 'CC Rider', 'Chamber Music', 'Corporate Gala'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary-hover text-foreground text-[11px] border border-border"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Bands */}
              {matchedBands.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" /> Bands ({matchedBands.length})
                  </span>
                  {matchedBands.map(b => (
                    <div
                      key={b.id}
                      onClick={() => {
                        onClose();
                        onSelectBand(b);
                      }}
                      className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={b.imageUrl} alt={b.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground truncate">{b.name}</h4>
                          <p className="text-[10px] text-muted-foreground truncate">{b.genre}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              )}

              {/* Tracks */}
              {matchedTracks.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                    <Music className="w-3 h-3 text-primary" /> Tracks ({matchedTracks.length})
                  </span>
                  {matchedTracks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => {
                        playTrack(t);
                        onClose();
                      }}
                      className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground truncate">{t.title}</h4>
                          <p className="text-[10px] text-muted-foreground truncate">{t.artist}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">{t.duration}</span>
                    </div>
                  ))}
                </div>
              )}

              {matchedBands.length === 0 && matchedTracks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No bands or tracks matching "{query}".</p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/book');
                    }}
                    className="mt-2 text-primary font-bold hover:underline"
                  >
                    Request custom recommendations
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
