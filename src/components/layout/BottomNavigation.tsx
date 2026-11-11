import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Music2, Users2, CalendarCheck, User2 } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Discover', icon: Compass },
    { to: '/music', label: 'Music', icon: Music2 },
    { to: '/roster', label: 'Bands', icon: Users2 },
    { to: '/book', label: 'Book Now', icon: CalendarCheck, isAccent: true },
    { to: '/profile', label: 'Profile', icon: User2 },
  ];

  return (
    <nav className="sticky bottom-3 z-30 w-full px-3 pointer-events-none select-none shrink-0 min-w-0">
      <div className="pointer-events-auto max-w-[380px] mx-auto rounded-2xl sm:rounded-full bg-card/90 backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_25px_var(--primary-glow)] px-1.5 py-1.5 flex items-center justify-between min-w-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl sm:rounded-full transition-all duration-200 relative min-w-0 ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-xl sm:rounded-full transition-all shrink-0 ${
                      item.isAccent && !isActive
                        ? 'bg-primary/10 text-primary'
                        : item.isAccent && isActive
                        ? 'bg-primary text-primary-foreground shadow-[0_0_15px_var(--primary-glow)]'
                        : isActive
                        ? 'bg-secondary text-primary'
                        : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 transition-transform active:scale-90" />
                  </div>
                  <span
                    className={`text-[10px] mt-0.5 font-medium truncate max-w-full text-center transition-all ${
                      isActive ? 'font-bold text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator glow dot */}
                  {isActive && (
                    <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
