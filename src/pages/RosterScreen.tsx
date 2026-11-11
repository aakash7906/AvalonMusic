import React, { useState } from 'react';
import {
  Search,
  Star,
  Users,
  Play,
  Pause,
  CheckCircle2,
} from 'lucide-react';
import { AVALON_BANDS, GENRE_CATEGORIES } from '../data/mockData';
import { Band } from '../types';
import { useAudio } from '../context/AudioContext';
import { useNavigate } from 'react-router-dom';

interface RosterScreenProps {
  onSelectBand: (band: Band) => void;
}

export const RosterScreen: React.FC<RosterScreenProps> = ({ onSelectBand }) => {
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price'>('rating');

  const filteredBands = AVALON_BANDS.filter(band => {
    const matchesGenre = selectedGenre === 'All' || band.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesSearch =
      band.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      band.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      band.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
    return a.startingPrice.localeCompare(b.startingPrice);
  });

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-4 sm:space-y-6 px-4 sm:px-6 pt-3 sm:pt-5 pb-32 text-foreground overflow-x-hidden">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
          <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Artist Roster</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
          Houston's Top Rated Live Bands
        </h1>
      </div>

      {/* Search Bar & Sort Selector */}
      <div className="flex gap-2 sm:gap-3 w-full min-w-0">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search band name, genre..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-card border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)}
          className="px-3 sm:px-4 py-2 sm:py-2.5 bg-card border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
        >
          <option value="rating">Top Rated</option>
          <option value="reviews">Most Popular</option>
          <option value="price">Pricing</option>
        </select>
      </div>

      {/* Genre Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar w-full min-w-0">
        {GENRE_CATEGORIES.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${selectedGenre === genre
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border'
              }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Bands Catalog Grid (2-column on tablet) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1 w-full min-w-0">
        {filteredBands.map(band => {
          const isBandPlaying = isPlaying && currentTrack?.artist === band.name;

          return (
            <div
              key={band.id}
              onClick={() => onSelectBand(band)}
              className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl hover:border-primary/50 transition-all cursor-pointer group flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={band.imageUrl}
                  alt={band.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-black/20 to-transparent" />

                {/* Audio Preview Trigger */}
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
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                  >
                    {isBandPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>
                )}
              </div>

              {/* Band Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold font-display text-foreground group-hover:text-primary transition-colors">
                      {band.name}
                    </h2>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {band.tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-secondary/80 px-2 py-1 rounded-xl text-xs font-bold text-amber-400 border border-border">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{band.rating}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">({band.reviewsCount})</span>
                  </div>
                </div>

                {/* Key Features Preview */}
                <div className="space-y-1 text-xs text-muted-foreground">
                  {band.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 line-clamp-1">
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Pricing & CTA */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground font-semibold">Starting at</span>
                    <p className="text-sm font-bold text-foreground">{band.startingPrice}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onSelectBand(band);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary-hover text-xs font-semibold text-foreground border border-border transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/book?band=${encodeURIComponent(band.name)}`);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary-hover active:scale-95 transition-all"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
