'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [showRight, setShowRight] = useState<boolean>(false); // Start with false
  const [mounted, setMounted] = useState(false);
  const [showLeftMobile, setShowLeftMobile] = useState(false);

  // Detect viewport and initialize right sidebar state
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.matchMedia('(min-width: 1024px)').matches;
      setIsDesktop(desktop);
    };
    checkDesktop();
    
    // Load saved state from localStorage first
    const saved = localStorage.getItem('rightSidebarOpen');
    if (saved !== null) {
      setShowRight(saved === 'true');
    } else {
      // Default: show on desktop, hide on mobile
      const isDesktopMatch = window.matchMedia('(min-width: 1024px)').matches;
      setShowRight(isDesktopMatch);
    }
    setMounted(true);
    
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Sync state to localStorage whenever it changes

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rightSidebarOpen', String(showRight));
    }
  }, [showRight]);

  // On route change, close mobile left sidebar overlay only.
  useEffect(() => {
    setShowLeftMobile(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        className={`lg:hidden ${showLeftMobile ? 'translate-x-0' : '-translate-x-full pointer-events-none'}`}
      />

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main
        className={`flex-1 p-4 pt-20 md:p-6 md:pt-6 lg:p-8 lg:ml-64 ${mounted && showRight ? 'lg:mr-80' : ''}`}
      >
        {children}
      </main>

      <RightSidebar
        className={mounted && showRight ? 'translate-x-0' : 'translate-x-full pointer-events-none'}
      />
      {/* Mobile backdrop when left sidebar is open */}
      {showLeftMobile && (
        <button
          aria-label="Tutup sidebar kiri"
          onClick={() => setShowLeftMobile(false)}
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
        />
      )}

      {/* Mobile left toggle (logo) */}
      <button
        type="button"
        aria-label={showLeftMobile ? 'Sembunyikan sidebar kiri' : 'Tampilkan sidebar kiri'}
        onClick={() => setShowLeftMobile((v) => !v)}
        className="fixed left-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full overflow-hidden bg-white shadow-lg lg:hidden"
      >
        <img src="/images/logo.jpeg" alt="Foodemy UI" className="h-full w-full object-cover" />
      </button>

      {/* Right toggle icon (burger/arrow) */}
      <button
        type="button"
        aria-label={mounted && showRight ? 'Sembunyikan sidebar kanan' : 'Tampilkan sidebar kanan'}
        onClick={() => setShowRight((v) => !v)}
        className="fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-navy shadow-lg hover:bg-gray-100"
      >
        {mounted && showRight ? (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
            <line x1="4" x2="15" y1="12" y2="12" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
            <line x1="20" x2="9" y1="12" y2="12" />
          </svg>
        )}
      </button>
    </div>
  );
}
