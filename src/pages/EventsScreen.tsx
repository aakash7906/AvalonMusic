import React from 'react';
import { Calendar, MapPin, Clock, Ticket, Share2, Check } from 'lucide-react';
import { LIVE_SHOWCASES } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const EventsScreen: React.FC = () => {
  const { rsvpEvent, isRsvpd, showToast } = useApp();

  const handleShare = (title: string) => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Event "${title}" copied to clipboard!`, 'info');
  };

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-4 sm:space-y-6 px-4 sm:px-6 pt-3 sm:pt-5 pb-24 text-foreground overflow-x-hidden">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Houston Showcases</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
          Live Band Showcases & Events
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Hear our bands live in person across Houston premier ballrooms & venues.
        </p>
      </div>

      {/* Events List (2-column on tablet) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1 w-full min-w-0">
        {LIVE_SHOWCASES.map(event => {
          const rsvpd = isRsvpd(event.id);

          return (
            <div
              key={event.id}
              className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl flex flex-col group hover:border-primary/40 transition-all"
            >
              {/* Event Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/40">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full img-event-focus group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-black/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow">
                    {event.ticketType}
                  </span>
                </div>

                <button
                  onClick={() => handleShare(event.title)}
                  className="absolute top-3 right-3 p-2 rounded-full glass-panel text-white hover:text-primary transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-2 left-3 right-3">
                  <span className="text-[11px] font-bold text-amber-300">
                    {event.bandName}
                  </span>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold font-display text-foreground">
                    {event.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{event.date}</span>
                    <span className="text-zinc-600">•</span>
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">{event.venue}</span>
                      <p className="text-[11px] text-muted-foreground">{event.address}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Complimentary Admission
                  </span>

                  <button
                    onClick={() => rsvpEvent(event.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${rsvpd
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-primary text-primary-foreground shadow-md hover:bg-primary-hover active:scale-95'
                      }`}
                  >
                    {rsvpd ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>RSVP Confirmed</span>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-3.5 h-3.5" />
                        <span>RSVP Free</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
