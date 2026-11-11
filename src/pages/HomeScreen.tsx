import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Pause,
  Star,
  Heart,
  ChevronRight,
  Video,
  Music,
  Calendar,
  Sparkles as SparkleLucide // Note: not used, keeping imports clean
} from 'lucide-react';
import { AVALON_BANDS, AVALON_TRACKS, AVALON_TESTIMONIALS, EVENT_SERVICES } from '../data/mockData';
import { useAudio } from '../context/AudioContext';
import { useApp } from '../context/AppContext';
import { Band } from '../types';

interface HomeScreenProps {
  onSelectBand: (band: Band) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectBand }) => {
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay, setActiveVideoId } = useAudio();
  const { isFavorite, toggleFavorite } = useApp();

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Time-based greeting (Spotify signature)
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // 6 Quick Picks for Spotify 2x3 Grid
  const quickPicks = [
    {
      id: 'qp-1',
      title: 'The Party Feels',
      subtitle: 'Variety Band',
      image: '/images/the-party-feels.avif',
      action: () => {
        const band = AVALON_BANDS.find(b => b.name === 'The Party Feels');
        if (band?.audioTracks[0]) playTrack(band.audioTracks[0]);
      },
      band: AVALON_BANDS.find(b => b.name === 'The Party Feels')
    },
    {
      id: 'qp-2',
      title: 'Weddings & Ceremonies',
      subtitle: 'Strings & Jazz',
      image: '/images/wedding-event.webp',
      action: () => navigate('/book?event=weddings')
    },
    {
      id: 'qp-3',
      title: 'David Caceres Jazz',
      subtitle: 'Classic Swing',
      image: '/images/david-caceres-jazz.webp',
      action: () => {
        const band = AVALON_BANDS.find(b => b.name.includes('David Caceres'));
        if (band?.audioTracks[0]) playTrack(band.audioTracks[0]);
      },
      band: AVALON_BANDS.find(b => b.name.includes('David Caceres'))
    },
    {
      id: 'qp-4',
      title: 'CC Rider Band',
      subtitle: 'Motown & Soul',
      image: '/images/ccrider-band.webp',
      action: () => {
        const band = AVALON_BANDS.find(b => b.name.includes('CC Rider'));
        if (band?.audioTracks[0]) playTrack(band.audioTracks[0]);
      },
      band: AVALON_BANDS.find(b => b.name.includes('CC Rider'))
    },
    {
      id: 'qp-5',
      title: 'Corporate Galas',
      subtitle: 'Fortune 500 summits',
      image: '/images/corporate-event.webp',
      action: () => navigate('/book?event=corporate')
    },
    {
      id: 'qp-6',
      title: 'DJ & MC Hybrid',
      subtitle: 'Late Night Dance',
      image: '/images/dj-service.webp',
      action: () => navigate('/book?event=dj-mc')
    }
  ];

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-5 sm:space-y-6 pb-28 text-foreground overflow-x-hidden">
      {/* 1. Dynamic Greeting & Spotify Quick Picks 2x3 Grid */}
      <section className="px-3.5 sm:px-6 pt-3 space-y-3 w-full min-w-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            {greeting}
          </h1>
          <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
            Houston, TX
          </span>
        </div>

        {/* 2-Column Grid (Spotify Signature Quick Picks) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 w-full min-w-0">
          {quickPicks.map(item => (
            <div
              key={item.id}
              onClick={() => {
                if (item.band) onSelectBand(item.band);
                else item.action();
              }}
              className="group relative flex items-center bg-card hover:bg-card-hover border border-border/70 rounded-md overflow-hidden transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] min-w-0"
            >
              {/* Thumbnail */}
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover shrink-0"
              />

              {/* Title & Floating Play Button */}
              <div className="flex-1 px-2.5 min-w-0 flex items-center justify-between gap-1">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {item.subtitle}
                  </p>
                </div>

                {/* Floating Gold Play Button */}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    item.action();
                  }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg opacity-85 group-hover:opacity-100 group-hover:scale-105 active:scale-95 transition-all shrink-0"
                  aria-label={`Play ${item.title}`}
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Hero Booking Showcase Banner (Spotify Ambient Card) */}
      <section className="px-3.5 sm:px-6 w-full min-w-0">
        <div className="relative w-full rounded-lg overflow-hidden border border-border bg-gradient-to-br from-[#242424] via-card to-[#121212] p-4 sm:p-5 shadow-xl">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-md">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Houston's #1 Agency • 30+ Years
              </span>
              <h2 className="text-lg sm:text-xl font-black font-display text-white">
                Book Premier Live Bands & DJs
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Vetted talent for luxury weddings, corporate galas & celebrations. Transparent pricing with sound production included.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => navigate('/book')}
                className="flex-1 sm:flex-initial py-2 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Request Fast Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/music')}
                className="py-2 px-3 rounded-md bg-secondary hover:bg-secondary-hover text-foreground font-semibold text-xs border border-border active:scale-95 transition-all flex items-center gap-1"
              >
                <Music className="w-3.5 h-3.5 text-primary" />
                <span>Samples</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Bands Shelf (Spotify Artists with Circular Avatars) */}
      <section className="px-3.5 sm:px-6 space-y-3 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-white">
              Featured Avalon Bands
            </h2>
            <p className="text-xs text-muted-foreground">Top booked live ensembles in Houston</p>
          </div>
          <button
            onClick={() => navigate('/roster')}
            className="text-xs text-primary font-semibold flex items-center gap-0.5 hover:underline shrink-0"
          >
            <span>Show all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Carousel (Spotify Artist Cards with Circular Photos) */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x no-scrollbar w-full min-w-0">
          {AVALON_BANDS.map(band => {
            const isFav = isFavorite(band.id);
            const isBandPlaying = isPlaying && currentTrack?.artist === band.name;

            return (
              <div
                key={band.id}
                onClick={() => onSelectBand(band)}
                className="w-[140px] sm:w-[160px] p-2.5 shrink-0 snap-start rounded-md bg-card hover:bg-card-hover border border-border/60 transition-all cursor-pointer shadow-sm group flex flex-col items-center text-center"
              >
                {/* Circular Artist Avatar (Spotify Hallmark) */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-md mb-2.5">
                  <img
                    src={band.imageUrl}
                    alt={band.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Hover/Tap Play Button */}
                  {band.audioTracks.length > 0 && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        if (isBandPlaying) togglePlay();
                        else playTrack(band.audioTracks[0]);
                      }}
                      className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 active:scale-95 transition-all"
                      aria-label="Play track"
                    >
                      {isBandPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Artist Name & Meta */}
                <h3 className="w-full text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {band.name}
                </h3>
                <p className="text-[10px] text-muted-foreground truncate w-full mt-0.5">
                  Artist • {band.genre}
                </p>

                {/* BookMyShow Style Price Badge */}
                <div className="mt-2 w-full pt-1.5 border-t border-border/50 flex items-center justify-between text-[10px]">
                  <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" /> {band.rating}
                  </span>
                  <span className="font-bold text-primary">
                    From {band.startingPrice}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Look & Listen Live Tracks (Spotify Audio Shelf with Square Covers) */}
      <section className="px-3.5 sm:px-6 space-y-3 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-white">
              Popular Live Samples
            </h2>
            <p className="text-xs text-muted-foreground">Original audio recorded live in Houston</p>
          </div>
          <button
            onClick={() => navigate('/music')}
            className="text-xs text-primary font-semibold flex items-center gap-0.5 hover:underline shrink-0"
          >
            <span>See more</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full min-w-0">
          {AVALON_TRACKS.slice(0, 6).map((track, idx) => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                onClick={() => playTrack(track)}
                className={`p-2 rounded-md border transition-all cursor-pointer flex items-center justify-between gap-2.5 min-w-0 group ${isThisPlaying
                    ? 'bg-secondary border-primary/50 shadow-md ring-1 ring-primary/40'
                    : 'bg-card hover:bg-card-hover border-border/60'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Track Number / Play Icon */}
                  <span className="w-4 text-center text-xs font-medium text-muted-foreground group-hover:text-primary shrink-0">
                    {isThisPlaying ? (
                      <span className="w-2 h-2 rounded-full bg-primary inline-block animate-ping" />
                    ) : (
                      idx + 1
                    )}
                  </span>

                  {/* Square Album Cover (Spotify Standard) */}
                  <div className="relative w-10 h-10 rounded-sm overflow-hidden shrink-0 border border-border/50">
                    <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {isThisPlaying ? (
                        <Pause className="w-3.5 h-3.5 text-primary fill-primary" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="min-w-0">
                    <h4 className={`text-xs font-bold truncate ${isThisPlaying ? 'text-primary' : 'text-foreground'}`}>
                      {track.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                  {track.youtubeId && (
                    <button
                      onClick={() => setActiveVideoId(track.youtubeId || null)}
                      title="Watch Live Video"
                      className="p-1 rounded bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-colors"
                    >
                      <Video className="w-3 h-3" />
                    </button>
                  )}
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {track.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. BookMyShow-Inspired Event Booking Categories */}
      <section className="px-3.5 sm:px-6 space-y-3 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-white">
              Explore by Event Type
            </h2>
            <p className="text-xs text-muted-foreground">Book specialized entertainment packages</p>
          </div>
          <button
            onClick={() => navigate('/book')}
            className="text-xs text-primary font-semibold flex items-center gap-0.5 hover:underline shrink-0"
          >
            <span>Book custom</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full min-w-0">
          {EVENT_SERVICES.map(service => (
            <div
              key={service.id}
              onClick={() => navigate(`/book?event=${service.id}`)}
              className="group relative rounded-md overflow-hidden border border-border/70 bg-card hover:border-primary/50 transition-all active:scale-[0.98] cursor-pointer min-w-0 flex flex-col shadow-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-300 bg-black/70 border border-white/10">
                  {service.stats}
                </span>
              </div>

              <div className="p-2 flex items-center justify-between min-w-0 bg-card">
                <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {service.title}
                </h3>
                <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Clients Trust Avalon (BookMyShow Verified Stamp) */}
      <section className="px-3.5 sm:px-6 w-full min-w-0">
        <div className="p-3.5 sm:p-4 rounded-md bg-card border border-border/70 flex items-center justify-between gap-3 shadow-sm">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              Over 30 Years of Unbroken Trust
            </span>
            <p className="text-[11px] text-muted-foreground">
              Houston's premiere agency with zero cancellation record and verified musician roster.
            </p>
          </div>
          <button
            onClick={() => navigate('/book')}
            className="px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary-hover text-foreground font-semibold text-xs border border-border shrink-0 active:scale-95 transition-all"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};
