'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import type { SearchResult } from '@/types';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  type: 'event' | 'document' | 'contact';
  excerpt: string;
  relevanceScore: number;
  url?: string;
  metadata?: {
    attendance?: number;
    budget?: number;
    tags?: string[];
    people?: string[];
  };
}

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in production, this would fetch from the backend/database
  const mockTimelineData: TimelineEvent[] = [
    {
      id: 'event-001',
      title: 'Freshers Week 2024',
      date: '2024-09-12',
      type: 'event',
      excerpt: 'Welcome event for new students during Freshers Week',
      relevanceScore: 95,
      metadata: {
        attendance: 75,
        budget: 380,
        tags: ['freshers', 'welcome', 'social'],
        people: ['Abdul Wadood'],
      },
    },
    {
      id: 'event-002',
      title: 'Charity Week 2024',
      date: '2024-11-18',
      type: 'event',
      excerpt: 'Annual fundraising week for Islamic Relief Ireland',
      relevanceScore: 88,
      metadata: {
        attendance: 120,
        budget: 575,
        tags: ['fundraising', 'charity', 'community'],
        people: ['Ameera Saeed'],
      },
    },
    {
      id: 'event-003',
      title: 'Ramadan Iftar Series 2025',
      date: '2025-03-01',
      type: 'event',
      excerpt: 'Daily iftar meals during Ramadan',
      relevanceScore: 82,
      metadata: {
        attendance: 65,
        budget: 750,
        tags: ['ramadan', 'iftar', 'religious'],
      },
    },
    {
      id: 'doc-001',
      title: 'Freshers Week 2024 Planning',
      date: '2024-08-15',
      type: 'document',
      excerpt: 'Comprehensive plan for Freshers Week including budget and timeline',
      relevanceScore: 90,
    },
    {
      id: 'doc-002',
      title: 'Committee Handover Notes 2024',
      date: '2024-05-15',
      type: 'document',
      excerpt: 'Handover document with key contacts and lessons learned',
      relevanceScore: 75,
    },
  ];

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    const timer = setTimeout(() => {
      setEvents(mockTimelineData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getYears = () => {
    const years = new Set(
      events.map((event) => new Date(event.date).getFullYear().toString())
    );
    return Array.from(years).sort().reverse();
  };

  const filteredEvents = selectedYear === 'all'
    ? events
    : events.filter((event) => new Date(event.date).getFullYear().toString() === selectedYear);

  const eventsByMonth = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.date);
    const monthKey = date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });

    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(event);

    return acc;
  }, {} as Record<string, TimelineEvent[]>);

  const toggleEventExpanded = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800';
      case 'document':
        return 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800';
      case 'contact':
        return 'bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800';
      default:
        return 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
      case 'document':
        return <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <TrendingUp className="h-12 w-12 mx-auto animate-pulse text-slate-300" />
            <p className="text-slate-500">Loading timeline...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Timeline</h1>
        <p className="text-slate-600 dark:text-slate-400">
          {events.length} events and documents organized by date
        </p>
      </div>

      {/* Year Filter */}
      <Tabs value={selectedYear} onValueChange={setSelectedYear} className="w-full">
        <TabsList className="grid grid-cols-auto gap-2 mb-6">
          <TabsTrigger value="all">All Years</TabsTrigger>
          {getYears().map((year) => (
            <TabsTrigger key={year} value={year}>
              {year}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
          <div key={month} className="relative">
            {/* Month Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-700" />
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 px-4 whitespace-nowrap">
                {month}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-slate-300 to-transparent dark:from-slate-700" />
            </div>

            {/* Events in Month */}
            <div className="space-y-3 pl-8 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-slate-300 before:to-transparent dark:before:from-slate-700">
              {monthEvents.map((event, index) => {
                const isExpanded = expandedEvents.has(event.id);
                const hasMetadata = event.metadata && Object.keys(event.metadata).length > 0;

                return (
                  <Card key={event.id} className={`border-l-4 ${getEventTypeColor(event.type)}`}>
                    <CardContent className="pt-6 pb-4">
                      <div className="space-y-3">
                        {/* Header with Toggle */}
                        <button
                          onClick={() => toggleEventExpanded(event.id)}
                          className="w-full text-left flex items-start justify-between hover:opacity-75 transition-opacity"
                        >
                          <div className="flex-1 flex items-start gap-3">
                            <div className="mt-1">{getEventTypeIcon(event.type)}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {event.type}
                                </Badge>
                                <span className="text-xs text-slate-500">
                                  {new Date(event.date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </span>
                                <div className="flex-1" />
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                  {event.relevanceScore}% relevant
                                </span>
                              </div>
                            </div>
                          </div>
                          {hasMetadata && (
                            <div className="ml-2">
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-slate-400" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-slate-400" />
                              )}
                            </div>
                          )}
                        </button>

                        {/* Excerpt */}
                        <p className="text-sm text-slate-600 dark:text-slate-400">{event.excerpt}</p>

                        {/* Expanded Details */}
                        {isExpanded && hasMetadata && (
                          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                            {event.metadata?.attendance && (
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-400">
                                  {event.metadata.attendance} attendees
                                </span>
                              </div>
                            )}
                            {event.metadata?.budget && (
                              <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-400">
                                  €{event.metadata.budget}
                                </span>
                              </div>
                            )}
                            {event.metadata?.people && event.metadata.people.length > 0 && (
                              <div>
                                <p className="text-xs text-slate-500 mb-2">Organizers:</p>
                                <div className="flex flex-wrap gap-2">
                                  {event.metadata.people.map((person) => (
                                    <Badge key={person} variant="secondary" className="text-xs">
                                      {person}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {event.metadata?.tags && event.metadata.tags.length > 0 && (
                              <div>
                                <p className="text-xs text-slate-500 mb-2">Tags:</p>
                                <div className="flex flex-wrap gap-2">
                                  {event.metadata.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {event.url && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2"
                                onClick={() => window.open(event.url, '_blank')}
                              >
                                View Source
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-slate-500 dark:text-slate-400">
                No events found for {selectedYear === 'all' ? 'any year' : `${selectedYear}`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
