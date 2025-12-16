'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { use } from 'react';
import AppShell from '@/components/AppShell';
import { getKantinById } from '@/lib/data';

export default function KantinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);
  const kantin = getKantinById(id);
  const [tenantImageIndices, setTenantImageIndices] = useState<Record<string, number>>({});
  const [menuImageIndices, setMenuImageIndices] = useState<Record<string, number>>({});
  const [activeTenantModal, setActiveTenantModal] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!kantin) {
    notFound();
  }

  const handleTenantImagePrev = (tenantId: string, maxIndex: number) => {
    setTenantImageIndices(prev => ({
      ...prev,
      [tenantId]: (prev[tenantId] || 0) === 0 ? maxIndex : (prev[tenantId] || 0) - 1
    }));
  };

  const handleTenantImageNext = (tenantId: string, maxIndex: number) => {
    setTenantImageIndices(prev => ({
      ...prev,
      [tenantId]: ((prev[tenantId] || 0) + 1) > maxIndex ? 0 : (prev[tenantId] || 0) + 1
    }));
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

  const handleCloseModal = () => {
    setActiveTenantModal(null);
    setCurrentSlideIndex(0);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    if (activeTenantModal) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [activeTenantModal]);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-2xl overflow-hidden bg-white shadow">
          <div className="relative h-56">
            <Image
              src={kantin.image}
              alt={kantin.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-navy">{kantin.name}</h1>
            <p className="mt-2 text-gray-600">{kantin.description}</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{kantin.location}</span>
              <span className="mx-1">•</span>
              <span>{kantin.faculty}</span>
            </div>
            
            {/* Google Maps */}
            {kantin.mapUrl && (
              <div className="mt-4">
                <iframe
                  src={kantin.mapUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Peta lokasi ${kantin.name}`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Tenants */}
        <section>
          <h2 className="text-xl font-semibold text-navy mb-4">Kantin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kantin.tenants.map((tenant) => {
              const categories = Array.from(
                new Set(tenant.menus.map((m) => m.category))
              );
              const displayImages = tenant.displayImages || [tenant.image];
              const currentImageIndex = tenantImageIndices[tenant.id] || 0;
              
              return (
                <button
                  key={tenant.id}
                  onClick={() => {
                    setActiveTenantModal(tenant.id);
                    setCurrentSlideIndex(0);
                  }}
                  className="text-left w-full"
                >
                  <div className="rounded-xl bg-white shadow p-4 cursor-pointer hover:shadow-lg transition-shadow h-full">
                    <div className="flex items-center gap-4">
                      {/* Tenant Display Images */}
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 group">
                      <Image
                        src={displayImages[currentImageIndex]}
                        alt={tenant.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      {displayImages.length > 1 && (
                        <>
                          <button
                            onClick={() => handleTenantImagePrev(tenant.id, displayImages.length - 1)}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleTenantImageNext(tenant.id, displayImages.length - 1)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-0.5 rounded">
                            {currentImageIndex + 1}/{displayImages.length}
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-navy font-semibold text-lg">{tenant.name}</h3>
                      <p className="text-gray-600 text-sm">{tenant.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {categories.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    </div>

                    {/* Menus preview */}
                    {tenant.menus.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {tenant.menus.map((menu) => {
                          const menuImages = menu.images || (menu.image ? [menu.image] : []);
                          const menuCurrentIndex = menuImageIndices[menu.id] || 0;
                          
                          return (
                            <div key={menu.id} className="border-t pt-3">
                              <p className="text-sm font-medium text-navy mb-2">{menu.name}</p>
                              {menuImages.length > 0 && (
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                  {menuImages.map((img, idx) => (
                                    <div key={idx} className="min-w-[120px] relative group">
                                      <div className="relative h-24 w-24 rounded-md overflow-hidden bg-gray-100">
                                        <Image
                                          src={img}
                                          alt={`${menu.name} ${idx + 1}`}
                                          fill
                                          sizes="120px"
                                          className="object-cover"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <p className="text-xs text-gray-500">{menu.category}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Tenant Modal */}
        {activeTenantModal && (() => {
          const tenant = kantin.tenants.find(t => t.id === activeTenantModal);
          if (!tenant) return null;

          // Combine all images: displayImages first, then menu images
          const displayImages = tenant.displayImages || [tenant.image];
          const menuImages: string[] = [];
          tenant.menus.forEach(menu => {
            const images = menu.images || (menu.image ? [menu.image] : []);
            menuImages.push(...images);
          });
          const allImages = [...displayImages, ...menuImages];
          const maxSlideIndex = allImages.length - 1;

          const handleSlidePrev = () => {
            setCurrentSlideIndex(prev => (prev === 0 ? maxSlideIndex : prev - 1));
          };

          const handleSlideNext = () => {
            setCurrentSlideIndex(prev => (prev === maxSlideIndex ? 0 : prev + 1));
          };

          return (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <div 
                className="relative w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
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

                  <div 
                    className="w-full h-full flex items-center justify-center overflow-auto"
                    style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
                  >
                    {allImages[currentSlideIndex] && (
                      <Image
                        src={allImages[currentSlideIndex]}
                        alt={`${tenant.name} - ${currentSlideIndex + 1}`}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={handleSlidePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all"
                      >
                        <ChevronLeft className="w-8 h-8 text-navy" />
                      </button>
                      <button
                        onClick={handleSlideNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all"
                      >
                        <ChevronRight className="w-8 h-8 text-navy" />
                      </button>
                    </>
                  )}

                  {/* Counter & Label */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {currentSlideIndex + 1} / {allImages.length}
                    </div>
                    <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                      {currentSlideIndex < displayImages.length ? 'Tampak Depan' : 'Menu'}
                    </div>
                  </div>
                </div>

                {/* Tenant Info */}
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">{tenant.name}</h3>
                  <p className="text-gray-300">{tenant.description}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </AppShell>
  );
}
