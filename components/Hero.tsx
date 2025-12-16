'use client';

import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden rounded-2xl bg-navy text-white shadow mb-8">
      <div className="relative p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold">Temukan Kantin dan Menunya!</h1>
        <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-100">
          Jelajahi makanan dan minuman dari 14 kantin.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/daftar-kantin')}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-navy shadow hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
            Lihat Daftar Kantin
          </button>
        </div>
      </div>
    </section>
  );
}
