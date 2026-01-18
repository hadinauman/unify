'use client';

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
import { Link2, Users, Bell, Shield, Building, Upload, AlertTriangle } from 'lucide-react';

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
