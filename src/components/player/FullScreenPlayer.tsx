import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2, 
  Video, 
  Sparkles, 
  CalendarCheck,
  Shuffle,
  Repeat
} from 'lucide-react';

export const FullScreenPlayer: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    prevTrack, 
    currentTime, 
    duration, 
    seek, 
    volume, 
    setVolume, 
    isMuted, 
    toggleMute, 
    isExpanded, 
    setIsExpanded,
    setActiveVideoId
  } = useAudio();

  const { isFavorite, toggleFavorite, showToast } = useApp();
  const navigate = useNavigate();

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  if (!isExpanded || !currentTrack) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleBookBand = () => {
    setIsExpanded(false);
    navigate('/book');
  };

  const isFav = isFavorite(currentTrack.id);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col justify-between p-6 animate-in fade-in slide-in-from-bottom duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(false)}
          className="p-2.5 rounded-full bg-secondary text-foreground hover:bg-secondary-hover transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        <div className="text-center">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">Now Playing</span>
          <p className="text-xs text-muted-foreground">Avalon Music Audio Showcase</p>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            showToast('Track link copied!', 'success');
          }}
          className="p-2.5 rounded-full bg-secondary text-foreground hover:bg-secondary-hover transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Centerpiece: Vinyl & Album Artwork */}
      <div className="my-auto flex flex-col items-center justify-center py-4">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-secondary via-border to-primary/20 shadow-2xl flex items-center justify-center">
          {/* Vinyl Grooves Effect */}
          <div 
            className={`w-full h-full rounded-full bg-zinc-950 p-6 flex items-center justify-center border border-white/10 shadow-inner ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            {/* Center Label / Band Cover */}
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-zinc-900 shadow-xl">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Spindle hole */}
              <div className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-background border-2 border-white/60" />
            </div>
          </div>
        </div>

        {/* Audio Wave Visualizer Animation */}
        <div className="flex items-end justify-center gap-1 mt-6 h-6 w-full max-w-[200px]">
          {[12, 20, 8, 24, 16, 28, 10, 22, 14, 26, 18, 22, 12, 18].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full bg-primary transition-all duration-300 ${
                isPlaying ? 'opacity-90' : 'opacity-30'
              }`}
              style={{
                height: isPlaying ? `${Math.max(4, (h * (i % 2 === 0 ? 1 : 0.7)))}px` : '4px',
                animation: isPlaying ? `pulse-subtle ${0.6 + (i * 0.1)}s ease-in-out infinite alternate` : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Track Info & Controls */}
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Title, Artist & Like */}
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-4">
            <h2 className="text-xl font-bold font-display text-foreground truncate">
              {currentTrack.title}
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
              <span>{currentTrack.artist}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="text-primary font-medium">{currentTrack.genre}</span>
            </p>
          </div>
          <button
            onClick={() => toggleFavorite(currentTrack.id)}
            className={`p-3 rounded-full transition-transform active:scale-90 ${
              isFav ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Scrub Bar */}
        <div className="space-y-1.5">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`p-2 transition-colors ${isShuffle ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={prevTrack}
            className="p-3 text-foreground hover:text-primary transition-transform active:scale-90"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_25px_var(--primary-glow)] hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-3 text-foreground hover:text-primary transition-transform active:scale-90"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`p-2 transition-colors ${isRepeat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Volume & Watch Video Shortcuts */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-[150px]">
            <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-secondary rounded-lg appearance-none accent-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            {currentTrack.youtubeId && (
              <button
                onClick={() => {
                  setActiveVideoId(currentTrack.youtubeId || null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 text-xs font-semibold border border-red-500/30 transition-all"
              >
                <Video className="w-4 h-4 text-red-500" />
                <span>Live Video</span>
              </button>
            )}

            <button
              onClick={handleBookBand}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary-hover active:scale-95 transition-all"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Band</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
