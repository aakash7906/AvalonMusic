import React from 'react';
import { Band } from '../types';
import { 
  X, 
  Star, 
  Heart, 
  Play, 
  Pause, 
  CheckCircle2, 
  Video, 
  Users, 
  CalendarCheck, 
  Music, 
  Share2, 
  Phone 
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface BandDetailModalProps {
  band: Band | null;
  onClose: () => void;
}

export const BandDetailModal: React.FC<BandDetailModalProps> = ({ band, onClose }) => {
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay, setActiveVideoId } = useAudio();
  const { isFavorite, toggleFavorite, showToast } = useApp();

  if (!band) return null;

  const isFav = isFavorite(band.id);
  const isBandPlaying = isPlaying && currentTrack?.artist === band.name;

  const handleBook = () => {
    onClose();
    navigate(`/book?band=${encodeURIComponent(band.name)}`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/roster?band=${band.id}`);
    showToast(`Link for ${band.name} copied!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-xl md:max-w-2xl max-h-[92vh] bg-background border border-border rounded-t-xl sm:rounded-lg overflow-hidden flex flex-col shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Top Bar Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={onClose}
            className="pointer-events-auto p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(band.id)}
              className={`p-2.5 rounded-full bg-black/60 backdrop-blur-md transition-all active:scale-90 ${
                isFav ? 'text-primary' : 'text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body (Hidden scrollbar with touch inertial scrolling) */}
        <div className="overflow-y-auto flex-1 pb-24 no-scrollbar scroll-touch">
          {/* Hero Cover */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/40">
            <img
              src={band.heroImageUrl || band.imageUrl}
              alt={band.name}
              className="w-full h-full img-band-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                  {band.genre}
                </span>
                <h2 className="text-2xl font-black font-display text-white mt-1.5 drop-shadow-md">
                  {band.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-white/90">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{band.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{band.reviewsCount} Verified Reviews</span>
                </div>
              </div>

              {band.audioTracks.length > 0 && (
                <button
                  onClick={() => {
                    if (isBandPlaying) {
                      togglePlay();
                    } else {
                      playTrack(band.audioTracks[0]);
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl active:scale-95 transition-transform"
                >
                  {isBandPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
              )}
            </div>
          </div>

          <div className="p-5 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-md bg-secondary/60 border border-border text-center">
              <div>
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Starting Price</span>
                <p className="text-xs font-bold text-foreground mt-0.5">{band.startingPrice}</p>
              </div>
              <div className="border-x border-border">
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Configuration</span>
                <p className="text-xs font-bold text-foreground mt-0.5">{band.membersCount}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Experience</span>
                <p className="text-xs font-bold text-foreground mt-0.5">30+ Years</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-display text-foreground">About the Band</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {band.description}
              </p>
            </div>

            {/* Watch Live Video Showcase */}
            {band.youtubeVideoId && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold font-display text-foreground">Live Video Showcase</h3>
                <div 
                  onClick={() => setActiveVideoId(band.youtubeVideoId)}
                  className="relative aspect-video rounded-md overflow-hidden border border-border cursor-pointer group shadow-lg"
                >
                  <img
                    src={`https://img.youtube.com/vi/${band.youtubeVideoId}/hqdefault.jpg`}
                    alt="Live Performance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 left-3 text-[10px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded">
                    Watch Full Live Performance
                  </span>
                </div>
              </div>
            )}

            {/* Audio Tracks Preview */}
            {band.audioTracks.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold font-display text-foreground">Audio Audition Track</h3>
                {band.audioTracks.map(track => {
                  const isThisPlaying = isPlaying && currentTrack?.id === track.id;

                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className="p-3 rounded-md bg-secondary/50 border border-border flex items-center justify-between cursor-pointer hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-sm bg-primary/20 text-primary flex items-center justify-center">
                          {isThisPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-foreground">{track.title}</h4>
                          <p className="text-[10px] text-muted-foreground">{track.description || band.genre}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{track.duration}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Key Features & Lineup */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-display text-foreground">Performance Features & Inclusions</h3>
              <div className="space-y-1.5">
                {band.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Repertoire */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-display text-foreground">Sample Repertoire Artists</h3>
              <div className="flex flex-wrap gap-1.5">
                {band.repertoire.map((rep, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-sm bg-secondary text-[11px] text-foreground border border-border font-medium"
                  >
                    {rep}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Booking Bar (BookMyShow Tiered Pricing & CTA) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-[#181818]/95 backdrop-blur-md border-t border-border flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Starting Rate</span>
            <p className="text-sm sm:text-base font-bold text-primary">{band.startingPrice}</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:8327238886"
              className="p-2.5 rounded-sm bg-secondary text-primary border border-border hover:bg-secondary-hover transition-colors"
              title="Call Avalon Music"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={handleBook}
              className="py-2.5 px-5 rounded-sm bg-primary text-primary-foreground font-bold text-xs shadow-lg hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
