import React from 'react';
import {
  ShieldCheck,
  Award,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Heart,
  Users,
  Music,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutScreen: React.FC = () => {
  const navigate = useNavigate();

  const locations = [
    'Houston (Downtown & Galleria)',
    'The Woodlands & Conroe',
    'Katy & Fulshear',
    'Sugar Land & Missouri City',
    'Galveston Island & Clear Lake',
    'Pearland & Friendswood'
  ];

  const milestones = [
    { year: '1993', title: 'Founded in Houston', desc: 'Started by working musicians to advocate for both clients and talent.' },
    { year: '2005', title: '500+ Annual Events', desc: 'Became preferred entertainment agency for Houston premier ballrooms.' },
    { year: '2016', title: 'Shining Star Award', desc: 'Honored with industry recognition for excellence in wedding entertainment.' },
    { year: 'Today', title: '30+ Years & 5,000+ Events', desc: 'Houston\'s most trusted live music agency with an unmatched 5-star reputation.' }
  ];

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col space-y-5 sm:space-y-7 px-3.5 sm:px-6 pt-3 sm:pt-5 pb-24 text-foreground overflow-x-hidden">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
          <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Our Story</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
          About Avalon Music
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Connecting Houston clients with world-class live musicians since 1993.
        </p>
      </div>

      {/* Hero Image Card */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-xl">
        <img
          src="/images/about-founder.jpg"
          alt="Avalon Music Founders and Musicians"
          className="w-full h-44 sm:h-64 md:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 space-y-0.5 sm:space-y-1">
          <span className="text-[10px] sm:text-xs uppercase font-bold text-primary tracking-wide">30+ Years of Excellence</span>
          <h3 className="text-base sm:text-xl font-bold text-white">Musicians Advocating for Musicians & Clients</h3>
        </div>
      </div>

      {/* Founder & Mission */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <h2 className="text-sm font-bold font-display text-foreground flex items-center gap-2">
          <Music className="w-4 h-4 text-primary" />
          <span>The Avalon Philosophy</span>
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Founded in Houston in 1993, Avalon Music was established with a singular mission: to provide unforgettable live musical experiences backed by exceptional responsiveness and personal attention.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Unlike generic nationwide booking directories, we are local Houston musicians and entertainment directors who personally know every player on our roster. We attend rehearsals, coordinate timelines with venue staff, and ensure your event sounds magnificent.
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="space-y-2.5">
        <h2 className="text-sm font-bold font-display text-foreground">
          Our Professional Commitment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-card border border-border space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <h4 className="text-xs font-bold text-foreground">Unmatched Responsiveness</h4>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug pl-6">
              Calls and emails answered promptly. Fast customized pricing with zero delays.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-card border border-border space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <h4 className="text-xs font-bold text-foreground">Only Vetted Musicians</h4>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug pl-6">
              Every performer is auditioned, experienced, and dressed appropriately for black-tie affairs.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-card border border-border space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <h4 className="text-xs font-bold text-foreground">Ironclad Contracts</h4>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug pl-6">
              Transparent terms, backup musicians on standby, and comprehensive liability insurance.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-card border border-border space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <h4 className="text-xs font-bold text-foreground">Shining Star Award</h4>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug pl-6">
              Consistently recognized by Texas event associations and luxury venues.
            </p>
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <h2 className="text-sm font-bold font-display text-foreground flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          <span>Milestones Over Three Decades</span>
        </h2>

        <div className="space-y-3 pt-1">
          {milestones.map((m, idx) => (
            <div key={idx} className="flex gap-3 text-xs">
              <span className="font-mono font-bold text-primary shrink-0 w-12 pt-0.5">{m.year}</span>
              <div className="space-y-0.5">
                <h4 className="font-bold text-foreground">{m.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locations Served */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <h2 className="text-sm font-bold font-display text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Greater Houston & Regional Texas Coverage</span>
        </h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {locations.map((loc, i) => (
            <div key={i} className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="truncate">{loc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Concierge Direct */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-secondary to-card border border-primary/30 space-y-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-primary">Get In Touch</span>
          <h3 className="text-sm font-bold text-foreground">Speak Directly With Our Directors</h3>
        </div>

        <div className="space-y-2 text-xs">
          <a href="tel:8327238886" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <span className="font-bold">(832) 723-8886</span>
          </a>
          <a href="mailto:info@theavalonmusic.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span>info@theavalonmusic.com</span>
          </a>
        </div>

        <button
          onClick={() => navigate('/book')}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Request Custom Event Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
