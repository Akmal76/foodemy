'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import { kantinData, getTenantsByKantinId } from '@/lib/data';

export default function DaftarKantinPage() {
  const router = useRouter();
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');

  const faculties = ['all', ...new Set(kantinData.map((k) => k.faculty))];
  const filteredKantins =
    selectedFaculty === 'all'
      ? kantinData
      : kantinData.filter((k) => k.faculty === selectedFaculty);

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-navy mb-2">Daftar Kios per Kantin</h1>
        <p className="text-gray-600">Fokus detail tersedia untuk Vokasi; kantin lain memakai placeholder umum dulu.</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="font-medium text-navy">Filter Fakultas:</label>
        <select
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-white"
        >
          <option value="all">Semua Fakultas</option>
          {faculties.slice(1).map((faculty) => (
            <option key={faculty} value={faculty}>
              {faculty}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {filteredKantins.map((kantin) => {
          const tenants = getTenantsByKantinId(kantin.id);
          return (
            <section key={kantin.id} className="bg-white rounded-xl shadow-sm p-5">
              <button
                type="button"
                onClick={() => router.push(`/kantin/${kantin.id}`)}
                className="flex flex-col gap-2 mb-4 md:flex-row md:items-center md:justify-between w-full text-left hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div>
                  <h2 className="text-2xl font-bold text-navy">{kantin.name}</h2>
                  <p className="text-gray-600 text-sm">{kantin.location} · {kantin.faculty}</p>
                </div>
                <span className="inline-block px-4 py-2 bg-gray-100 text-navy font-semibold rounded-lg">
                  Info ringkas
                </span>
              </button>

              {tenants.length === 0 && (
                <p className="text-gray-500">Belum ada tenant terdaftar.</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tenants.map((tenant) => (
                  <div key={tenant.id} className="rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-36 bg-gray-100">
                      <Image
                        src={tenant.image}
                        alt={tenant.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-navy">{tenant.name}</h3>
                      <p className="text-sm text-gray-600">{tenant.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {filteredKantins.length === 0 && (
        <div className="text-center py-12 text-gray-500">Tidak ada kantin untuk filter ini.</div>
      )}
    </AppShell>
  );
}
