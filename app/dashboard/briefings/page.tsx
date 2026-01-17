'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Download, Mail, Sparkles, Calendar } from 'lucide-react';

const mockBriefings = [
  {
    id: '1',
    role: 'President',
    generatedAt: '2024-09-01',
    preview: 'Comprehensive briefing for the President role covering annual timeline, key responsibilities, and advice from previous presidents...',
  },
  {
    id: '2',
    role: 'Treasurer',
    generatedAt: '2024-09-01',
    preview: 'Financial management guide including budget planning, expense tracking, and fundraising strategies...',
  },
];

export default function BriefingsPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // TODO: Call API to generate briefing
    setTimeout(() => {
      setIsGenerating(false);
      alert('Briefing generated! (This will be implemented with real AI generation)');
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Role Briefings</h1>
        <p className="text-slate-600 dark:text-slate-400">
          AI-generated onboarding documents based on institutional history
        </p>
      </div>

      {/* Generate New Briefing */}
      <Card className="border-cyan-200 dark:border-cyan-900 bg-gradient-to-br from-cyan-50/50 to-purple-50/50 dark:from-cyan-950/20 dark:to-purple-950/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle>Generate New Briefing</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Create a role-specific onboarding document
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="president">President</SelectItem>
                <SelectItem value="treasurer">Treasurer</SelectItem>
                <SelectItem value="events">Events Coordinator</SelectItem>
                <SelectItem value="social">Social Secretary</SelectItem>
                <SelectItem value="publicity">Publicity Officer</SelectItem>
                <SelectItem value="custom">Custom Role</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleGenerate}
              disabled={!selectedRole || isGenerating}
              className="min-w-[150px]"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Briefing
                </>
              )}
            </Button>
          </div>
          {isGenerating && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Analyzing 3 years of data and extracting insights...
            </p>
          )}
        </CardContent>
      </Card>

      {/* Existing Briefings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Previous Briefings</h2>
        {mockBriefings.map((briefing) => (
          <Card key={briefing.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{briefing.role} Briefing</h3>
                      <Badge variant="secondary">AI-Generated</Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {briefing.preview}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      Generated: {new Date(briefing.generatedAt).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Example Briefing Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Example: President Briefing</CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">Preview of what a generated briefing looks like</p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h3>Your Role Overview</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            As President, you're the primary representative and coordinator for the ISoc. Based on the past 3 years, your key responsibilities include leading committee meetings, liaising with the Student Union, and overseeing major events.
          </p>

          <h3>Annual Timeline</h3>
          <ul className="text-sm space-y-1">
            <li><strong>Q1 (Sep-Nov):</strong> Freshers events, committee elections, annual planning</li>
            <li><strong>Q2 (Dec-Feb):</strong> Charity Week planning, semester wrap-up</li>
            <li><strong>Q3 (Mar-May):</strong> Charity Week execution, Ramadan events, end-of-year review</li>
          </ul>

          <h3>Key Contacts You'll Need</h3>
          <ul className="text-sm space-y-1">
            <li><strong>Student Union Rep:</strong> For room bookings and society funding</li>
            <li><strong>Halal Bros Catering:</strong> Reliable food vendor (2-week lead time)</li>
            <li><strong>Muslim Relief UK:</strong> Charity partner for fundraising events</li>
          </ul>

          <h3>Advice from Previous Presidents</h3>
          <ul className="text-sm space-y-1">
            <li>Start Charity Week planning at least 3 months in advance</li>
            <li>Delegate responsibilities early - you can't do everything yourself</li>
            <li>Build relationships with local businesses for sponsorship opportunities</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
