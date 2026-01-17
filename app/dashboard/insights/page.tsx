'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TrendingUp, Users, DollarSign, Calendar, Award } from 'lucide-react';

export default function InsightsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Insights</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Analytics dashboard showing organisational metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">+8% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£142K</div>
            <p className="text-xs text-muted-foreground">+23% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3</div>
            <p className="text-xs text-muted-foreground">+0.2 from last year</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Event Trends</TabsTrigger>
          <TabsTrigger value="budget">Budget Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Patterns</TabsTrigger>
          <TabsTrigger value="fundraising">Fundraising Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Success Trends</CardTitle>
              <CardDescription>Attendance and ratings over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Chart visualisation with Recharts</p>
                <p className="text-xs mt-2">Line chart showing attendance trends by quarter</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Performance</CardTitle>
              <CardDescription>Planned vs Actual spending by quarter</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Chart visualisation with Recharts</p>
                <p className="text-xs mt-2">Bar chart comparing planned vs actual budgets</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Patterns</CardTitle>
              <CardDescription>Best days and times for events</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Chart visualisation with Recharts</p>
                <p className="text-xs mt-2">Heatmap showing attendance by day/time</p>
                <p className="text-xs text-emerald-600 mt-4">
                  Insight: Friday 2-4pm has 2x higher attendance
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fundraising" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fundraising Growth</CardTitle>
              <CardDescription>Cumulative fundraising over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Chart visualisation with Recharts</p>
                <p className="text-xs mt-2">Area chart showing fundraising growth year-over-year</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-emerald-200 dark:border-emerald-900">
          <CardHeader>
            <CardTitle className="text-emerald-600 dark:text-emerald-400">
              What's Working Well
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2" />
              <p>Charity events consistently exceed fundraising targets by 15%</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2" />
              <p>Social events in Q1 have 40% higher attendance than other quarters</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2" />
              <p>Events with early promotion (3+ weeks) have better turnout</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 dark:border-amber-900">
          <CardHeader>
            <CardTitle className="text-amber-600 dark:text-amber-400">
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2" />
              <p>Budget variance averaging 8% - need tighter cost control</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2" />
              <p>Weekday evening events have 25% lower attendance</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2" />
              <p>Q2 has 30% fewer events - opportunity to increase engagement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
