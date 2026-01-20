'use client';

import { useOrganisation } from '@/lib/contexts/OrganisationContext';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Bell, Settings } from 'lucide-react';

export function DashboardHeader() {
  const { currentOrganisation, loadingOrganisations } = useOrganisation();

  const orgName = currentOrganisation?.name || 'Loading...';
  const academicYear = currentOrganisation?.metadata?.academicYear || new Date().getFullYear().toString();

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Org Name */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-700 to-cyan-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">U</span>
          </div>
          <div>
            <h1 className="font-semibold text-lg">{orgName}</h1>
            <p className="text-xs text-slate-500">{academicYear}</p>
          </div>
        </div>

        {/* Right: Actions + User */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
