'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Sparkles, Calendar, Mail, FileText, MessageSquare } from 'lucide-react';

const mockResults = [
  {
    id: '1',
    type: 'email',
    title: 'Venue Booking Confirmation',
    excerpt: 'Confirmed booking of Union Hall for Charity Week 2023. Total: £1,500...',
    source: { type: 'email', platform: 'Gmail', date: '2023-03-15' },
    relevanceScore: 95,
    relatedEntities: { people: ['Ahmed Khan'], events: ['Charity Week 2023'], tags: ['venue'] },
  },
  {
    id: '2',
    type: 'document',
    title: 'Charity Week 2023 Event Plan',
    excerpt: 'Comprehensive planning document for CW23 including timeline, budget...',
    source: { type: 'document', platform: 'Google Drive', date: '2023-03-10' },
    relevanceScore: 92,
    relatedEntities: { people: ['Ahmed Khan'], events: ['Charity Week 2023'], tags: ['planning'] },
  },
  {
    id: '3',
    type: 'slack',
    title: '#charity-week',
    excerpt: 'Budget locked. Venue: £1,500. @Sarah can you finalise catering?',
    source: { type: 'message', platform: 'Slack', date: '2023-03-15' },
    relevanceScore: 88,
    relatedEntities: { people: ['Ahmed Khan', 'Sarah'], events: ['Charity Week 2023'], tags: [] },
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockResults);
  const [selectedSource, setSelectedSource] = useState('all');
  const [showAiSummary, setShowAiSummary] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API for semantic search
    console.log('Searching for:', query);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return Mail;
      case 'document':
        return FileText;
      case 'slack':
        return MessageSquare;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400';
      case 'document':
        return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400';
      case 'slack':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400';
      default:
        return 'text-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-400';
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Search Input */}
      <div>
        <h1 className="text-3xl font-semibold mb-6">Search</h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Ask anything... (e.g., 'How do we book venues?')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-11 text-lg h-14"
              autoFocus
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Tabs value={selectedSource} onValueChange={setSelectedSource}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="gmail">Gmail</TabsTrigger>
                <TabsTrigger value="drive">Drive</TabsTrigger>
                <TabsTrigger value="slack">Slack</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </form>
      </div>

      {/* AI Summary */}
      {showAiSummary && query && (
        <Card className="border-cyan-200 dark:border-cyan-900 bg-cyan-50/50 dark:bg-cyan-950/20">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-lg">AI Summary</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Based on 5 documents, venues are typically booked 2-3 months in advance
                  through the Student Union. The process involves submitting a booking form,
                  getting approval from your society advisor, and confirming with a deposit.
                </p>

                <div>
                  <h4 className="font-medium mb-2">Key Insights:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <li>Union Hall costs £1,500 for full-day events</li>
                    <li>Early booking (3+ months) often gets 10% discount</li>
                    <li>Always book catering separately - venues don't include food</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Related queries:</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                      How much do venues cost?
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                      Who handles venue bookings?
                    </Badge>
                  </div>
                </div>

                <div className="pt-2 border-t border-cyan-200 dark:border-cyan-800">
                  <p className="text-xs text-slate-500">
                    Sources: 5 documents • Confidence: High
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {results.length} Results
          </h2>
          <p className="text-sm text-slate-500">
            Sorted by relevance
          </p>
        </div>

        {results.map((result) => {
          const TypeIcon = getTypeIcon(result.type);
          const typeColor = getTypeColor(result.type);

          return (
            <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`h-10 w-10 rounded-lg ${typeColor} flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{result.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {result.source.platform}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {result.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(result.source.date).toLocaleDateString('en-GB')}
                        <span>•</span>
                        <span className="font-mono">{result.relevanceScore}% match</span>
                      </div>
                      <div className="flex gap-2">
                        {result.relatedEntities.people.map((person) => (
                          <Badge key={person} variant="secondary" className="text-xs">
                            {person}
                          </Badge>
                        ))}
                        {result.relatedEntities.events.map((event) => (
                          <Badge key={event} variant="secondary" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
