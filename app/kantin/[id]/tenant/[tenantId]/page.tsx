'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { use } from 'react';
import AppShell from '@/components/AppShell';
import { getKantinById } from '@/lib/data';

export default function TenantDetailPage({
  params,
}: {
  params: Promise<{ id: string; tenantId: string }>
}) {
  const { id, tenantId } = use(params);
  const router = useRouter();
  const kantin = getKantinById(id);
  const [displayImageIndex, setDisplayImageIndex] = useState(0);
  const [menuImageIndices, setMenuImageIndices] = useState<Record<string, number>>({});
  const [activeMenuModal, setActiveMenuModal] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!kantin) {
    notFound();
  }

  const tenant = kantin.tenants.find(t => t.id === tenantId);

  if (!tenant) {
    notFound();
  }

  const displayImages = tenant.displayImages || [tenant.image];
  const maxDisplayIndex = displayImages.length - 1;

  const handleDisplayImagePrev = () => {
    setDisplayImageIndex(prev => (prev === 0 ? maxDisplayIndex : prev - 1));
  };

  const handleDisplayImageNext = () => {
    setDisplayImageIndex(prev => ((prev + 1) > maxDisplayIndex ? 0 : prev + 1));
  };

  const handleMenuImagePrev = (menuId: string, maxIndex: number) => {
    setMenuImageIndices(prev => ({
      ...prev,
      [menuId]: (prev[menuId] || 0) === 0 ? maxIndex : (prev[menuId] || 0) - 1
    }));
  };

  const handleMenuImageNext = (menuId: string, maxIndex: number) => {
    setMenuImageIndices(prev => ({
      ...prev,
      [menuId]: ((prev[menuId] || 0) + 1) > maxIndex ? 0 : (prev[menuId] || 0) + 1
    }));
  };

  // Close modal on ESC key and reset zoom
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenuModal(null);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleCloseModal = () => {
    setActiveMenuModal(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-navy hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>

        {/* Tenant Name */}
        <h1 className="text-3xl font-bold text-navy mb-2">{tenant.name}</h1>
        <p className="text-gray-600 mb-6">{tenant.description}</p>

        {/* Menu Buttons */}
        {tenant.menus && tenant.menus.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-navy mb-3">Menu</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {tenant.menus.map(menu => (
                <button
                  key={menu.id}
                  onClick={() => setActiveMenuModal(menu.id)}
                  className="bg-navy text-white py-3 px-4 rounded-lg hover:bg-navy/90 transition-colors text-left"
                >
                  <div className="font-semibold truncate">{menu.name}</div>
                  <div className="text-xs text-gray-300 truncate">{menu.category}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Display Images Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-navy mb-4">Tampak Depan</h2>
          <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden group">
            {displayImages[displayImageIndex] && (
              <Image
                src={displayImages[displayImageIndex]}
                alt={`${tenant.name} - ${displayImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            )}

            {/* Navigation Buttons */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handleDisplayImagePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-navy" />
                </button>
                <button
                  onClick={handleDisplayImageNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <ChevronRight className="w-6 h-6 text-navy" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {displayImageIndex + 1} / {displayImages.length}
            </div>
          </div>
        </div>



        {/* Menu Modal Overlay */}
        {activeMenuModal && (() => {
          const menu = tenant.menus?.find(m => m.id === activeMenuModal);
          if (!menu) return null;
          
          const menuImages = menu.images || [menu.image];
          const currentImageIndex = menuImageIndices[menu.id] || 0;
          const maxMenuImageIndex = menuImages.length - 1;

          return (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <div 
                className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white p-2 rounded-full transition-colors shadow-lg"
                >
                  <X className="w-6 h-6 text-navy" />
                </button>

                {/* Zoom Controls */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                    className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ZoomIn className="w-6 h-6 text-navy" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.5}
                    className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ZoomOut className="w-6 h-6 text-navy" />
                  </button>
                  <div className="bg-white/90 px-3 py-2 rounded-full text-sm font-medium text-navy shadow-lg">
                    {Math.round(zoomLevel * 100)}%
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative aspect-square bg-gray-200 group overflow-auto">
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
                  >
                    {menuImages[currentImageIndex] && (
                      <Image
                        src={menuImages[currentImageIndex]}
                        alt={menu.name}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Navigation */}
                  {menuImages.length > 1 && (
                    <>
                      <button
                        onClick={() => handleMenuImagePrev(menu.id, maxMenuImageIndex)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all"
                      >
                        <ChevronLeft className="w-8 h-8 text-navy" />
                      </button>
                      <button
                        onClick={() => handleMenuImageNext(menu.id, maxMenuImageIndex)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all"
                      >
                        <ChevronRight className="w-8 h-8 text-navy" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {currentImageIndex + 1} / {menuImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Menu Info */}
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-navy mb-2">{menu.name}</h3>
                  <p className="text-gray-600">{menu.category}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </AppShell>
  );
}
