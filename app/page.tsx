'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import SearchBar from '@/components/SearchBar';
import KantinCard from '@/components/KantinCard';
import { kantinData } from '@/lib/data';
import Hero from '@/components/Hero';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredKantins = kantinData.filter((kantin) =>
    kantin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell>
      <Hero />
      <div className="mb-6 flex justify-center">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKantins.map((kantin) => (
          <KantinCard key={kantin.id} kantin={kantin} />
        ))}
      </div>

      {filteredKantins.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Tidak ada kantin yang ditemukan untuk &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </AppShell>
  );
}

