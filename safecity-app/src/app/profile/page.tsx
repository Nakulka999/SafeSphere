'use client';

import ProfileView from '../../components/ProfileView';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="p-4 flex items-center gap-4 bg-white border-b border-slate-200">
        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <h1 className="text-lg font-bold">User Profile</h1>
      </header>
      <main className="py-6">
        <ProfileView />
      </main>
    </div>
  );
}
