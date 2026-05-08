'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Shield, Mail, Lock } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserRole } = useAppStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    if (email.includes('admin')) {
      setUserRole('admin');
      router.push('/admin');
    } else {
      setUserRole('user');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome to SafeCity</CardTitle>
          <CardDescription>Enter your credentials to access the intelligence platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 font-semibold">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button variant="ghost" className="text-xs text-slate-500 hover:text-indigo-600">
            Forgot password?
          </Button>
          <div className="text-center text-xs text-slate-400">
            Hackathon Demo: Use 'admin' in email for dashboard access
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
