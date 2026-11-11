import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Pause, 
  Star, 
  Phone, 
  Heart, 
  ShieldCheck, 
  Users, 
  Zap, 
  Quote, 
  ChevronRight,
  Video
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

  const featuredBands = AVALON_BANDS.slice(0, 5);

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-5 sm:space-y-7 pb-24 text-foreground overflow-x-hidden">
      {/* 1. Hero Showcase Banner */}
      <section className="relative px-3.5 sm:px-6 pt-2.5 sm:pt-4 w-full min-w-0">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-2xl bg-gradient-to-br from-card via-secondary/70 to-card">
          {/* Background Ambient Image */}
          <div className="absolute inset-0">
            <img
              src="/images/hero-bg.webp"
              alt="Avalon Live Music"
              className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/75 to-transparent" />
          </div>

          <div className="relative z-10 p-4 sm:p-6 md:p-7 space-y-2 sm:space-y-3 min-w-0">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] sm:text-xs font-bold tracking-wide uppercase border border-primary/30">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Houston • Since 1993</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-display tracking-tight text-white leading-tight">
              Top Live Bands & DJs
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Curated luxury live music for weddings, galas & celebrations.
            </p>

            {/* CTAs */}
            <div className="pt-1 flex items-center gap-2 sm:gap-3 sm:max-w-md">
              <button
                onClick={() => navigate('/book')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-lg hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-1.5 truncate"
              >
                <span>Get Fast Quote</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              <button
                onClick={() => navigate('/music')}
                className="py-2.5 px-3.5 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground font-semibold text-xs sm:text-sm border border-border transition-colors flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
              >
                <Play className="w-3.5 h-3.5 text-primary fill-primary shrink-0" />
                <span>Samples</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Events We Book For */}
      <section className="px-3.5 sm:px-6 space-y-2.5 w-full min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base md:text-lg font-bold font-display text-foreground">
            Events We Book For
          </h2>
          <button
            onClick={() => navigate('/book')}
            className="text-xs sm:text-sm text-primary font-semibold flex items-center gap-0.5 hover:underline shrink-0"
          >
            <span>Custom</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5 w-full min-w-0">
          {EVENT_SERVICES.map(service => (
            <div
              key={service.id}
              onClick={() => navigate(`/book?event=${service.id}`)}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all active:scale-[0.98] cursor-pointer min-w-0 flex flex-col shadow-md"
            >
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-amber-300 border border-white/10">
                  {service.stats}
                </span>
              </div>

              <div className="p-2.5 sm:p-3 flex items-center justify-between min-w-0 bg-card">
                <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {service.title}
                </h3>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Premier Bands (Horizontal Carousel) */}
      <section className="px-3.5 sm:px-6 space-y-2.5 sm:space-y-3.5 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <h2 className="text-sm sm:text-base md:text-lg font-bold font-display text-foreground truncate">
              Featured Avalon Bands
            </h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Listen to preview tracks & setlists</p>
          </div>
          <button
            onClick={() => navigate('/roster')}
            className="text-xs sm:text-sm text-primary font-semibold flex items-center gap-0.5 hover:underline shrink-0"
          >
            <span>All ({AVALON_BANDS.length})</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Scrollable Container aligned with homepage margins */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2.5 snap-x no-scrollbar w-full min-w-0">
          {featuredBands.map(band => {
            const isFav = isFavorite(band.id);
            const isBandPlaying = isPlaying && currentTrack?.artist === band.name;

            return (
              <div
                key={band.id}
                onClick={() => onSelectBand(band)}
                className="w-[230px] sm:w-[270px] md:w-[290px] shrink-0 snap-start rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all cursor-pointer shadow-lg group flex flex-col"
              >
                {/* Image Cover */}
                <div className="relative h-32 sm:h-38 md:h-42 w-full overflow-hidden">
                  <img
                    src={band.imageUrl}
                    alt={band.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-black/30" />

                  {/* Favorite button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(band.id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full glass-panel transition-transform active:scale-90 ${
                      isFav ? 'text-primary' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Genre pill */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-semibold text-primary border border-primary/20">
                    {band.genre}
                  </span>

                  {/* Quick Play Audio Preview Button */}
                  {band.audioTracks.length > 0 && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        if (isBandPlaying) {
                          togglePlay();
                        } else {
                          playTrack(band.audioTracks[0]);
                        }
                      }}
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                    >
                      {isBandPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Band Details */}
                <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-1.5 min-w-0">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-bold font-display text-foreground group-hover:text-primary transition-colors truncate">
                        {band.name}
                      </h3>
                      <div className="flex items-center gap-0.5 text-[10px] text-amber-400 font-semibold shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{band.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      {band.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] sm:text-[11px]">
                    <span className="text-muted-foreground truncate">{band.membersCount}</span>
                    <span className="font-bold text-foreground shrink-0">From {band.startingPrice}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Right margin buffer to prevent clipping */}
          <div className="w-1 sm:w-2 shrink-0" />
        </div>
      </section>

      {/* 4. Look & Listen Audio Showcase Preview */}
      <section className="px-3.5 sm:px-6 space-y-2.5 sm:space-y-3.5 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <h2 className="text-sm sm:text-base md:text-lg font-bold font-display text-foreground truncate">
              Look & Listen Live Tracks
            </h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Original samples recorded in Houston</p>
          </div>
          <button
            onClick={() => navigate('/music')}
            className="text-xs sm:text-sm text-primary font-semibold flex items-center gap-0.5 hover:underline shrink-0"
          >
            <span>All Tracks</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full min-w-0">
          {AVALON_TRACKS.slice(0, 4).map(track => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                onClick={() => playTrack(track)}
                className={`p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 min-w-0 ${
                  isThisPlaying 
                    ? 'bg-secondary border-primary/50 shadow-md ring-1 ring-primary/30' 
                    : 'bg-card/70 border-border hover:border-border-highlight'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 border border-border">
                    <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      {isThisPlaying ? (
                        <Pause className="w-4 h-4 text-primary fill-primary" />
                      ) : (
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h4 className={`text-xs sm:text-sm font-bold truncate ${isThisPlaying ? 'text-primary' : 'text-foreground'}`}>
                      {track.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                      {track.artist} • <span className="text-zinc-400">{track.genre}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                  {track.youtubeId && (
                    <button
                      onClick={() => setActiveVideoId(track.youtubeId || null)}
                      title="Watch Live Video"
                      className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                    {track.duration}
                  </span>
                </div>
              </div>
            );
          })}
          {/* Right margin buffer to prevent clipping */}
          <div className="w-1 sm:w-2 shrink-0" />
        </div>
      </section>

      {/* 5. Why Choose Avalon Music */}
      <section className="px-3.5 sm:px-6 space-y-2.5 sm:space-y-3.5 w-full min-w-0">
        <h2 className="text-sm sm:text-base md:text-lg font-bold font-display text-foreground">
          Why Choose Avalon Music?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5 w-full min-w-0">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border space-y-1 sm:space-y-1.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">Unmatched Response</h3>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-snug">
              Fast customized quotes & proactive planning from day one.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border space-y-1 sm:space-y-1.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">Only Vetted Talent</h3>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-snug">
              Every artist has years of top-tier performance experience.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border space-y-1 sm:space-y-1.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">30+ Years in Texas</h3>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-snug">
              Serving Houston's top venues with 5,000+ seamless events.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border space-y-1 sm:space-y-1.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">Client Advocacy</h3>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-snug">
              Ironclad contracts and transparent rates with zero surprises.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Carousel */}
      <section className="px-3.5 sm:px-6 space-y-2 sm:space-y-3 w-full min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base md:text-lg font-bold font-display text-foreground">
            Client Testimonials
          </h2>
          <img src="/images/stars.png" alt="5 Stars" className="h-3 sm:h-4 w-auto object-contain" />
        </div>

        <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border shadow-lg relative space-y-2.5 sm:space-y-3.5 min-w-0">
          <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary/30 absolute top-3 sm:top-5 right-3 sm:right-5" />

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic pr-5 sm:pr-8">
            "{AVALON_TESTIMONIALS[activeTestimonialIdx].quote}"
          </p>

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                {AVALON_TESTIMONIALS[activeTestimonialIdx].name}
              </h3>
              <p className="text-[10px] sm:text-xs text-primary font-medium truncate">
                {AVALON_TESTIMONIALS[activeTestimonialIdx].role} • {AVALON_TESTIMONIALS[activeTestimonialIdx].venue}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {AVALON_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonialIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === activeTestimonialIdx ? 'w-3.5 bg-primary' : 'bg-secondary'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Quick Help & About Links */}
      <section className="px-3.5 sm:px-6 space-y-2 sm:space-y-3 w-full min-w-0">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <button
            onClick={() => navigate('/faq')}
            className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
          >
            <span className="text-[11px] sm:text-sm font-bold text-foreground">FAQ</span>
            <span className="text-[9px] sm:text-[11px] text-muted-foreground">Answers</span>
          </button>
          <button
            onClick={() => navigate('/about')}
            className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
          >
            <span className="text-[11px] sm:text-sm font-bold text-foreground">About</span>
            <span className="text-[9px] sm:text-[11px] text-muted-foreground">Since 1993</span>
          </button>
          <button
            onClick={() => navigate('/events')}
            className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
          >
            <span className="text-[11px] sm:text-sm font-bold text-foreground">Showcases</span>
            <span className="text-[9px] sm:text-[11px] text-muted-foreground">Free RSVP</span>
          </button>
        </div>
      </section>

      {/* 8. Industry Badges */}
      <section className="px-3.5 sm:px-6 w-full min-w-0">
        <div className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-secondary/50 border border-border flex items-center justify-around gap-2">
          <div className="flex flex-col items-center">
            <img src="/images/the-knot.webp" alt="The Knot" className="h-5 sm:h-7 w-auto object-contain" />
            <span className="text-[8px] sm:text-[10px] text-muted-foreground mt-1 font-semibold">Best of Weddings</span>
          </div>
          <div className="h-6 sm:h-8 w-[1px] bg-border" />
          <div className="flex flex-col items-center">
            <img src="/images/weddingwire.svg" alt="WeddingWire" className="h-5 sm:h-7 w-auto object-contain" />
            <span className="text-[8px] sm:text-[10px] text-muted-foreground mt-1 font-semibold">Couples' Choice</span>
          </div>
          <div className="h-6 sm:h-8 w-[1px] bg-border" />
          <div className="flex flex-col items-center">
            <img src="/images/zola.webp" alt="Zola" className="h-5 sm:h-7 w-auto object-contain" />
            <span className="text-[8px] sm:text-[10px] text-muted-foreground mt-1 font-semibold">Top Vendor</span>
          </div>
        </div>
      </section>

      {/* 9. Direct Concierge Hotline Card */}
      <section className="px-3.5 sm:px-6 pb-2 w-full min-w-0">
        <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-secondary to-card border border-primary/30 flex items-center justify-between gap-2.5 sm:gap-4 shadow-xl">
          <div className="space-y-0.5 sm:space-y-1 min-w-0">
            <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-primary">Need Pricing Advice?</span>
            <h3 className="text-xs sm:text-base font-bold text-foreground truncate">Talk With Our Music Director</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Mon–Sat: (832) 723-8886</p>
          </div>

          <a
            href="tel:8327238886"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};
