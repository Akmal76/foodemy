import AppShell from '@/components/AppShell';

export default function ProfilPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Profil</h1>
        <p className="text-gray-600">Tamu Foodemy</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
          <span className="text-6xl">👤</span>
        </div>
        <h2 className="text-2xl font-bold text-navy mb-1">Guest User</h2>
        <p className="text-gray-600">Guest User</p>
      </div>
    </AppShell>
  );
}
