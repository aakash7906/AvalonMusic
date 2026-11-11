import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, CalendarCheck, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/music', label: 'Search', icon: Search },
    { to: '/roster', label: 'Your Library', icon: Library },
    { to: '/book', label: 'Book Live', icon: CalendarCheck },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="w-full bg-gradient-to-t from-black/60 via-black/35 to-black/15 backdrop-blur-xl border-t border-white/[0.08] select-none shrink-0 min-w-0 px-2 pt-2 pb-2.5 sm:pb-3.5 transition-all"
    >
      <div className="w-full max-w-lg mx-auto flex items-center justify-between min-w-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-1 transition-all duration-150 relative min-w-0 active:scale-95 group ${isActive
                  ? 'text-white'
                  : 'text-[#b3b3b3] hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-all ${isActive
                      ? 'text-white stroke-[2.4px] scale-105'
                      : 'text-[#b3b3b3] group-hover:text-white stroke-[1.8px]'
                      }`}
                  />
                  <span
                    className={`text-[10px] sm:text-[11px] mt-1 tracking-tight truncate max-w-full text-center transition-all ${isActive
                      ? 'font-bold text-white'
                      : 'font-medium text-[#b3b3b3] group-hover:text-white'
                      }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
