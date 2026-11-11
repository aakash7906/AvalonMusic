import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingInquiry, AppNotification } from '../types';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: 'Event Host' | 'Bride / Groom' | 'Event Planner' | 'Corporate Coordinator';
  avatar?: string;
  eventDate?: string;
}

interface FrameSettings {
  enabled: boolean;
  skin: 'titanium' | 'midnight' | 'gold' | 'silver';
  scale: number;
  showDynamicIsland: boolean;
}

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
  favorites: string[];
  inquiries: BookingInquiry[];
  rsvps: string[];
  notifications: AppNotification[];
  frameSettings: FrameSettings;
  activeToast: ToastMessage | null;
  login: (email: string, role?: UserProfile['role']) => void;
  signup: (profile: UserProfile) => void;
  logout: () => void;
  completeOnboarding: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  submitInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => void;
  rsvpEvent: (eventId: string) => void;
  isRsvpd: (eventId: string) => boolean;
  markNotificationRead: (id: string) => void;
  updateFrameSettings: (partial: Partial<FrameSettings>) => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Spring Showcase RSVP Open',
    message: 'RSVP now for live showcases at The Corinthian Houston.',
    time: '20m ago',
    read: false,
    type: 'event'
  },
  {
    id: 'notif-2',
    title: 'Welcome to Avalon Music',
    message: 'Houston\'s premier live music booking agency since 1993.',
    time: '1h ago',
    read: false,
    type: 'music'
  }
];

const INITIAL_INQUIRIES: BookingInquiry[] = [
  {
    id: 'avalon-8492',
    eventType: 'Wedding Reception',
    bandOrService: 'The Party Feels (9-Piece)',
    eventDate: '2027-04-18',
    guestCount: 220,
    venue: 'The Astorian Houston',
    status: 'Confirmed',
    createdAt: '2 days ago',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah.j@example.com',
    clientPhone: '(713) 555-0182',
    estimatedBudget: '$4,200',
    notes: 'Requested first dance song arrangement and Motown brass cocktail set.'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('avalon_user');
    return saved ? JSON.parse(saved) : {
      name: 'Elena Vance',
      email: 'elena.vance@example.com',
      phone: '(832) 555-7821',
      role: 'Bride / Groom',
      eventDate: 'Oct 24, 2027'
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('avalon_logged_in') !== 'false';
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('avalon_onboarded') === 'true';
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('avalon_favs');
    return saved ? JSON.parse(saved) : ['the-party-feels', 'david-caceres-jazz', 'track-1'];
  });

  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    const saved = localStorage.getItem('avalon_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [rsvps, setRsvps] = useState<string[]>(['showcase-1']);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  const [frameSettings, setFrameSettings] = useState<FrameSettings>({
    enabled: true,
    skin: 'titanium',
    scale: 1,
    showDynamicIsland: true
  });

  const showToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString();
    setActiveToast({ id, message, type });
    setTimeout(() => {
      setActiveToast(prev => (prev?.id === id ? null : prev));
    }, 3200);
  };

  const clearToast = () => setActiveToast(null);

  const login = (email: string, role: UserProfile['role'] = 'Bride / Groom') => {
    const profile: UserProfile = {
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '(832) 723-8886',
      role
    };
    setUser(profile);
    setIsLoggedIn(true);
    localStorage.setItem('avalon_user', JSON.stringify(profile));
    localStorage.setItem('avalon_logged_in', 'true');
    showToast(`Welcome back, ${profile.name}!`, 'success');
  };

  const signup = (profile: UserProfile) => {
    setUser(profile);
    setIsLoggedIn(true);
    localStorage.setItem('avalon_user', JSON.stringify(profile));
    localStorage.setItem('avalon_logged_in', 'true');
    showToast(`Account created successfully!`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('avalon_logged_in', 'false');
    showToast('Signed out of Avalon Music', 'info');
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('avalon_onboarded', 'true');
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('avalon_favs', JSON.stringify(updated));
      showToast(exists ? 'Removed from saved' : 'Added to saved favorites', 'info');
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const submitInquiry = (inquiryData: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: BookingInquiry = {
      ...inquiryData,
      id: `avalon-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      status: 'Reviewing'
    };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('avalon_inquiries', JSON.stringify(updated));
    showToast('Booking request submitted to Avalon Concierge!', 'success');
  };

  const rsvpEvent = (eventId: string) => {
    setRsvps(prev => {
      const exists = prev.includes(eventId);
      const updated = exists ? prev.filter(id => id !== eventId) : [...prev, eventId];
      showToast(exists ? 'RSVP canceled' : 'RSVP confirmed! Added to your schedule', 'success');
      return updated;
    });
  };

  const isRsvpd = (eventId: string) => rsvps.includes(eventId);

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const updateFrameSettings = (partial: Partial<FrameSettings>) => {
    setFrameSettings(prev => ({ ...prev, ...partial }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        hasCompletedOnboarding,
        favorites,
        inquiries,
        rsvps,
        notifications,
        frameSettings,
        activeToast,
        login,
        signup,
        logout,
        completeOnboarding,
        toggleFavorite,
        isFavorite,
        submitInquiry,
        rsvpEvent,
        isRsvpd,
        markNotificationRead,
        updateFrameSettings,
        showToast,
        clearToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
