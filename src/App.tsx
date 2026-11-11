import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import { DesktopMobileFrame } from './components/layout/DesktopMobileFrame';
import { TopHeader } from './components/layout/TopHeader';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { MiniPlayer } from './components/player/MiniPlayer';
import { FullScreenPlayer } from './components/player/FullScreenPlayer';
import { YouTubeModal } from './components/video/YouTubeModal';
import { Toast } from './components/ui/Toast';
import { QuickSearchModal } from './components/search/QuickSearchModal';

import { SplashScreen } from './pages/SplashScreen';
import { OnboardingScreen } from './pages/OnboardingScreen';
import { AuthScreen } from './pages/AuthScreen';
import { HomeScreen } from './pages/HomeScreen';
import { MusicScreen } from './pages/MusicScreen';
import { RosterScreen } from './pages/RosterScreen';
import { BookingScreen } from './pages/BookingScreen';
import { EventsScreen } from './pages/EventsScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { FaqScreen } from './pages/FaqScreen';
import { AboutScreen } from './pages/AboutScreen';
import { BandDetailModal } from './pages/BandDetailModal';
import { Band } from './types';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [selectedBand, setSelectedBand] = useState<Band | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const hideNavigationRoutes = ['/splash', '/onboarding', '/auth'];
  const isNavHidden = hideNavigationRoutes.includes(location.pathname);

  return (
    <DesktopMobileFrame>
      {/* Toast Notification */}
      <Toast />

      {/* Mobile Top Header (hidden on standalone splash/auth screens) */}
      {!isNavHidden && <TopHeader onOpenSearch={() => setIsSearchOpen(true)} />}

      {/* Main Screen Routes */}
      <div className="flex-1 flex flex-col relative w-full min-w-0">
        <Routes>
          <Route path="/" element={<HomeScreen onSelectBand={setSelectedBand} />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/music" element={<MusicScreen />} />
          <Route path="/roster" element={<RosterScreen onSelectBand={setSelectedBand} />} />
          <Route path="/book" element={<BookingScreen />} />
          <Route path="/events" element={<EventsScreen />} />
          <Route path="/faq" element={<FaqScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/profile" element={<ProfileScreen onSelectBand={setSelectedBand} />} />
        </Routes>
      </div>

      {/* Persistent Mini Audio Player */}
      {!isNavHidden && <MiniPlayer />}

      {/* Mobile Bottom Navigation Bar */}
      {!isNavHidden && <BottomNavigation />}

      {/* Modals & Overlays */}
      <FullScreenPlayer />
      <YouTubeModal />
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectBand={setSelectedBand}
      />
      <BandDetailModal band={selectedBand} onClose={() => setSelectedBand(null)} />
    </DesktopMobileFrame>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AudioProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </AudioProvider>
    </AppProvider>
  );
};

export default App;
