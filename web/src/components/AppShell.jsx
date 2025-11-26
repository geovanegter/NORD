import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar.jsx';
import BottomNav from './BottomNav.jsx';

export default function AppShell() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('nord-theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
    window.localStorage.setItem('nord-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <div className="flex w-full flex-col">
        <main className={`flex-1 px-4 py-6 transition-colors md:px-10 md:py-10 ${isDarkMode ? 'bg-slate-900/20' : ''}`}>
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
