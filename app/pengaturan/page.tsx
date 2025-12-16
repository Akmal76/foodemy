'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';

export default function PengaturanPage() {
  const [language, setLanguage] = useState('id');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Pengaturan</h1>
        <p className="text-gray-600">Kelola preferensi aplikasi Anda</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-navy mb-1">Bahasa / Language</h2>
              <p className="text-gray-600 text-sm">Pilih bahasa yang ingin Anda gunakan</p>
            </div>
            <div className="flex gap-2">
              <span className="text-2xl">🇮🇩</span>
              <span className="text-2xl">🇬🇧</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setLanguage('id')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                language === 'id' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🇮🇩 Indonesia
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                language === 'en' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
          {language === 'en' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-primary rounded-lg">
              <p className="text-sm text-navy">
                ⚠️ <strong>Coming Soon!</strong> English language support will be available in the next update.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy mb-1">Mode Tampilan</h2>
              <p className="text-gray-600 text-sm">Pilih tema terang atau gelap</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative h-8 w-16 rounded-full transition-colors ${darkMode ? 'bg-navy' : 'bg-gray-300'}`}
            >
              <span
                className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          {darkMode && (
            <div className="mt-4 p-4 bg-yellow-50 border border-primary rounded-lg">
              <p className="text-sm text-navy">
                ⚠️ <strong>Coming Soon!</strong> Dark mode akan tersedia dalam update mendatang.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Tentang Foodemy UI</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Versi:</strong> 1.0.0
            </p>
            <p>
              <strong>Deskripsi:</strong> Platform informasi kantin kampus untuk memudahkan mahasiswa dan staf menemukan tempat makan.
            </p>
            <p className="mt-4 text-sm text-gray-500">© 2025 Foodemy UI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
