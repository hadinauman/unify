// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   Mail,
//   Calendar,
//   FileText,
//   MessageSquare,
//   CheckCircle2,
//   Upload,
//   Loader2,
// } from 'lucide-react';
// import type { DataSource } from '@/types';

// export default function ConnectPage() {
//   const [dataSources, setDataSources] = useState<DataSource[]>([
//     { id: '1', platform: 'google', connected: false },
//     { id: '2', platform: 'microsoft', connected: false },
//     { id: '3', platform: 'slack', connected: false },
//   ]);

//   const handleConnect = async (platform: string) => {
//     // TODO: Call API to initiate OAuth flow
//     console.log(`Connecting to ${platform}`);
//   };

//   const platformConfig: Record<string, {
//     name: string;
//     icon: any;
//     description: string;
//     color: string;
//     bgColor: string;
//   }> = {
//     google: {
//       name: 'Google Workspace',
//       icon: Mail,
//       description: 'Gmail, Calendar, Drive • Extract events, emails, documents',
//       color: 'text-red-600',
//       bgColor: 'bg-red-50 dark:bg-red-950',
//     },
//     microsoft: {
//       name: 'Microsoft 365',
//       icon: Calendar,
//       description: 'Outlook, OneDrive, Calendar • Extract emails, files, events',
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50 dark:bg-blue-950',
//     },
//     slack: {
//       name: 'Slack',
//       icon: MessageSquare,
//       description: 'Channels, threads, files • Extract discussions and decisions',
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50 dark:bg-purple-950',
//     },
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="space-y-2">
//           <h1 className="text-4xl font-semibold">Connect Your Data Sources</h1>
//           <p className="text-lg text-slate-600 dark:text-slate-400">
//             Unify analyses your organisation's historical communications to extract
//             institutional knowledge. All connections are read-only and secure.
//           </p>
//         </div>

//         {/* Connection Cards Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {dataSources.map((source) => {
//             const config = platformConfig[source.platform];
//             if (!config) return null;
//             const Icon = config.icon;

//             return (
//               <Card key={source.id} className="relative">
//                 <CardHeader>
//                   <div
//                     className={`h-16 w-16 rounded-lg ${config.bgColor} flex items-center justify-center mb-4`}
//                   >
//                     <Icon className={`h-8 w-8 ${config.color}`} />
//                   </div>
//                   <CardTitle>{config.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <p className="text-sm text-slate-600 dark:text-slate-400">
//                     {config.description}
//                   </p>

//                   {source.connected ? (
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
//                         <CheckCircle2 className="h-5 w-5" />
//                         <span className="font-medium">Connected</span>
//                       </div>
//                       {source.lastSyncAt && (
//                         <p className="text-xs text-slate-500">
//                           Last synced: {new Date(source.lastSyncAt).toLocaleDateString()}
//                         </p>
//                       )}
//                       {source.syncStatus === 'syncing' && (
//                         <div className="flex items-center gap-2 text-cyan-600">
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                           <span className="text-sm">
//                             Syncing... {source.syncProgress?.current || 0}/
//                             {source.syncProgress?.total || 0}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <Button
//                       onClick={() => handleConnect(source.platform)}
//                       className="w-full"
//                     >
//                       Connect
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             );
//           })}

//           {/* WhatsApp Upload Card */}
//           <Card>
//             <CardHeader>
//               <div className="h-16 w-16 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center mb-4">
//                 <Upload className="h-8 w-8 text-green-600 dark:text-green-400" />
//               </div>
//               <CardTitle>WhatsApp</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <p className="text-sm text-slate-600 dark:text-slate-400">
//                 Upload chat exports (.txt or .zip)
//               </p>
//               <Button variant="outline" className="w-full">
//                 <Upload className="mr-2 h-4 w-4" />
//                 Upload Chats
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Bottom Actions */}
//         <div className="flex justify-between items-center pt-8">
//           <p className="text-sm text-slate-600 dark:text-slate-400">
//             You can connect sources later from Settings
//           </p>
//           <Button asChild size="lg">
//             <Link href="/dashboard">Continue to Dashboard</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle2,
  Upload,
  Loader2,
} from 'lucide-react';
import type { DataSource } from '@/types';

export default function ConnectPage() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    { id: '1', platform: 'google', connected: false },
    { id: '2', platform: 'microsoft', connected: false },
    { id: '3', platform: 'slack', connected: false },
  ]);

  const [isSlackDialogOpen, setIsSlackDialogOpen] = useState(false);
  const [slackApiKey, setSlackApiKey] = useState('');

  const handleConnect = async (platform: string) => {
    if (platform === 'slack') {
      setIsSlackDialogOpen(true);
    } else {
      // TODO: Call API to initiate OAuth flow for other platforms
      console.log(`Connecting to ${platform}`);
    }
  };

  const handleSlackConnect = () => {
    // TODO: Call API with the Slack API key
    console.log('Connecting to Slack with API key:', slackApiKey);
    setIsSlackDialogOpen(false);
    setSlackApiKey('');
  };

  const platformConfig: Record<string, {
    name: string;
    icon: any;
    description: string;
    color: string;
    bgColor: string;
  }> = {
    google: {
      name: 'Google Workspace',
      icon: Mail,
      description: 'Gmail, Calendar, Drive • Extract events, emails, documents',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
    microsoft: {
      name: 'Microsoft 365',
      icon: Calendar,
      description: 'Outlook, OneDrive, Calendar • Extract emails, files, events',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    slack: {
      name: 'Slack',
      icon: MessageSquare,
      description: 'Channels, threads, files • Extract discussions and decisions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">Connect Your Data Sources</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Unify analyses your organisation's historical communications to extract
            institutional knowledge. All connections are read-only and secure.
          </p>
        </div>

        {/* Connection Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((source) => {
            const config = platformConfig[source.platform];
            if (!config) return null;
            const Icon = config.icon;

            return (
              <Card key={source.id} className="relative">
                <CardHeader>
                  <div
                    className={`h-16 w-16 rounded-lg ${config.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`h-8 w-8 ${config.color}`} />
                  </div>
                  <CardTitle>{config.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {config.description}
                  </p>

                  {source.connected ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Connected</span>
                      </div>
                      {source.lastSyncAt && (
                        <p className="text-xs text-slate-500">
                          Last synced: {new Date(source.lastSyncAt).toLocaleDateString()}
                        </p>
                      )}
                      {source.syncStatus === 'syncing' && (
                        <div className="flex items-center gap-2 text-cyan-600">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">
                            Syncing... {source.syncProgress?.current || 0}/
                            {source.syncProgress?.total || 0}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleConnect(source.platform)}
                      className="w-full"
                    >
                      Connect
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* WhatsApp Upload Card */}
          <Card>
            <CardHeader>
              <div className="h-16 w-16 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Upload chat exports (.txt or .zip)
              </p>
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Chats
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center pt-8">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You can connect sources later from Settings
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">Continue to Dashboard</Link>
          </Button>
        </div>
      </div>

      {/* Slack API Key Dialog */}
      <Dialog open={isSlackDialogOpen} onOpenChange={setIsSlackDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to Slack</DialogTitle>
            <DialogDescription>
              Enter your Slack App API Key to connect your workspace. You can find more info on how to create a Slack App and create your own API key at{' '}
              <a 
                href="https://docs.slack.dev/quickstart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
              >
                https://docs.slack.dev/quickstart
              </a>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">Slack App API Key</Label>
              <Input
                id="api-key"
                placeholder="Enter your Slack App API Key"
                type="password"
                value={slackApiKey}
                onChange={(e) => setSlackApiKey(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsSlackDialogOpen(false);
                setSlackApiKey('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSlackConnect} disabled={!slackApiKey}>
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}