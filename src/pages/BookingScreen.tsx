import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Send,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  Music,
  UserCheck,
  Check
} from 'lucide-react';
import { AVALON_BANDS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

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

  // Match preselected band to exact option value if provided
  const getInitialTalent = () => {
    if (!preselectedBand) return 'The Party Feels (Variety Bands)';
    const found = AVALON_BANDS.find(
      b => b.name.toLowerCase() === preselectedBand.toLowerCase() ||
           b.id.toLowerCase() === preselectedBand.toLowerCase()
    );
    if (found) return `${found.name} (${found.genre})`;
    return preselectedBand;
  };

  const [talentChoice, setTalentChoice] = useState(getInitialTalent);
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
    else if (talentChoice.includes('Champagne')) base = 3400;
    else if (talentChoice.includes('CC Rider')) base = 3200;
    else if (talentChoice.includes('Outsiders')) base = 3500;
    else if (talentChoice.includes('20 RIDE')) base = 3200;
    else if (talentChoice.includes('Hybrid')) base = 4800;

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
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-5 px-4 sm:px-6 pt-3 sm:pt-5 pb-24 text-foreground overflow-x-hidden">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 border border-white/10">
          <CalendarCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-spotify-green" />
          <span>Avalon Booking Concierge</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground tracking-tight">
          Request a Custom Band / DJ Quote
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Get transparent pricing and check musician availability in Houston.
        </p>
      </div>

      {isSubmitted ? (
        /* Confirmation State */
        <div className="p-6 rounded-3xl bg-[#181818] border border-white/15 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <CheckCircle2 className="w-9 h-9 text-spotify-green" />
          </div>

          <div>
            <span className="text-[11px] font-mono text-spotify-green uppercase font-bold tracking-wider">
              Inquiry Ref #{submittedId}
            </span>
            <h2 className="text-xl font-black font-display text-foreground mt-1">
              Quote Request Received!
            </h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Thank you, <span className="font-semibold text-foreground">{clientName}</span>. Our Avalon Music Director is reviewing your date for <span className="font-semibold text-white">{talentChoice}</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#202020] border border-white/10 text-xs space-y-2.5 text-left">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Event:</span>
              <span className="font-semibold text-foreground">{eventType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date & Duration:</span>
              <span className="font-semibold text-foreground">{eventDate} ({eventHours} hrs)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Venue Area:</span>
              <span className="font-semibold text-foreground">{venueLocation}</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-white/10">
              <span className="text-muted-foreground">Estimated Range:</span>
              <span className="font-bold text-sm text-spotify-green">{calculateEstimate()}</span>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground">
            We will reply via email & SMS within 2 hours. You can also call us directly.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <a
              href="tel:8327238886"
              className="flex-1 py-3 px-4 rounded-xl bg-[#242424] hover:bg-[#2c2c2c] text-white font-bold text-xs border border-white/10 flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-spotify-green" />
              <span>(832) 723-8886</span>
            </a>

            <button
              onClick={() => {
                setIsSubmitted(false);
                navigate('/profile');
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-bold text-xs shadow-md hover:bg-neutral-200 transition-all"
            >
              View My Inquiries
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
              ].map(type => {
                const isSelected = eventType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-md font-bold'
                        : 'bg-[#181818] border-white/10 text-neutral-300 hover:border-white/25 hover:bg-[#202020] hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-1">{type}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-black shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Band or Service Selection (Shadcn Dropdown) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              2. Preferred Band or Ensemble
            </label>
            <Select value={talentChoice} onValueChange={setTalentChoice}>
              <SelectTrigger
                icon={<Music className="w-4 h-4 text-spotify-green" />}
                className="py-3 px-3.5"
              >
                <SelectValue placeholder="Select band or ensemble..." />
              </SelectTrigger>
              <SelectContent maxHeight="max-h-72">
                <SelectLabel>Avalon Headliner Bands</SelectLabel>
                {AVALON_BANDS.map(b => (
                  <SelectItem
                    key={b.id}
                    value={`${b.name} (${b.genre})`}
                    label={`${b.name} — ${b.genre}`}
                    sublabel={b.tagline || `${b.genre} • ${b.membersCount}`}
                    badge={`From ${b.startingPrice}`}
                  >
                    {b.name}
                  </SelectItem>
                ))}

                <SelectSeparator />
                <SelectLabel>Specialized & Hybrid Services</SelectLabel>
                <SelectItem
                  value="Professional DJ & Bilingual MC"
                  label="Professional DJ & Bilingual MC"
                  sublabel="Live mixing, premium sound system & bilingual MC"
                  badge="From $1,400"
                >
                  Professional DJ & Bilingual MC
                </SelectItem>
                <SelectItem
                  value="Avalon Chamber String Quartet"
                  label="Avalon Chamber String Quartet"
                  sublabel="Acoustic strings for ceremonies, dinners & galas"
                  badge="From $1,800"
                >
                  Avalon Chamber String Quartet
                </SelectItem>
                <SelectItem
                  value="Custom Hybrid (Live Band + Late-Night DJ)"
                  label="Custom Hybrid (Live Band + Late-Night DJ)"
                  sublabel="Full 8-piece band for reception + DJ after-party"
                  badge="From $4,800"
                >
                  Custom Hybrid (Live Band + Late-Night DJ)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 3. Date & Performance Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Event Date
              </label>
              <Input
                type="date"
                required
                icon={<Calendar className="w-4 h-4 text-spotify-green" />}
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                className="[color-scheme:dark] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Performance Hours
              </label>
              <Select value={String(eventHours)} onValueChange={val => setEventHours(Number(val))}>
                <SelectTrigger icon={<Clock className="w-4 h-4 text-spotify-green" />}>
                  <SelectValue placeholder="Select hours..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="2"
                    label="2 Hours (Cocktail / Dinner)"
                    sublabel="Ideal for ceremonies or cocktail hours"
                  >
                    2 Hours (Cocktail / Dinner)
                  </SelectItem>
                  <SelectItem
                    value="3"
                    label="3 Hours (Standard Reception)"
                    sublabel="Standard 3-hour reception set"
                  >
                    3 Hours (Standard Reception)
                  </SelectItem>
                  <SelectItem
                    value="4"
                    label="4 Hours (Full Gala / Party)"
                    sublabel="Most popular — full reception coverage"
                  >
                    4 Hours (Full Gala / Party)
                  </SelectItem>
                  <SelectItem
                    value="5"
                    label="5 Hours (Extended Wedding)"
                    sublabel="Ceremony, cocktails, dinner & dancing"
                  >
                    5 Hours (Extended Wedding)
                  </SelectItem>
                  <SelectItem
                    value="6"
                    label="6 Hours (All-Night Gala)"
                    sublabel="Complete full-day audio & entertainment"
                  >
                    6 Hours (All-Night Gala)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 4. Guest Count & Venue Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Expected Guests
              </label>
              <Select value={String(guestCount)} onValueChange={val => setGuestCount(Number(val))}>
                <SelectTrigger icon={<Users className="w-4 h-4 text-spotify-green" />}>
                  <SelectValue placeholder="Guest count..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="75"
                    label="Under 100 Guests"
                    sublabel="Intimate room acoustics"
                  >
                    Under 100 Guests
                  </SelectItem>
                  <SelectItem
                    value="150"
                    label="100 - 200 Guests"
                    sublabel="Standard ballroom audio package"
                  >
                    100 - 200 Guests
                  </SelectItem>
                  <SelectItem
                    value="250"
                    label="200 - 350 Guests"
                    sublabel="Enhanced subwoofers & fill speakers"
                  >
                    200 - 350 Guests
                  </SelectItem>
                  <SelectItem
                    value="500"
                    label="350+ Large Ballroom"
                    sublabel="Concert-grade line array sound system"
                  >
                    350+ Large Ballroom
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Metro Area / Venue
              </label>
              <Select value={venueLocation} onValueChange={setVenueLocation}>
                <SelectTrigger icon={<MapPin className="w-4 h-4 text-spotify-green" />}>
                  <SelectValue placeholder="Select venue location..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Houston - Downtown / Astorian / Corinthian"
                    label="Houston - Downtown"
                    sublabel="The Corinthian, The Astorian, Crystal Ballroom"
                  >
                    Houston - Downtown
                  </SelectItem>
                  <SelectItem
                    value="Houston - Uptown / Galleria"
                    label="Houston - Uptown / Galleria"
                    sublabel="The Post Oak Hotel, Houstonian Hotel"
                  >
                    Houston - Uptown / Galleria
                  </SelectItem>
                  <SelectItem
                    value="The Woodlands / Conroe"
                    label="The Woodlands / Conroe"
                    sublabel="Woodlands Resort, The Peach Orchard"
                  >
                    The Woodlands / Conroe
                  </SelectItem>
                  <SelectItem
                    value="Katy / Fulshear"
                    label="Katy / Fulshear"
                    sublabel="Agave Estates, Cane Island"
                  >
                    Katy / Fulshear
                  </SelectItem>
                  <SelectItem
                    value="Sugar Land / Missouri City"
                    label="Sugar Land / Missouri City"
                    sublabel="Safari Texas, Sugar Land Marriott"
                  >
                    Sugar Land / Missouri City
                  </SelectItem>
                  <SelectItem
                    value="Galveston Island / Clear Lake"
                    label="Galveston Island / Clear Lake"
                    sublabel="The Tremont House, San Luis Resort"
                  >
                    Galveston Island / Clear Lake
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 5. Contact Details (Shadcn Inputs) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#161616] border border-white/10 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-spotify-green">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-foreground">Your Contact Information</h4>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">Quick 2-Hr Response</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Input
                type="text"
                required
                icon={<User className="w-4 h-4" />}
                placeholder="Full Name"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
              />
              <Input
                type="tel"
                icon={<Phone className="w-4 h-4" />}
                placeholder="Phone (SMS Quote)"
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
              />
            </div>

            <Input
              type="email"
              required
              icon={<Mail className="w-4 h-4" />}
              placeholder="Email Address"
              value={clientEmail}
              onChange={e => setClientEmail(e.target.value)}
            />

            <Textarea
              rows={2}
              icon={<FileText className="w-4 h-4" />}
              placeholder="Special song requests, venue notes, or timeline details..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          {/* Dynamic Estimate Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181818] via-[#202020] to-[#181818] border border-white/15 flex items-center justify-between shadow-md">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                Estimated Investment
              </span>
              <p className="text-xl font-black font-display text-white mt-0.5">
                {calculateEstimate()}
              </p>
              <span className="text-[10px] text-neutral-400">Includes Sound Engineer & Standard PA</span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] text-spotify-green font-semibold bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" /> Avalon Guarantee
              </span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-white text-black font-bold text-xs sm:text-sm shadow-[0_4px_25px_rgba(255,255,255,0.2)] hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Inquiry for {talentChoice.split('(')[0].trim()}</span>
          </button>
        </form>
      )}
    </div>
  );
};
