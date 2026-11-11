import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import { DesktopMobileFrame } from './components/layout/DesktopMobileFrame';
import { TopHeader } from './components/layout/TopHeader';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { FullScreenPlayer } from './components/player/FullScreenPlayer';
import { YouTubeModal } from './components/video/YouTubeModal';
import { Toast } from './components/ui/Toast';

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
  const navigate = useNavigate();
  const [selectedBand, setSelectedBand] = useState<Band | null>(null);

  // On page refresh / initial app load, always start from the splash screen
  useEffect(() => {
    navigate('/splash', { replace: true });
  }, []);

  const hideNavigationRoutes = ['/splash', '/onboarding', '/auth'];
  const isNavHidden = hideNavigationRoutes.includes(location.pathname);

  return (
    <DesktopMobileFrame>
      {/* Toast Notification */}
      <Toast />

      {/* Main App Container: Fixed Height Flex Column */}
      <div className="w-full h-full flex flex-col relative overflow-hidden bg-background min-w-0">
        {/* Top Header with Inline Search (Fixed at top, never scrolls) */}
        {!isNavHidden && <TopHeader onSelectBand={setSelectedBand} />}

        {/* Scrollable Content Viewport (Zero scrollbar, smooth touch inertial scrolling) */}
        <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative min-w-0 overscroll-contain no-scrollbar scroll-touch">
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
        </main>

        {/* Floating Spotify Bottom Navigation (Content smoothly scrolls underneath) */}
        {!isNavHidden && (
          <div className="absolute bottom-0 left-0 right-0 z-30 select-none pointer-events-none flex flex-col justify-end">
            <div className="w-full pointer-events-auto">
              <BottomNavigation />
            </div>
          </div>
        )}
      </div>

      {/* Modals & Overlays */}
      <FullScreenPlayer />
      <YouTubeModal />
      <BandDetailModal band={selectedBand} onClose={() => setSelectedBand(null)} />
    </DesktopMobileFrame>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AudioProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AudioProvider>
    </AppProvider>
  );
};

export default App;
