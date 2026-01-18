'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Search, Bell, Settings } from 'lucide-react';

export function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Org Name */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-700 to-cyan-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">U</span>
          </div>
          <div>
            <h1 className="font-semibold text-lg">TCD MSA</h1>
            <p className="text-xs text-slate-500">2025-2026</p>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <Button
            variant="outline"
            className="w-full justify-start text-slate-500 font-normal"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search anything...
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
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
