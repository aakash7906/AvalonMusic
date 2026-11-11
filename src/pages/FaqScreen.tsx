import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Wedding Entertainment',
    question: 'What music genres do your wedding bands perform?',
    answer: 'Our wedding bands cover Top 40, pop, rock, R&B, Motown, soul, jazz, swing, country, Latin, salsa, funk, disco, hip-hop, and classic hits from every decade. Many variety bands seamlessly transition between genres throughout the night.'
  },
  {
    category: 'Wedding Entertainment',
    question: 'Should I book a live band or a DJ for my wedding?',
    answer: 'Both are excellent choices. A live band delivers unmatched energy and audience interaction. A DJ offers a wider song library and is more budget-friendly. Avalon Music also offers hybrid band-and-DJ combo packages for continuous music.'
  },
  {
    category: 'Wedding Entertainment',
    question: 'Can the band learn our first dance song?',
    answer: 'Yes! All Avalon Music bands are happy to learn and arrange your special first dance song, father-daughter, and mother-son dances at no extra cost when requested in advance.'
  },
  {
    category: 'Pricing & Budget',
    question: 'How much does it cost to book a live band in Houston?',
    answer: 'Solo or duo performers start around $1,000–$2,000. Full variety bands typically range from $3,200–$8,500+. DJ packages start around $1,200–$2,500. We provide transparent, itemized quotes with no hidden fees.'
  },
  {
    category: 'Pricing & Budget',
    question: 'What factors affect the price of a live band?',
    answer: 'Key factors include the number of musicians (e.g. 5-piece vs 10-piece with full brass section), performance duration, event date (Saturdays and holidays book fastest), and sound/lighting requirements.'
  },
  {
    category: 'Corporate Events',
    question: 'What types of corporate events do you provide entertainment for?',
    answer: 'We provide entertainment for annual galas, awards ceremonies, holiday parties, product launches, corporate anniversary celebrations, executive dinners, and Houston Rodeo after-parties.'
  },
  {
    category: 'Corporate Events',
    question: 'Do you carry liability insurance for Houston corporate venues?',
    answer: 'Yes, Avalon Music carries full comprehensive commercial liability insurance and can provide Certificates of Insurance (COI) customized for your venue manager within 24 hours.'
  },
  {
    category: 'Logistics & Tech',
    question: 'Does the band provide their own sound and lighting equipment?',
    answer: 'Yes, all Avalon Music bands are fully self-contained with concert-grade sound systems (PA), stage monitors, wireless vocal microphones for toasts and speeches, and LED stage lighting.'
  },
  {
    category: 'Booking Process',
    question: 'How far in advance should I book my band or DJ?',
    answer: 'We recommend booking 6 to 12 months in advance, especially for peak Houston spring and fall wedding seasons, as well as December holiday party dates.'
  }
];

export const FaqScreen: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ['All', 'Wedding Entertainment', 'Pricing & Budget', 'Corporate Events', 'Logistics & Tech', 'Booking Process'];

  const filtered = FAQS.filter(item => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesQuery = item.question.toLowerCase().includes(search.toLowerCase()) ||
                         item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full flex flex-col space-y-4 px-4 pt-3 pb-24 text-foreground">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-1">
          <HelpCircle className="w-3 h-3" />
          <span>Help & FAQs</span>
        </div>
        <h1 className="text-xl font-bold font-display text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-muted-foreground">
          Everything you need to know about booking live music in Houston.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search questions (pricing, songs, sound)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCat === cat
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-2.5 pt-1">
        {filtered.map((item, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-bold text-foreground hover:text-primary transition-colors"
              >
                <span>{item.question}</span>
                <span className="p-1 rounded-lg bg-secondary text-muted-foreground shrink-0">
                  {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-2 animate-in fade-in duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <div className="p-4 rounded-2xl bg-secondary/60 border border-primary/30 text-center space-y-2 mt-4">
        <h4 className="text-xs font-bold text-foreground">Have a specific question not listed?</h4>
        <p className="text-[11px] text-muted-foreground">
          Speak with our Houston music directors directly.
        </p>
        <div className="flex items-center justify-center gap-2 pt-1">
          <a
            href="tel:8327238886"
            className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>(832) 723-8886</span>
          </a>
          <button
            onClick={() => navigate('/book')}
            className="px-3 py-1.5 rounded-xl bg-card border border-border text-foreground hover:text-primary font-semibold text-xs"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
};
