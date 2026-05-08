'use client';

import { useState } from 'react';
import { useAppStore, UserProfile } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Shield, User, Heart, Bell } from 'lucide-react';

export default function ProfileView() {
  const { user, setUser } = useAppStore();
  const [activeTab, setActiveTab] = useState<'info' | 'contacts' | 'prefs'>('info');

  const updatePreference = (key: keyof UserProfile['safetyPreferences'], val: boolean) => {
    if (!user) return;
    setUser({
      ...user,
      safetyPreferences: { ...user.safetyPreferences, [key]: val }
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-slate-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-slate-500 text-sm">Member since May 2026</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {['info', 'contacts', 'prefs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Medical Details
            </CardTitle>
            <CardDescription>Vital information for emergency responders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-400">Blood Type</label>
              <Input defaultValue="O+ Positive" className="bg-slate-50 border-slate-200" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-400">Allergies</label>
              <Input defaultValue="Peanuts, Penicillin" className="bg-slate-50 border-slate-200" />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'prefs' && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-500" />
              Safety Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">Auto SOS (Fall Detection)</p>
                <p className="text-xs text-slate-500">Automatically trigger SOS if a violent fall is detected</p>
              </div>
              <Switch
                checked={user.safetyPreferences.autoSOS}
                onCheckedChange={(val) => updatePreference('autoSOS', val)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">Live Traccar Stream</p>
                <p className="text-xs text-slate-500">Share encrypted location stream during active SOS</p>
              </div>
              <Switch
                checked={user.safetyPreferences.streamToTraccar}
                onCheckedChange={(val) => updatePreference('streamToTraccar', val)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Button className="w-full h-12 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-200">
        Save Changes
      </Button>
    </div>
  );
}
