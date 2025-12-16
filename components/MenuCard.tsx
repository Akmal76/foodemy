import Image from 'next/image';
import { MenuItem } from '@/lib/data';

interface MenuCardProps {
  menu: MenuItem;
}

export default function MenuCard({ menu }: MenuCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={menu.image}
          alt={menu.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="text-navy font-semibold text-lg mb-1">{menu.name}</h4>
        <span className="inline-block px-3 py-1 bg-primary text-navy text-sm rounded-full">
          {menu.category}
        </span>
      </div>
    </div>
  );
}
