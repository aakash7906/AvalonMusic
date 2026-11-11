import React, { useState } from 'react';
import {
  Play,
  Pause,
  Search,
  Video,
  Heart,
  Headphones,
  Music,
  Calendar,
  Layers,
  Sparkles as SparkleLucide // keep unused
} from 'lucide-react';
import { AVALON_TRACKS, GENRE_CATEGORIES } from '../data/mockData';
import { useAudio } from '../context/AudioContext';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const MusicScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay, setActiveVideoId } = useAudio();
  const { isFavorite, toggleFavorite } = useApp();

  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'audio' | 'video'>('audio');

  // Spotify-style colorful Category tiles
  const browseCategories = [
    { title: 'Weddings & Reception', color: 'from-rose-900 to-rose-950', genre: 'Classical', image: '/images/wedding-event.webp' },
    { title: 'Motown & Soul', color: 'from-amber-800 to-amber-950', genre: 'Motown / R&B', image: '/images/ccrider-band.webp' },
    { title: 'Classic Jazz & Swing', color: 'from-emerald-900 to-emerald-950', genre: 'Classic Jazz', image: '/images/david-caceres-jazz.webp' },
    { title: 'High-Energy Top 40', color: 'from-purple-900 to-purple-950', genre: 'Variety / Pop', image: '/images/the-party-feels.avif' },
    { title: 'Corporate Summits', color: 'from-blue-900 to-blue-950', genre: 'Variety / Pop', image: '/images/corporate-event.webp' },
    { title: 'Texas Country & Rock', color: 'from-orange-900 to-orange-950', genre: 'Country', image: '/images/20-ride.webp' }
  ];

  const filteredTracks = AVALON_TRACKS.filter(track => {
    const matchesGenre = selectedGenre === 'All' || track.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesQuery =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesQuery;
  });

  const videoTracks = AVALON_TRACKS.filter(t => t.youtubeId);

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-4 sm:space-y-6 px-3.5 sm:px-6 pt-3 sm:pt-4 pb-28 text-foreground overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight">
          Explore Music & Shows
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Stream live band recordings and watch Houston wedding & gala videos.
        </p>
      </div>

      {/* Audio vs Video Tab Toggle (Spotify segmented switch) */}
      <div className="flex bg-[#242424] p-1 rounded-md border border-white/5 sm:max-w-md">
        <button
          onClick={() => setActiveTab('audio')}
          className={`flex-1 py-1.5 sm:py-2 text-xs font-semibold rounded-sm transition-all flex items-center justify-center gap-1.5 ${activeTab === 'audio'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-white'
            }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>Live Audio ({AVALON_TRACKS.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 py-1.5 sm:py-2 text-xs font-semibold rounded-sm transition-all flex items-center justify-center gap-1.5 ${activeTab === 'video'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-white'
            }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Concert Videos ({videoTracks.length})</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by song, band, or genre..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-[#242424] border border-white/5 rounded-md text-xs sm:text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Spotify-Style Browse Categories Grid */}
      {!searchQuery && (
        <div className="space-y-2.5">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Browse All Genres
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {browseCategories.map(cat => (
              <div
                key={cat.title}
                onClick={() => setSelectedGenre(cat.genre)}
                className={`relative h-20 sm:h-24 rounded-md overflow-hidden bg-gradient-to-br ${cat.color} p-2.5 sm:p-3 cursor-pointer shadow-md group hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                <span className="text-xs sm:text-sm font-black text-white leading-tight block max-w-[70%]">
                  {cat.title}
                </span>

                {/* Angled Artwork peeking out bottom right (Spotify Signature) */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute -bottom-2 -right-2 w-14 h-14 sm:w-16 sm:h-16 rounded shadow-lg object-cover transform rotate-[20deg] group-hover:rotate-[15deg] group-hover:scale-105 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Genre Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full min-w-0">
        {GENRE_CATEGORIES.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedGenre === genre
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground hover:text-white border border-border/70'
              }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Content depending on Active Tab */}
      {activeTab === 'audio' ? (
        <div className="space-y-1.5 pt-1 w-full min-w-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-2 pb-1 border-b border-white/5">
            <span># Title & Artist</span>
            <span>Duration</span>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-xs">
              No tracks found matching your search.
            </div>
          ) : (
            filteredTracks.map((track, idx) => {
              const isThisPlaying = isPlaying && currentTrack?.id === track.id;
              const isFav = isFavorite(track.id);

              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`p-2 rounded-md transition-all cursor-pointer flex items-center justify-between gap-3 min-w-0 group ${isThisPlaying
                      ? 'bg-[#282828] border-primary/50 shadow-md ring-1 ring-primary/40'
                      : 'hover:bg-[#202020]'
                    }`}
                >
                  {/* Left: Number & Album Art & Info */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-medium text-muted-foreground w-4 text-center shrink-0 group-hover:text-primary">
                      {isThisPlaying ? (
                        <span className="w-2 h-2 rounded-full bg-primary inline-block animate-ping" />
                      ) : (
                        idx + 1
                      )}
                    </span>

                    {/* Square Cover Art (Spotify Standard) */}
                    <div className="relative w-11 h-11 rounded-sm overflow-hidden shrink-0 border border-white/10 shadow-sm">
                      <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {isThisPlaying ? (
                          <Pause className="w-4 h-4 text-primary fill-primary" />
                        ) : (
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${isThisPlaying ? 'text-primary' : 'text-white'}`}>
                        {track.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions & Duration */}
                  <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                    {track.youtubeId && (
                      <button
                        onClick={() => setActiveVideoId(track.youtubeId || null)}
                        title="Watch Live Video"
                        className="p-1 rounded text-muted-foreground hover:text-red-400 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => toggleFavorite(track.id)}
                      className={`p-1 transition-colors ${isFav ? 'text-primary' : 'text-muted-foreground hover:text-white'
                        }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => navigate(`/book?band=${encodeURIComponent(track.artist)}`)}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all hidden sm:block"
                    >
                      Book
                    </button>

                    <span className="text-xs text-muted-foreground font-mono w-10 text-right">
                      {track.duration}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Video Showcases Tab (BookMyShow Live Trailer format) */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 w-full min-w-0">
          {videoTracks.map(track => (
            <div
              key={track.id}
              onClick={() => setActiveVideoId(track.youtubeId || null)}
              className="rounded-md overflow-hidden border border-border/80 bg-card shadow-md cursor-pointer group hover:border-primary/50 transition-all flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={`https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`}
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-black/30 to-transparent" />

                {/* Big Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-90 transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-300 bg-black/70 border border-white/10">
                  {track.genre}
                </span>

                <span className="absolute bottom-2 right-2 text-[9px] font-medium text-white/90 bg-black/70 px-1.5 py-0.5 rounded">
                  Live Houston Recording
                </span>
              </div>

              <div className="p-2.5 flex items-center justify-between gap-2 mt-auto">
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
                    {track.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/book?band=${encodeURIComponent(track.artist)}`);
                  }}
                  className="px-2.5 py-1 rounded-sm bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-bold transition-all shrink-0 active:scale-95"
                >
                  Book Live
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
