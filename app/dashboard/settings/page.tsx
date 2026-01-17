'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link2, Users, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
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
          <Card>
            <CardHeader>
              <CardTitle>Organisation Details</CardTitle>
              <CardDescription>Update your organisation information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="orgName">Organisation Name</Label>
                <Input id="orgName" defaultValue="Trinity College Dublin ISoc" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="orgType">Organisation Type</Label>
                <Select defaultValue="isoc">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="isoc">ISoc</SelectItem>
                    <SelectItem value="msa">MSA</SelectItem>
                    <SelectItem value="student-org">Student Organisation</SelectItem>
                    <SelectItem value="nonprofit">Nonprofit Chapter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="membersCount">Members Count</Label>
                <Input id="membersCount" type="number" defaultValue="120" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input id="foundedYear" type="number" defaultValue="2010" className="mt-1" />
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
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                    <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Google Workspace</p>
                    <p className="text-sm text-slate-500">Last synced 2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Sync Now</Button>
                  <Button variant="ghost" size="sm">Disconnect</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Link2 className="mr-2 h-4 w-4" />
                Connect New Source
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Invite and manage committee members</CardDescription>
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
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Ahmed Khan</p>
                    <p className="text-sm text-slate-500">President • ahmed@example.com</p>
                  </div>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
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
