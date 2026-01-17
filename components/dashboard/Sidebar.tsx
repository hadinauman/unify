'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Search,
  Network,
  FileText,
  Users,
  BarChart3,
  Settings,
  Link2,
} from 'lucide-react';

const navigation = [
  { name: 'Timeline', href: '/dashboard', icon: Calendar },
  { name: 'Search', href: '/dashboard/search', icon: Search },
  { name: 'Knowledge Graph', href: '/dashboard/graph', icon: Network },
  { name: 'Briefings', href: '/dashboard/briefings', icon: FileText },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
  { name: 'Insights', href: '/dashboard/insights', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-slate-100 dark:bg-slate-800'
                )}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/connect">
            <Link2 className="mr-2 h-4 w-4" />
            Connect Sources
          </Link>
        </Button>
      </div>
    </aside>
  );
}
