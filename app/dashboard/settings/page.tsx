'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link2, Users, Bell, Shield, Building, Upload, AlertTriangle, Loader2, Check, X } from 'lucide-react';
import { api } from '@/lib/api';

interface SyncStatus {
  status: 'idle' | 'syncing' | 'completed' | 'error';
  progress?: { current: number; total: number; phase: string };
  stats?: { events: number; contacts: number; insights: number };
  lastSyncAt?: string;
}

export default function SettingsPage() {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ status: 'idle' });
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Check Google connection status on load
  useEffect(() => {
    checkGoogleStatus();
    checkSyncStatus();
  }, []);

  const checkGoogleStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/status/google`);
      const data = await response.json();
      setGoogleConnected(data.connected);
    } catch (error) {
      console.error('Failed to check Google status:', error);
    }
  };

  const checkSyncStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sync/status`);
      const data = await response.json();
      setSyncStatus(data);
    } catch (error) {
      console.error('Failed to check sync status:', error);
    }
  };

  const handleConnectGoogle = async () => {
    setIsConnecting(true);
    setConnectionError(null);

    try {
      console.log('Fetching OAuth URL from backend...');
      const response = await api.connectSource('google');
      console.log('Got OAuth URL:', response.authUrl);

      // Open the auth URL in a popup window
      const popup = window.open(
        response.authUrl,
        'google-oauth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        setConnectionError('Pop-up was blocked. Please allow pop-ups for this site and try again.');
        setIsConnecting(false);
        return;
      }

      // Poll for connection status
      const checkConnection = setInterval(async () => {
        try {
          const statusRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/status/google`);
          const status = await statusRes.json();
          console.log('Connection status:', status);
          if (status.connected) {
            setGoogleConnected(true);
            setIsConnecting(false);
            clearInterval(checkConnection);
            // Close popup if still open
            if (popup && !popup.closed) {
              popup.close();
            }
          }
        } catch (err) {
          console.error('Error checking status:', err);
        }
      }, 2000);

      // Stop polling after 2 minutes
      setTimeout(() => {
        clearInterval(checkConnection);
        if (isConnecting) {
          setIsConnecting(false);
          setConnectionError('Connection timed out. Please try again.');
        }
      }, 120000);
    } catch (error) {
      console.error('Failed to connect Google:', error);
      setConnectionError(`Failed to initiate Google connection: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsConnecting(false);
    }
  };

  const handleDisconnectGoogle = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/disconnect/google`, {
        method: 'DELETE',
      });
      setGoogleConnected(false);
    } catch (error) {
      console.error('Failed to disconnect Google:', error);
    }
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncMessage(null);

    try {
      // Trigger the sync
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sync/trigger`, {
        method: 'POST',
      });

      // Poll for sync status
      const pollSync = setInterval(async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sync/status`);
          const status = await response.json();
          setSyncStatus(status);

          if (status.status === 'completed') {
            clearInterval(pollSync);
            setIsSyncing(false);
            setSyncMessage(`Sync complete! Found ${status.stats?.events || 0} events, ${status.stats?.contacts || 0} contacts, and ${status.stats?.insights || 0} insights.`);
          } else if (status.status === 'error') {
            clearInterval(pollSync);
            setIsSyncing(false);
            setSyncMessage('Sync failed. Please try again.');
          }
        } catch (err) {
          console.error('Error polling sync status:', err);
        }
      }, 1000);

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(pollSync);
        if (isSyncing) {
          setIsSyncing(false);
          setSyncMessage('Sync timed out. Check the console for details.');
        }
      }, 300000);
    } catch (error) {
      console.error('Failed to trigger sync:', error);
      setIsSyncing(false);
      setSyncMessage('Failed to start sync. Is the backend running?');
    }
  };
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your organisation and account settings
        </p>
      </div>

      <Tabs defaultValue="organisation" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organisation">Organisation</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        </TabsList>

        {/* Organisation Settings */}
        <TabsContent value="organisation" className="space-y-4">
          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Organisation Logo</CardTitle>
              <CardDescription>Upload your organisation's logo (President only)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Building className="h-10 w-10 text-slate-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    PNG, JPG up to 5MB. Recommended: 500x500px
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organisation Details */}
          <Card>
            <CardHeader>
              <CardTitle>Organisation Details</CardTitle>
              <CardDescription>Update your organisation information (President only)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="orgName">Organisation Name</Label>
                <Input id="orgName" defaultValue="TCD MSA" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="orgType">Organisation Type</Label>
                <Select defaultValue="student-org">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student-org">Student Organisation</SelectItem>
                    <SelectItem value="nonprofit">Nonprofit Chapter</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="orgSubtype">Subtype</Label>
                <Select defaultValue="isoc-msa">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="isoc-msa">ISOC/MSA</SelectItem>
                    <SelectItem value="other">Other Society</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="membersCount">Current Members</Label>
                <Input id="membersCount" type="number" defaultValue="180" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input id="foundedYear" type="number" defaultValue="1997" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input id="academicYear" defaultValue="2025-2026" className="mt-1" readOnly />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Automatically updated during committee handover
                </p>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Sources */}
        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Data Sources</CardTitle>
              <CardDescription>Manage your integrations and sync settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Google Workspace */}
              <div className={`flex items-center justify-between p-4 border rounded-lg ${googleConnected ? 'border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded flex items-center justify-center ${googleConnected ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-50 dark:bg-blue-950'}`}>
                    {googleConnected ? (
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Google Workspace</p>
                    <p className="text-sm text-slate-500">
                      {googleConnected ? 'Connected - Gmail & Drive access enabled' : 'Connect to import emails and documents'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {googleConnected ? (
                    <>
                      <Button variant="outline" size="sm" onClick={handleSyncNow} disabled={isSyncing}>
                        {isSyncing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {syncStatus.progress?.phase || 'Syncing...'}
                          </>
                        ) : (
                          'Sync Now'
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleDisconnectGoogle}>
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleConnectGoogle} disabled={isConnecting}>
                      {isConnecting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Link2 className="mr-2 h-4 w-4" />
                          Connect
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {connectionError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg text-sm text-red-600 dark:text-red-400">
                  {connectionError}
                </div>
              )}

              {/* Sync Progress */}
              {isSyncing && syncStatus.progress && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="font-medium text-blue-900 dark:text-blue-200">
                      Syncing ISOC/MSA Data...
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${syncStatus.progress.current}%` }}
                    />
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {syncStatus.progress.phase}
                  </p>
                </div>
              )}

              {/* Sync Result Message */}
              {syncMessage && !isSyncing && (
                <div className={`p-3 rounded-lg text-sm ${
                  syncMessage.includes('complete')
                    ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 text-green-600 dark:text-green-400'
                    : 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400'
                }`}>
                  {syncMessage}
                </div>
              )}

              {/* Last Sync Info */}
              {syncStatus.lastSyncAt && !isSyncing && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Last synced: {new Date(syncStatus.lastSyncAt).toLocaleString()}
                  {syncStatus.stats && (
                    <span className="ml-2">
                      ({syncStatus.stats.events} events, {syncStatus.stats.contacts} contacts)
                    </span>
                  )}
                </div>
              )}

              {/* Microsoft 365 - Coming Soon */}
              <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#F25022" d="M1 1h10v10H1z"/>
                      <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                      <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                      <path fill="#FFB900" d="M13 13h10v10H13z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Microsoft 365</p>
                    <p className="text-sm text-slate-500">Coming soon - Outlook & OneDrive</p>
                  </div>
                </div>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>

              {/* Slack - Coming Soon */}
              <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
                      <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
                      <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"/>
                      <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Slack</p>
                    <p className="text-sm text-slate-500">Coming soon - Channel messages</p>
                  </div>
                </div>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team */}
        <TabsContent value="team" className="space-y-4">
          {/* Team Handover */}
          <Card className="border-amber-200 dark:border-amber-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Transfer Presidency
              </CardTitle>
              <CardDescription>
                Hand over presidential role to the next committee (President only)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="newPresident">Select New President</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose committee member..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member-1">Sara Ahmed - Treasurer</SelectItem>
                    <SelectItem value="member-2">Yusuf Ibrahim - Events Coordinator</SelectItem>
                    <SelectItem value="member-3">Fatima Hassan - Social Secretary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                  This action will:
                </p>
                <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1 ml-4 list-disc">
                  <li>Transfer presidential access to selected member</li>
                  <li>Move you to "Past President" role (view-only access)</li>
                  <li>Reset all other committee positions to "Pending Assignment"</li>
                  <li>Increment academic year (2025-2026 → 2026-2027)</li>
                  <li>Preserve all institutional knowledge and history</li>
                </ul>
              </div>

              <Button variant="destructive" className="w-full">
                Confirm Presidency Handover
              </Button>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Committee Members</CardTitle>
              <CardDescription>Manage committee members and their roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Email address" />
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Invite
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div>
                    <p className="font-medium">Ameera Saeed</p>
                    <p className="text-sm text-slate-500">President (2024-2025) • president@tcdmsa.ie</p>
                  </div>
                  <Badge variant="secondary">Current User</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Sara Ahmed</p>
                    <p className="text-sm text-slate-500">Treasurer • treasurer@tcdmsa.ie</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit Role</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Yusuf Ibrahim</p>
                    <p className="text-sm text-slate-500">Events Coordinator • events@tcdmsa.ie</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit Role</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Join Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Join Requests</CardTitle>
              <CardDescription>Approve or decline requests to join the organisation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-500">
                No pending requests
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-slate-500">Receive updates via email</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sync Notifications</p>
                  <p className="text-sm text-slate-500">Get notified when data syncs complete</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy & Security */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage your data and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Export All Data
                </Button>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Danger Zone
                </p>
                <Button variant="destructive">Delete Organisation</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
