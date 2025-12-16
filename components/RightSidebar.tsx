'use client';

import Image from 'next/image';
import { recommendedFoods } from '@/lib/data';

type RightSidebarProps = {
  className?: string;
};

export default function RightSidebar({ className }: RightSidebarProps) {
  return (
    <aside
      className={`fixed right-0 top-0 z-20 flex h-screen w-80 flex-col overflow-y-auto border-l border-gray-200 bg-white transition-transform duration-300 ease-in-out ${className ?? ''}`}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center overflow-hidden">
            <span className="text-4xl">👤</span>
          </div>
          <h2 className="text-lg font-bold text-navy">GUEST</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-navy">Recommended Food</h3>
        </div>

        <div className="space-y-4">
          {recommendedFoods.filter((food) => food.image).map((food) => (
            <div
              key={food.menuId}
              className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                {food.image && (
                  <Image
                    src={food.image}
                    alt={food.menuName}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-navy text-sm truncate">
                  {food.menuName}
                </h4>
                <p className="text-xs text-gray-500 truncate">{food.kantinName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
