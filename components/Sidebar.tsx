'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Beranda', href: '/', icon: 'home' as const },
    { name: 'Daftar Kantin', href: '/daftar-kantin', icon: 'location_on' as const },
    { name: 'Pengaturan', href: '/pengaturan', icon: 'settings' as const },
    { name: 'Profil', href: '/profil', icon: 'person' as const },
  ];

  const Icon = ({ name, className }: { name: 'home' | 'location_on' | 'settings' | 'person'; className?: string }) => {
    switch (name) {
      case 'home':
        return (
          <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        );
      case 'location_on':
        return (
          <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.027 7.027 0 0 0-1.63-.95l-.36-2.54A.5.5 0 0 0 12.75 2h-3.5a.5.5 0 0 0-.49.41l-.36 2.54c-.59.23-1.14.54-1.63.95l-2.39-.96a.5.5 0 0 0-.6.22L1.86 8.05a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.44.34.7.22l2.39-.96c.49.41 1.04.73 1.63.95l.36 2.54c.06.29.31.5.6.5h3.5c.29 0 .55-.21.6-.5l.36-2.54c.59-.23 1.14-.54 1.63-.95l2.39.96c.26.12.56.02.7-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
          </svg>
        );
      case 'person':
        return (
          <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.31 0-10 1.66-10 5v3h20v-3c0-3.34-6.69-5-10-5z" />
          </svg>
        );
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-navy text-white transition-transform duration-300 ease-in-out ${className ?? ''}`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
            <Image
              src="/images/logo.jpeg"
              alt="Foodemy UI Logo"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-white">Foodemy UI</h1>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-navy'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <Icon name={item.icon} className="h-6 w-6" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
