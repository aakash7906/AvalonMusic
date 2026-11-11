import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { Play, Pause, SkipForward, Video, Maximize2 } from 'lucide-react';

export const MiniPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    currentTime,
    duration,
    setIsExpanded,
    setActiveVideoId
  } = useAudio();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <aside
      aria-label="Audio player preview"
      className="w-full px-3 mb-1.5 select-none shrink-0 min-w-0"
    >
      <div
        onClick={() => setIsExpanded(true)}
        className="w-full max-w-[420px] sm:max-w-lg md:max-w-xl mx-auto bg-[#242424]/95 backdrop-blur-xl border border-white/10 rounded-md p-2 flex items-center justify-between shadow-2xl cursor-pointer hover:border-primary/50 transition-all relative overflow-hidden min-w-0"
      >
        {/* Subtle top progress bar (Spotify scrub line) */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Left: Thumbnail & Song Title */}
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="relative w-10 h-10 rounded-sm overflow-hidden shrink-0 border border-white/10 shadow-sm">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className={`w-full h-full object-cover ${isPlaying ? 'scale-105 transition-transform duration-700' : ''}`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-primary rounded-full animate-bounce" />
                  <span className="w-0.5 h-1 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate flex items-center gap-1.5">
              <span>{currentTrack.title}</span>
            </h4>
            <p className="text-[10px] text-muted-foreground truncate">
              {currentTrack.artist} • <span className="text-primary">{currentTrack.genre}</span>
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
          {currentTrack.youtubeId && (
            <button
              onClick={() => setActiveVideoId(currentTrack.youtubeId || null)}
              title="Watch Live Video"
              className="p-1.5 rounded-full text-muted-foreground hover:text-red-400 transition-colors"
            >
              <Video className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md active:scale-90 transition-transform"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="p-1.5 rounded-full text-muted-foreground hover:text-white transition-all active:scale-95"
            aria-label="Next track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded(true)}
            className="p-1.5 rounded-full text-muted-foreground hover:text-white hidden sm:block"
            aria-label="Expand player"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
