import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Search, 
  Video, 
  Heart, 
  Headphones, 
  Sparkles, 
  Music, 
  SlidersHorizontal,
  ExternalLink
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

  const filteredTracks = AVALON_TRACKS.filter(track => {
    const matchesGenre = selectedGenre === 'All' || track.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesQuery = 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesQuery;
  });

  const videoTracks = AVALON_TRACKS.filter(t => t.youtubeId);

  return (
    <div className="w-full flex flex-col space-y-4 px-4 pt-3 pb-24 text-foreground">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-1">
          <Headphones className="w-3 h-3" />
          <span>Look & Listen</span>
        </div>
        <h1 className="text-xl font-bold font-display text-foreground">
          Music & Video Showcase
        </h1>
        <p className="text-xs text-muted-foreground">
          Stream live band recordings and watch Houston wedding & gala videos.
        </p>
      </div>

      {/* Audio vs Video Tab Toggle */}
      <div className="flex bg-secondary/80 p-1 rounded-2xl border border-border">
        <button
          onClick={() => setActiveTab('audio')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'audio'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>Studio & Live Audio ({AVALON_TRACKS.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'video'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Video Performances ({videoTracks.length})</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search track, genre, or band..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Genre Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {GENRE_CATEGORIES.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedGenre === genre
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Content depending on Active Tab */}
      {activeTab === 'audio' ? (
        <div className="space-y-2 pt-1">
          {filteredTracks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-xs">
              No audio tracks found for "{searchQuery}".
            </div>
          ) : (
            filteredTracks.map((track, idx) => {
              const isThisPlaying = isPlaying && currentTrack?.id === track.id;
              const isFav = isFavorite(track.id);

              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isThisPlaying
                      ? 'bg-secondary border-primary/50 shadow-md ring-1 ring-primary/30'
                      : 'bg-card border-border hover:border-border-highlight'
                  }`}
                >
                  {/* Left: Index / Cover */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold text-muted-foreground w-4 text-center shrink-0">
                      {idx + 1}
                    </span>

                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border">
                      <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        {isThisPlaying ? (
                          <Pause className="w-5 h-5 text-primary fill-primary" />
                        ) : (
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold truncate ${isThisPlaying ? 'text-primary' : 'text-foreground'}`}>
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {track.artist}
                      </p>
                      <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.5 rounded bg-secondary text-primary/80 font-medium">
                        {track.genre}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions & Duration */}
                  <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                    {track.youtubeId && (
                      <button
                        onClick={() => setActiveVideoId(track.youtubeId || null)}
                        title="Watch Live Video"
                        className="p-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-colors"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => toggleFavorite(track.id)}
                      className={`p-2 rounded-xl transition-colors ${
                        isFav ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
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
        /* Video Showcases Tab */
        <div className="space-y-4 pt-1">
          {videoTracks.map(track => (
            <div
              key={track.id}
              onClick={() => setActiveVideoId(track.youtubeId || null)}
              className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg cursor-pointer group hover:border-primary/50 transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                <img
                  src={`https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`}
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-black/30 to-transparent" />

                {/* Big Red Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 active:scale-90 transition-all">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-primary">
                  {track.genre}
                </span>

                <span className="absolute bottom-2 right-3 text-[10px] font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded">
                  Live in Houston
                </span>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">{track.artist}</p>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    navigate('/book');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs font-bold transition-all border border-primary/20"
                >
                  Book Band
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
