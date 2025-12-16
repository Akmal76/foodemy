'use client';

import Image from 'next/image';
import { Kantin } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface KantinCardProps {
  kantin: Kantin;
}

export default function KantinCard({ kantin }: KantinCardProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(`/kantin/${kantin.id}`)}
      className="bg-navy rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-navy/50"
      aria-label={`Lihat daftar kantin`}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={kantin.image}
          alt={kantin.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="eager"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1">
          {kantin.name}
        </h3>
        <p className="text-gray-300 text-sm">Lihat detail</p>
      </div>
    </button>
  );
}
