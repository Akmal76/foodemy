import vokasi from '@/app/daftar-kantin/data/vokasi.json';
import ft from '@/app/daftar-kantin/data/ft.json';
import fmipa from '@/app/daftar-kantin/data/fmipa.json';
import fisip from '@/app/daftar-kantin/data/fisip.json';
import feb from '@/app/daftar-kantin/data/feb.json';
import psikologi from '@/app/daftar-kantin/data/psikologi.json';
import fh from '@/app/daftar-kantin/data/fh.json';
import fia from '@/app/daftar-kantin/data/fia.json';
import rik from '@/app/daftar-kantin/data/rik.json';
import perpusat from '@/app/daftar-kantin/data/perpusat.json';
import rsui from '@/app/daftar-kantin/data/rsui.json';
import fasilkom from '@/app/daftar-kantin/data/fasilkom.json';
import fkm from '@/app/daftar-kantin/data/fkm.json';
import fik from '@/app/daftar-kantin/data/fik.json';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Makanan' | 'Minuman' | 'Snack' | 'Sweets' | 'Savoury';
  image?: string;
  images?: string[];
}

export interface Tenant {
  id: string;
  name: string;
  description: string;
  image: string;
  displayImages?: string[];
  menus: MenuItem[];
}

export interface Kantin {
  id: string;
  name: string;
  location: string;
  faculty: string;
  image: string;
  description: string;
  mapUrl?: string;
  tenants: Tenant[];
}

export const kantinData: Kantin[] = [
  vokasi as Kantin,
  ft as Kantin,
  fmipa as Kantin,
  fisip as Kantin,
  feb as Kantin,
  psikologi as Kantin,
  fh as Kantin,
  fia as Kantin,
  rik as Kantin,
  perpusat as Kantin,
  rsui as Kantin,
  fasilkom as Kantin,
  fkm as Kantin,
  fik as Kantin,
];

export const recommendedFoods = kantinData
  .flatMap((kantin) =>
    kantin.tenants.flatMap((tenant) =>
      tenant.menus.map((menu) => ({
        menuId: menu.id,
        menuName: menu.name,
        kantinName: kantin.name,
        kantinId: kantin.id,
        image: menu.image,
      }))
    )
  )
  .slice(0, 4);

export function getKantinById(id: string): Kantin | undefined {
  return kantinData.find((kantin) => kantin.id === id);
}

export function getTenantsByKantinId(kantinId: string): Tenant[] {
  const kantin = getKantinById(kantinId);
  return kantin ? kantin.tenants : [];
}

export function getMenusByKantinId(kantinId: string): MenuItem[] {
  return getTenantsByKantinId(kantinId).flatMap((tenant) => tenant.menus);
}

export function getMenusByCategory(
  kantinId: string,
  category: MenuItem['category'],
): MenuItem[] {
  return getMenusByKantinId(kantinId).filter((menu) => menu.category === category);
}
