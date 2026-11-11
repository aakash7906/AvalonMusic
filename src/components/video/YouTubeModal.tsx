import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { X, ExternalLink, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const YouTubeModal: React.FC = () => {
  const { activeVideoId, setActiveVideoId, pause } = useAudio();
  const navigate = useNavigate();

  if (!activeVideoId) return null;

  const handleClose = () => {
    setActiveVideoId(null);
  };

  const handleBook = () => {
    setActiveVideoId(null);
    navigate('/book');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl overflow-hidden shadow-2xl relative flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-3.5 border-b border-border flex items-center justify-between bg-secondary/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-xs font-bold text-foreground">Avalon Music Live Performance</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0`}
            title="Avalon Music Live Video Showcase"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3.5 bg-background flex items-center justify-between gap-3 text-xs">
          <a
            href={`https://www.youtube.com/watch?v=${activeVideoId}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open on YouTube</span>
          </a>

          <button
            onClick={handleBook}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary-hover transition-all"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Inquire Availability</span>
          </button>
        </div>
      </div>
    </div>
  );
};
