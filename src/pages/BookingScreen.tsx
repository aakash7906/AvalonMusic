import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  MapPin,
  Users,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Send
} from 'lucide-react';
import { AVALON_BANDS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const BookingScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, submitInquiry, showToast } = useApp();

  const preselectedBand = searchParams.get('band') || '';
  const preselectedEvent = searchParams.get('event') || '';

  // Form State
  const [eventType, setEventType] = useState(
    preselectedEvent === 'weddings' ? 'Wedding Reception' :
      preselectedEvent === 'corporate' ? 'Corporate Gala' :
        preselectedEvent === 'private' ? 'Private Celebration' :
          preselectedEvent === 'djs' ? 'DJ & MC Service' : 'Wedding Reception'
  );

  const [talentChoice, setTalentChoice] = useState(
    preselectedBand || 'The Party Feels (Variety Band)'
  );

  const [eventDate, setEventDate] = useState('2027-05-15');
  const [eventHours, setEventHours] = useState(4);
  const [guestCount, setGuestCount] = useState(150);
  const [venueLocation, setVenueLocation] = useState('Houston - Uptown / Galleria');
  const [clientName, setClientName] = useState(user?.name || '');
  const [clientEmail, setClientEmail] = useState(user?.email || '');
  const [clientPhone, setClientPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  // Calculate live estimate
  const calculateEstimate = () => {
    let base = 3200;
    if (talentChoice.includes('DJ')) base = 1400;
    else if (talentChoice.includes('Chamber') || talentChoice.includes('Quartet')) base = 1800;
    else if (talentChoice.includes('Party Feels') || talentChoice.includes('Pictures')) base = 3800;
    else if (talentChoice.includes('David Caceres')) base = 2500;

    const hoursExtra = Math.max(0, eventHours - 3) * 450;
    const guestTier = guestCount > 250 ? 500 : guestCount > 150 ? 250 : 0;
    const total = base + hoursExtra + guestTier;
    return `$${total.toLocaleString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail || !clientName) {
      showToast('Please enter your name and email', 'warning');
      return;
    }

    const estimatedBudget = calculateEstimate();
    const newId = `AV-${Math.floor(1000 + Math.random() * 9000)}`;

    submitInquiry({
      eventType,
      bandOrService: talentChoice,
      eventDate,
      guestCount,
      venue: venueLocation,
      clientName,
      clientEmail,
      clientPhone: clientPhone || '(832) 723-8886',
      notes,
      estimatedBudget
    });

    setSubmittedId(newId);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-4 sm:space-y-6 px-4 sm:px-6 pt-3 sm:pt-5 pb-24 text-foreground overflow-x-hidden">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
          <CalendarCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Avalon Booking Concierge</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
          Request a Custom Band / DJ Quote
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Get transparent pricing and check musician availability in Houston.
        </p>
      </div>

      {isSubmitted ? (
        /* Confirmation State */
        <div className="p-6 rounded-3xl bg-card border border-primary/40 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto shadow-[0_0_30px_var(--primary-glow)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[11px] font-mono text-primary uppercase font-bold tracking-wider">
              Inquiry Ref #{submittedId}
            </span>
            <h2 className="text-xl font-black font-display text-foreground mt-1">
              Quote Request Received!
            </h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Thank you, <span className="font-semibold text-foreground">{clientName}</span>. Our Avalon Music Director is reviewing your date for <span className="font-semibold text-primary">{talentChoice}</span>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/70 border border-border text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Event:</span>
              <span className="font-semibold text-foreground">{eventType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Duration:</span>
              <span className="font-semibold text-foreground">{eventDate} ({eventHours} hrs)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Range:</span>
              <span className="font-bold text-primary">{calculateEstimate()}</span>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground">
            We will reply via email & SMS within 2 hours. You can also call us directly.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <a
              href="tel:8327238886"
              className="flex-1 py-3 px-4 rounded-xl bg-secondary hover:bg-secondary-hover text-primary font-bold text-xs border border-border flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>(832) 723-8886</span>
            </a>

            <button
              onClick={() => {
                setIsSubmitted(false);
                navigate('/profile');
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary-hover transition-all"
            >
              View My Inquiries
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Event Type */}
          <div className="space-y-1.5">
            <label className="block text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              1. Event Occasion
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {[
                'Wedding Reception',
                'Wedding Ceremony & Cocktail',
                'Corporate Gala',
                'Holiday Party',
                'Private Birthday',
                'Charity Ball'
              ].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEventType(type)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-all ${eventType === type
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-card border-border text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Band or Service Selection */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              2. Preferred Band or Ensemble
            </label>
            <select
              value={talentChoice}
              onChange={e => setTalentChoice(e.target.value)}
              className="w-full p-3 bg-card border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              {AVALON_BANDS.map(b => (
                <option key={b.id} value={`${b.name} (${b.genre})`}>
                  {b.name} — {b.genre} (From {b.startingPrice})
                </option>
              ))}
              <option value="Professional DJ & Bilingual MC">Professional DJ & Bilingual MC ($1,400+)</option>
              <option value="Avalon Chamber String Quartet">Avalon Chamber String Quartet ($1,800+)</option>
              <option value="Custom Hybrid (Live Band + Late-Night DJ)">Custom Hybrid (Live Band + Late-Night DJ)</option>
            </select>
          </div>

          {/* 3. Date, Hours & Guests */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Event Date
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                className="w-full p-2.5 bg-card border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Performance Hours
              </label>
              <select
                value={eventHours}
                onChange={e => setEventHours(Number(e.target.value))}
                className="w-full p-2.5 bg-card border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary"
              >
                <option value={2}>2 Hours (Cocktail / Dinner)</option>
                <option value={3}>3 Hours (Standard Reception)</option>
                <option value={4}>4 Hours (Full Gala / Party)</option>
                <option value={5}>5 Hours (Extended Wedding)</option>
              </select>
            </div>
          </div>

          {/* 4. Guest Count & Venue Location */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Expected Guests
              </label>
              <select
                value={guestCount}
                onChange={e => setGuestCount(Number(e.target.value))}
                className="w-full p-2.5 bg-card border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary"
              >
                <option value={75}>Under 100 Guests</option>
                <option value={150}>100 - 200 Guests</option>
                <option value={250}>200 - 350 Guests</option>
                <option value={500}>350+ Large Ballroom</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Metro Area / Venue
              </label>
              <select
                value={venueLocation}
                onChange={e => setVenueLocation(e.target.value)}
                className="w-full p-2.5 bg-card border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary"
              >
                <option value="Houston - Downtown / Astorian / Corinthian">Houston - Downtown</option>
                <option value="Houston - Uptown / Post Oak / Galleria">Houston - Uptown / Galleria</option>
                <option value="The Woodlands / Conroe">The Woodlands / Conroe</option>
                <option value="Katy / Fulshear">Katy / Fulshear</option>
                <option value="Sugar Land / Missouri City">Sugar Land</option>
                <option value="Galveston Island / Clear Lake">Galveston Island</option>
              </select>
            </div>
          </div>

          {/* 5. Contact Details */}
          <div className="p-3.5 rounded-2xl bg-card border border-border space-y-2.5">
            <h4 className="text-xs font-bold text-foreground">Your Contact Information</h4>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full p-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <input
                type="tel"
                placeholder="Phone (SMS Quote)"
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                className="w-full p-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <input
              type="email"
              required
              placeholder="Email Address"
              value={clientEmail}
              onChange={e => setClientEmail(e.target.value)}
              className="w-full p-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />

            <textarea
              rows={2}
              placeholder="Special song requests, venue notes, or timeline details..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full p-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Dynamic Estimate Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-secondary via-card to-secondary border border-primary/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground">Estimated Investment</span>
              <p className="text-lg font-black font-display text-primary">{calculateEstimate()}</p>
              <span className="text-[10px] text-muted-foreground">Includes Sound Engineer & Standard PA</span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" /> Avalon Guarantee
              </span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs shadow-[0_4px_25px_var(--primary-glow)] hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Inquiry for {talentChoice.split('(')[0]}</span>
          </button>
        </form>
      )}
    </div>
  );
};
