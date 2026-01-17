'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, User, Calendar, Building2, FileText, ZoomIn, ZoomOut } from 'lucide-react';

export default function KnowledgeGraphPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Knowledge Graph</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Visualise relationships between people, events, and organisations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Nodes</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="orgs">Organisations</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Graph Canvas Placeholder */}
      <Card className="border-2 border-dashed">
        <CardContent className="p-12">
          <div className="text-center space-y-4">
            <Network className="h-24 w-24 mx-auto text-slate-300 dark:text-slate-700" />
            <div>
              <h3 className="text-xl font-semibold mb-2">React Flow Integration</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Interactive knowledge graph showing relationships between entities.
                Built with React Flow for node-based visualisation.
              </p>
            </div>

            <div className="pt-4 space-y-3 text-sm text-slate-500">
              <p className="font-medium">Features to implement:</p>
              <div className="grid grid-cols-2 gap-2 max-w-md mx-auto text-left">
                <div>• Draggable nodes</div>
                <div>• Zoom and pan</div>
                <div>• Node filtering by type</div>
                <div>• Relationship edges</div>
                <div>• Click to view details</div>
                <div>• Search within graph</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Node Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm">People</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm">Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm">Organisations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm">Documents</span>
            </div>
          </div>

          <h3 className="font-semibold mb-3 mt-6">Relationship Types</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Organised</Badge>
            <Badge variant="outline">Partnered</Badge>
            <Badge variant="outline">Created</Badge>
            <Badge variant="outline">Attended</Badge>
            <Badge variant="outline">Sponsored</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Example Relationships */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Example Relationships</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded">
              <Badge variant="secondary">Ahmed Khan</Badge>
              <span className="text-slate-500">organised</span>
              <Badge variant="secondary">Charity Week 2024</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded">
              <Badge variant="secondary">Charity Week 2024</Badge>
              <span className="text-slate-500">partnered with</span>
              <Badge variant="secondary">Muslim Relief UK</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded">
              <Badge variant="secondary">Ahmed Khan</Badge>
              <span className="text-slate-500">created</span>
              <Badge variant="secondary">Event Plan 2024</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded">
              <Badge variant="secondary">Halal Bros</Badge>
              <span className="text-slate-500">provided catering for</span>
              <Badge variant="secondary">Ramadan Iftar</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
