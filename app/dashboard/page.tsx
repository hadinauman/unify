'use client';

import { useState, useEffect } from 'react';
import { useOrganisation } from '@/lib/contexts/OrganisationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, DollarSign, Star, TrendingUp } from 'lucide-react';
import { mockEvents, mockStatistics } from '@/lib/mockData';

export default function TimelinePage() {
  const { currentOrganisation, loadingOrganisations } = useOrganisation();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);

  // Use real events when organisation exists and has data, otherwise use mock data
  const eventsToDisplay = mockEvents;

  const filteredEvents = eventsToDisplay.filter((event) => {
    const matchesYear = event.date.startsWith(selectedYear);
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSemester = selectedSemester === 'all' || event.semester === selectedSemester;
    return matchesYear && matchesType && matchesSemester;
  });

  const typeColors = {
    fundraiser: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
    social: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    educational: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
    religious: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Timeline</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Visual chronological history of all events
        </p>
      </div>

      {/* Filters & Stats */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-3">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              <SelectItem value="semester-1">Semester 1 (Sep-Dec)</SelectItem>
              <SelectItem value="semester-2">Semester 2 (Jan-May)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="fundraiser">Fundraiser</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
              <SelectItem value="religious">Religious</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold">{mockStatistics.totalEvents}</div>
            <div className="text-xs text-slate-500">Total Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold">{mockStatistics.avgAttendance}</div>
            <div className="text-xs text-slate-500">Avg Attendance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold">€{(mockStatistics.totalFundraisingRaised / 1000).toFixed(0)}K</div>
            <div className="text-xs text-slate-500">Total Raised</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <Dialog key={event.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <Badge className={typeColors[event.type as keyof typeof typeColors]}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                          {event.endDate &&
                            ` - ${new Date(event.endDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}`}
                        </div>
                        {event.attendance && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendance} attendees
                          </div>
                        )}
                        {event.fundraising && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            €{(event.fundraising / 1000).toFixed(0)}K raised
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: event.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            {/* Event Detail Modal */}
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{event.title}</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="budget">Budget</TabsTrigger>
                  <TabsTrigger value="people">People</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Event Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Date:</span>
                        <span>
                          {new Date(event.date).toLocaleDateString('en-GB')}
                          {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-GB')}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Attendance:</span>
                        <span>{event.attendance || 'N/A'}</span>
                      </div>
                      {event.fundraising && (
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Fundraised:</span>
                          <span className="font-semibold text-emerald-600">
                            €{event.fundraising.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-emerald-600">What Worked</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      <li>Early promotion through social media</li>
                      <li>Partnered with local businesses for sponsorship</li>
                      <li>Engaged alumni network for donations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-amber-600">Challenges</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      <li>Venue booking confirmed late</li>
                      <li>Logistics coordination needed improvement</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="budget" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-3">Budget Overview</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400">Planned</p>
                            <p className="text-2xl font-semibold">
                              €{event.budget.planned.toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400">Actual</p>
                            <p className="text-2xl font-semibold">
                              €{event.budget.actual.toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400">Variance</p>
                            <p className="text-2xl font-semibold text-emerald-600">
                              -€{(event.budget.planned - event.budget.actual).toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="people" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Organisers</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Ahmed Khan (President), Sarah O'Brien (Events Coordinator)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Vendors</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Halal Bros Catering, Dublin Event Rentals
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="space-y-2 mt-4">
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                      <span>📧 Email: "Venue Confirmation"</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                      <span>📝 Doc: "Event Plan 2024"</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                      <span>📊 Sheet: "Budget Tracker"</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Advice for Next Time</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      <li>Book venue 3 months in advance</li>
                      <li>Maintain buffer of 10% in budget for unexpected costs</li>
                      <li>Create detailed logistics timeline 6 weeks before event</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-slate-500">No events found for the selected filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
