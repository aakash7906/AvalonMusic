import { Band, Track, Testimonial, LiveShowcaseEvent } from '../types';

export const AVALON_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Uptown Funk & Dance Medley',
    artist: 'The Party Feels',
    genre: 'Variety Bands',
    duration: '3:45',
    durationSec: 225,
    coverUrl: '/images/the-party-feels.avif',
    audioUrl: 'https://cdn.freesound.org/previews/612/612610_5674468-lq.mp3',
    youtubeId: 'DtFaEcXcnR8',
    description: 'High energy dance cover featuring complete brass section and vocal duo.'
  },
  {
    id: 'track-2',
    title: 'Midnight Soul & Motown Groove',
    artist: 'CC Rider Band',
    genre: 'R&B / Soul',
    duration: '4:12',
    durationSec: 252,
    coverUrl: '/images/ccrider-band.webp',
    audioUrl: 'https://cdn.freesound.org/previews/556/556730_12046830-lq.mp3',
    youtubeId: 'IQpNd-9Ve58',
    description: 'Timeless soul and R&B classics with authentic Hammond organ and warm brass.'
  },
  {
    id: 'track-3',
    title: 'Neon Moon & Modern Country',
    artist: 'Champagne Nights',
    genre: 'Country Pop',
    duration: '3:30',
    durationSec: 210,
    coverUrl: '/images/champagne-nights.avif',
    audioUrl: 'https://cdn.freesound.org/previews/682/682974_11861866-lq.mp3',
    youtubeId: 'j2PHt4gogLE',
    description: 'Contemporary country-pop fusion that keeps dance floors packed all night.'
  },
  {
    id: 'track-4',
    title: 'Fly Me to the Moon (Jazz Quintet)',
    artist: 'David Caceres Jazz',
    genre: 'Jazz & Swing',
    duration: '3:55',
    durationSec: 235,
    coverUrl: '/images/david-caceres-jazz.webp',
    audioUrl: 'https://cdn.freesound.org/previews/531/531947_11861866-lq.mp3',
    youtubeId: 'vwYeFeUaQRA',
    description: 'Sophisticated cocktail and dinner jazz led by renowned saxophonist David Caceres.'
  },
  {
    id: 'track-5',
    title: 'Don\'t Stop Believin\' Rock Anthem',
    artist: 'The Outsiders',
    genre: 'Variety Bands',
    duration: '4:20',
    durationSec: 260,
    coverUrl: '/images/outsiders.webp',
    audioUrl: 'https://cdn.freesound.org/previews/612/612610_5674468-lq.mp3',
    youtubeId: 'UyCWDOGKsxY',
    description: 'Crowd-pleasing classic rock and modern top-40 festival experience.'
  },
  {
    id: 'track-6',
    title: 'All I Ask Of You (String Quartet)',
    artist: 'Avalon Chamber Ensemble',
    genre: 'Chamber Music',
    duration: '3:15',
    durationSec: 195,
    coverUrl: '/images/wedding-event.webp',
    audioUrl: 'https://cdn.freesound.org/previews/386/386043_5121236-lq.mp3',
    description: 'Elegant acoustic string quartet perfect for romantic wedding ceremonies and galas.'
  },
  {
    id: 'track-7',
    title: 'Arioso by J.S. Bach',
    artist: 'Avalon Chamber Ensemble',
    genre: 'Chamber Music',
    duration: '2:50',
    durationSec: 170,
    coverUrl: '/images/hero-bg.webp',
    audioUrl: 'https://cdn.freesound.org/previews/557/557814_11861866-lq.mp3',
    description: 'Timeless baroque piece performed by principal Houston symphony players.'
  },
  {
    id: 'track-8',
    title: 'Tennessee Whiskey & Texas Roots',
    artist: '20 RIDE',
    genre: 'Country & Western',
    duration: '4:05',
    durationSec: 245,
    coverUrl: '/images/20-ride.webp',
    audioUrl: 'https://cdn.freesound.org/previews/682/682974_11861866-lq.mp3',
    youtubeId: 'j2PHt4gogLE',
    description: 'Texas country favorites, Americana anthems, and boot-scooting dance sets.'
  },
  {
    id: 'track-9',
    title: 'Yesterday (Beatles Acoustic Tribute)',
    artist: 'Avalon Chamber Ensemble',
    genre: 'Chamber Music',
    duration: '2:40',
    durationSec: 160,
    coverUrl: '/images/wedding-event.webp',
    audioUrl: 'https://cdn.freesound.org/previews/386/386043_5121236-lq.mp3',
    description: 'Modern pop classics arranged beautifully for cello and violin duo.'
  },
  {
    id: 'track-10',
    title: 'Hornpipe (Water Music)',
    artist: 'Avalon Chamber Ensemble',
    genre: 'Chamber Music',
    duration: '3:05',
    durationSec: 185,
    coverUrl: '/images/hero-bg.webp',
    audioUrl: 'https://cdn.freesound.org/previews/557/557814_11861866-lq.mp3',
    description: 'Celebratory recessional anthem favored by Texas wedding coordinators.'
  }
];

export const AVALON_BANDS: Band[] = [
  {
    id: 'the-party-feels',
    name: 'The Party Feels',
    tagline: "Houston's Premier High-Energy Variety & Dance Band",
    genre: 'Variety Bands',
    rating: 4.98,
    reviewsCount: 142,
    startingPrice: '$3,800',
    membersCount: '7 - 10 Piece Band',
    imageUrl: '/images/the-party-feels.avif',
    heroImageUrl: '/images/the-party-feels.avif',
    description: 'The Party Feels brings unmatched stage presence, continuous mashups, and electrifying multi-genre medleys spanning Motown, 80s/90s hits, modern top-40, Latin pop, and hip-hop. Customized line-ups with horn section and backup dancers.',
    features: [
      'Dual Male & Female Lead Vocals',
      'Dynamic 3-Piece Brass Section',
      'Non-stop DJ-style transitions between songs',
      'Customized First Dance & Special Request arrangements',
      'High-end Wireless IEMs and Stage Lighting package'
    ],
    repertoire: [
      'Bruno Mars, Dua Lipa, Beyonce, Earth Wind & Fire',
      'Stevie Wonder, Journey, Taylor Swift, Whitney Houston',
      'Blink-182, Pitbull, Selena, Michael Jackson'
    ],
    youtubeVideoId: 'DtFaEcXcnR8',
    popularEvents: ['Weddings', 'Corporate Galas', 'New Year\'s Eve Galas'],
    audioTracks: [AVALON_TRACKS[0]]
  },
  {
    id: 'cc-rider-band',
    name: 'CC Rider Band',
    tagline: 'Legendary Texas Rhythm & Blues, Soul, and Funk',
    genre: 'R&B / Soul',
    rating: 4.95,
    reviewsCount: 118,
    startingPrice: '$3,200',
    membersCount: '6 - 9 Piece Band',
    imageUrl: '/images/ccrider-band.webp',
    heroImageUrl: '/images/ccrider-band.webp',
    description: 'The premier classic R&B and Motown collective in Houston. With a deeply rooted groove, roaring saxophones, and powerhouse soulful vocals, CC Rider Band delivers unforgettable moments for luxury receptions and celebrations.',
    features: [
      'Authentic Vintage Motown & Stax Sound',
      'Searing Saxophone and Trombone section',
      'Decades of national touring experience',
      'Dinner Jazz set available prior to main dance party'
    ],
    repertoire: [
      'Otis Redding, Aretha Franklin, The Temptations',
      'Al Green, Marvin Gaye, Wilson Pickett, James Brown'
    ],
    youtubeVideoId: 'IQpNd-9Ve58',
    popularEvents: ['Weddings', 'Private Clubs', 'Anniversary Galas'],
    audioTracks: [AVALON_TRACKS[1]]
  },
  {
    id: 'champagne-nights',
    name: 'Champagne Nights',
    tagline: 'Modern Country Pop Crossover & Party Anthems',
    genre: 'Country Pop',
    rating: 4.92,
    reviewsCount: 89,
    startingPrice: '$3,400',
    membersCount: '6 - 8 Piece Band',
    imageUrl: '/images/champagne-nights.avif',
    heroImageUrl: '/images/champagne-nights.avif',
    description: 'The best of Nashville meets high-energy party rock. Champagne Nights transitions seamlessly from George Strait and Shania Twain to Chris Stapleton, Morgan Wallen, and current Billboard Top-40.',
    features: [
      'Fiddle, Pedal Steel Guitar & Twin Lead Guitars',
      'Harmonies that echo Nashville recording studios',
      'Line dance encouragement & crowd engagement',
      'Acoustic cocktail hour option included'
    ],
    repertoire: [
      'Luke Combs, Carrie Underwood, Zach Bryan',
      'Dolly Parton, Brooks & Dunn, Fleetwood Mac'
    ],
    youtubeVideoId: 'j2PHt4gogLE',
    popularEvents: ['Rodeo After-Parties', 'Ranch Weddings', 'Corporate Galas'],
    audioTracks: [AVALON_TRACKS[2]]
  },
  {
    id: 'david-caceres-jazz',
    name: 'David Caceres Jazz',
    tagline: 'World-Class Jazz Vocalist, Alto Saxophonist & Quartet',
    genre: 'Jazz & Swing',
    rating: 5.0,
    reviewsCount: 97,
    startingPrice: '$2,400',
    membersCount: '3 - 6 Piece Ensemble',
    imageUrl: '/images/david-caceres-jazz.webp',
    heroImageUrl: '/images/david-caceres-jazz.webp',
    description: 'David Caceres is a Houston jazz icon and Berklee College of Music alumnus. His velvet vocal delivery in the tradition of Sinatra and Nat King Cole, combined with virtuoso alto sax solos, creates pure luxury atmosphere.',
    features: [
      'Grammy-caliber musicianship and improvisation',
      'Great American Songbook & Bossa Nova repertoire',
      'Perfect decibel control for cocktail receptions and VIP dinners',
      'Upright acoustic bass and vintage jazz kit'
    ],
    repertoire: [
      'Frank Sinatra, Cole Porter, Antonio Carlos Jobim',
      'Miles Davis, Duke Ellington, George Gershwin'
    ],
    youtubeVideoId: 'vwYeFeUaQRA',
    popularEvents: ['Cocktail Receptions', 'Corporate Dinners', 'Art Museum Galas'],
    audioTracks: [AVALON_TRACKS[3]]
  },
  {
    id: 'the-outsiders',
    name: 'The Outsiders',
    tagline: 'High-Octane Rock, Pop & Timeless Dance Classics',
    genre: 'Variety Bands',
    rating: 4.89,
    reviewsCount: 76,
    startingPrice: '$3,100',
    membersCount: '5 - 7 Piece Band',
    imageUrl: '/images/outsiders.webp',
    heroImageUrl: '/images/outsiders.webp',
    description: 'From 80s synth-pop and 90s alternative to contemporary arena rock and pop-punk favorites, The Outsiders keep energy peaked with infectious charisma and guitar-driven dance hits.',
    features: [
      'Electrifying guitar solos and tight rhythm section',
      'Extensive 80s/90s retro catalog',
      'Interactive crowd participation and singalongs'
    ],
    repertoire: [
      'Queen, Def Leppard, Bon Jovi, The Killers',
      'Fall Out Boy, Toto, Maroon 5, Prince'
    ],
    youtubeVideoId: 'UyCWDOGKsxY',
    popularEvents: ['Corporate Holiday Parties', 'Alumni Events', 'Milestone Birthdays'],
    audioTracks: [AVALON_TRACKS[4]]
  },
  {
    id: 'the-pictures-band',
    name: 'The Pictures Band',
    tagline: 'Austin & Houston Hall of Fame Dance Variety',
    genre: 'Variety Bands',
    rating: 4.96,
    reviewsCount: 160,
    startingPrice: '$3,600',
    membersCount: '6 - 9 Piece Band',
    imageUrl: '/images/pictures-band.jpg',
    heroImageUrl: '/images/pictures-band.jpg',
    description: 'Voted top live wedding and corporate band in Texas for multiple consecutive years. Seamless medleys, state-of-the-art visuals, and relentless energy.',
    features: [
      'Continuous 3-4 hour non-stop dance sets',
      'Full horn section with choreography',
      'Award-winning sound engineering team included'
    ],
    repertoire: [
      'Motown, Disco, 80s New Wave, Modern Pop, Latin & Hip Hop'
    ],
    youtubeVideoId: 'slh41BDq9xs',
    popularEvents: ['Weddings', 'Mardi Gras Balls', 'Charity Galas'],
    audioTracks: [AVALON_TRACKS[0]]
  },
  {
    id: '20-ride',
    name: '20 RIDE',
    tagline: 'America\'s #1 Zac Brown Band & Country Tribute',
    genre: 'Country & Western',
    rating: 4.93,
    reviewsCount: 84,
    startingPrice: '$3,500',
    membersCount: '6 Piece Band',
    imageUrl: '/images/20-ride.webp',
    heroImageUrl: '/images/20-ride.webp',
    description: '20 RIDE brings the down-home beach-country vibe of Zac Brown Band, Chris Stapleton, and Kenny Chesney. Perfect for outdoor festivals, Texas rodeos, and country club affairs.',
    features: [
      'Twin acoustic & electric guitars, fiddle, and mandolin',
      'Three-part vocal harmonies and crowd sing-alongs',
      'Southern rock and classic country crossovers'
    ],
    repertoire: [
      'Chicken Fried, Toes, Knee Deep, Colder Weather, Free'
    ],
    youtubeVideoId: 'j2PHt4gogLE',
    popularEvents: ['Houston Rodeo Parties', 'Outdoor Galas', 'Private Ranches'],
    audioTracks: [AVALON_TRACKS[7]]
  }
];

export const AVALON_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Haley Hughes',
    role: 'Bride',
    event: 'Wedding Reception',
    venue: 'The Astorian, Houston',
    quote: 'Avalon Music made our wedding reception unforgettable! The Party Feels kept our guests dancing literally until the venue turned the lights on. Booking through Avalon was seamless and completely stress-free.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Jon Naylor',
    role: 'Corporate Event Director',
    event: 'Annual Energy Gala',
    venue: 'The Post Oak Hotel Uptown',
    quote: 'We have used Avalon Music for our corporate holiday galas for four years in a row. They are unmatched in responsiveness, professionalism, and talent quality. They make my job so much easier.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Lola Weller',
    role: 'Certified Wedding Planner',
    event: 'Luxury Destination Wedding',
    venue: 'The Houstonian Hotel & Club',
    quote: 'As an event planner in Houston for over 15 years, Avalon Music is my absolute first phone call for live entertainment. From chamber strings at the altar to a 10-piece brass band at midnight, they deliver perfection.',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'Radhika J. Day',
    role: 'Host',
    event: 'Cultural Fusion Wedding',
    venue: 'Corinthian Houston',
    quote: 'The musicians accommodated our custom cultural songs with such grace and precision. The sound was impeccable and the band was dressed to the nines. Thank you Avalon Music!',
    rating: 5
  },
  {
    id: 'test-5',
    name: 'Jim Gray',
    role: 'Country Club President',
    event: 'Member Invitational Showcase',
    venue: 'River Oaks Country Club',
    quote: 'David Caceres Jazz was a phenomenal fit for our dinner showcase. The sophistication and level of playing received praise from every single club member.',
    rating: 5
  }
];

export const LIVE_SHOWCASES: LiveShowcaseEvent[] = [
  {
    id: 'showcase-1',
    title: 'Houston Spring Wedding & Live Music Showcase',
    bandName: 'The Party Feels & Avalon Chamber Strings',
    date: 'Dec 18, 2026',
    time: '7:30 PM - 10:00 PM',
    venue: 'The Corinthian Houston',
    address: '2315 Washington Ave, Houston, TX 77007',
    coverImage: '/images/the-party-feels.avif',
    ticketType: 'VIP RSVP',
    description: 'Experience live auditions and full band showcase in an intimate ballroom setting with complimentary champagne.'
  },
  {
    id: 'showcase-2',
    title: 'Uptown Soul & R&B Gala Night',
    bandName: 'CC Rider Band',
    date: 'Jan 08, 2027',
    time: '8:00 PM - 11:30 PM',
    venue: 'The Post Oak Hotel Ballroom',
    address: '1600 W Loop S, Houston, TX 77027',
    coverImage: '/images/ccrider-band.webp',
    ticketType: 'Free Admission',
    description: 'A special public preview of CC Rider Band performing classic soul, Motown, and dance floor favorites.'
  },
  {
    id: 'showcase-3',
    title: 'Boutique Jazz & Wine Soiree',
    bandName: 'David Caceres Jazz Quartet',
    date: 'Jan 22, 2027',
    time: '6:30 PM - 9:00 PM',
    venue: 'Hotel Granduca Houston',
    address: '1080 Uptown Park Blvd, Houston, TX 77056',
    coverImage: '/images/david-caceres-jazz.webp',
    ticketType: 'Private Showcase',
    description: 'An elegant evening featuring David Caceres performing Sinatra, Jobim, and original jazz classics.'
  },
  {
    id: 'showcase-4',
    title: 'Texas Rodeo & Country Music Kickoff',
    bandName: '20 RIDE & Champagne Nights',
    date: 'Feb 12, 2027',
    time: '7:00 PM - 11:00 PM',
    venue: 'The Rustic Downtown',
    address: '1836 Polk St, Houston, TX 77003',
    coverImage: '/images/champagne-nights.avif',
    ticketType: 'VIP RSVP',
    description: 'Celebrating Texas tradition with modern country pop, boot-scooting dance sets, and food.'
  }
];

export const GENRE_CATEGORIES = [
  'All',
  'Variety Bands',
  'R&B / Soul',
  'Country Pop',
  'Jazz & Swing',
  'Chamber Music',
  'DJ & Hybrid',
  'Latin & Salsa'
];

export const EVENT_SERVICES = [
  {
    id: 'weddings',
    title: 'Weddings & Ceremonies',
    icon: 'Heart',
    description: 'Ceremony strings, cocktail jazz, and high-energy reception dance bands.',
    image: '/images/wedding-event.webp',
    stats: '2,800+ Couples Booked'
  },
  {
    id: 'corporate',
    title: 'Corporate Galas & Summits',
    icon: 'Briefcase',
    description: 'Flawless production, punctuality, and vetted entertainment for fortune 500 events.',
    image: '/images/corporate-event.webp',
    stats: '1,400+ Galas'
  },
  {
    id: 'private',
    title: 'Private Celebrations & Birthdays',
    icon: 'PartyPopper',
    description: 'Turn your milestone anniversary, birthday or estate party into an unforgettable concert.',
    image: '/images/private-party.jpg',
    stats: '1,200+ Parties'
  },
  {
    id: 'djs',
    title: 'Professional DJ & MC Services',
    icon: 'Disc3',
    description: 'Seamless music curation, wireless microphones, smart lighting, and bilingual MCs.',
    image: '/images/dj-service.webp',
    stats: '5-Star Rated'
  }
];
