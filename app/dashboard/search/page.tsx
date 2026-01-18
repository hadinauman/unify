'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Sparkles, Calendar, Mail, FileText, MessageSquare, Loader2, Users, Tag } from 'lucide-react';
import { api } from '@/lib/api';

interface SearchResult {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  source: { type: string; platform: string; date: string };
  relevanceScore: number;
  relatedEntities: { people?: string[]; events?: string[]; vendors?: string[]; tags?: string[] };
}

interface AISummary {
  summary: string;
  keyInsights: string[];
  relatedQueries: string[];
  confidence: string;
  sources: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedSource, setSelectedSource] = useState('all');
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await api.searchKnowledge(query);
      setResults(response.results || []);
      setAiSummary(response.aiSummary || null);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
      setAiSummary(null);
    } finally {
      setIsLoading(false);
    }
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

      {/* Loading State */}
      {isLoading && (
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3 py-8">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-600" />
              <p className="text-slate-600 dark:text-slate-400">Searching and generating AI summary...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Summary */}
      {!isLoading && aiSummary && (
        <Card className="border-cyan-200 dark:border-cyan-900 bg-cyan-50/50 dark:bg-cyan-950/20">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-lg">AI Summary</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  {aiSummary.summary}
                </p>

                {aiSummary.keyInsights && aiSummary.keyInsights.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Key Insights:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      {aiSummary.keyInsights.map((insight, i) => (
                        <li key={i}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiSummary.relatedQueries && aiSummary.relatedQueries.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Related queries:</h4>
                    <div className="flex flex-wrap gap-2">
                      {aiSummary.relatedQueries.map((relatedQuery, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                          onClick={() => {
                            setQuery(relatedQuery);
                          }}
                        >
                          {relatedQuery}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-cyan-200 dark:border-cyan-800">
                  <p className="text-xs text-slate-500">
                    Sources: {aiSummary.sources?.length || 0} documents • Confidence: {aiSummary.confidence || 'Medium'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {!isLoading && hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {results.length} Results
            </h2>
            {results.length > 0 && (
              <p className="text-sm text-slate-500">
                Sorted by relevance
              </p>
            )}
          </div>

          {results.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-slate-500 py-8">
                  No results found for &quot;{query}&quot;. Try a different search term.
                </p>
              </CardContent>
            </Card>
          )}

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
                          {result.source.date ? new Date(result.source.date).toLocaleDateString('en-GB') : 'No date'}
                          <span>•</span>
                          <span className="font-mono">{result.relevanceScore}% match</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {result.relatedEntities?.people?.map((person) => (
                            <Badge key={person} variant="secondary" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {person}
                            </Badge>
                          ))}
                          {result.relatedEntities?.events?.map((event) => (
                            <Badge key={event} variant="secondary" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {event}
                            </Badge>
                          ))}
                          {result.relatedEntities?.vendors?.map((vendor) => (
                            <Badge key={vendor} variant="secondary" className="text-xs">
                              {vendor}
                            </Badge>
                          ))}
                          {result.relatedEntities?.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
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
      )}

      {/* Initial State - Search Suggestions */}
      {!hasSearched && !isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 space-y-4">
              <Search className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600" />
              <div>
                <h3 className="font-semibold text-lg">Search your organization&apos;s knowledge</h3>
                <p className="text-slate-500 mt-1">Ask questions about events, contacts, budgets, and more</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {[
                  'How did we organize Freshers Week?',
                  'Who is our caterer?',
                  'Charity Week budget',
                  'Ramadan planning',
                ].map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => {
                      setQuery(suggestion);
                    }}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
