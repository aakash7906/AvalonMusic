export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  durationSec: number;
  coverUrl: string;
  audioUrl: string; // real audio stream or preview
  youtubeId?: string;
  description?: string;
}

export interface Band {
  id: string;
  name: string;
  tagline: string;
  genre: string;
  rating: number;
  reviewsCount: number;
  startingPrice: string;
  membersCount: string;
  imageUrl: string;
  heroImageUrl: string;
  description: string;
  features: string[];
  repertoire: string[];
  youtubeVideoId: string;
  audioTracks: Track[];
  popularEvents: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  event: string;
  venue: string;
  quote: string;
  rating: number;
}

export interface BookingInquiry {
  id: string;
  eventType: string;
  bandOrService: string;
  eventDate: string;
  guestCount: number;
  venue: string;
  status: 'Pending' | 'Confirmed' | 'Reviewing';
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  estimatedBudget?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'event' | 'music';
}

export interface LiveShowcaseEvent {
  id: string;
  title: string;
  bandName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  coverImage: string;
  ticketType: 'Free Admission' | 'VIP RSVP' | 'Private Showcase';
  description: string;
}
