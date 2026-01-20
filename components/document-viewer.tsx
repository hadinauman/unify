'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Copy, CheckCircle } from 'lucide-react';
import type { SearchResult } from '@/types';

interface DocumentViewerProps {
  document: SearchResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentViewer({ document, isOpen, onClose }: DocumentViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!document) return null;

  const handleCopyUrl = async () => {
    if (document.url) {
      await navigator.clipboard.writeText(document.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenSource = () => {
    if (document.url) {
      window.open(document.url, '_blank');
    }
  };

  const getSourceIcon = () => {
    switch (document.source.platform) {
      case 'drive':
        return '📄';
      case 'gmail':
        return '📧';
      case 'slack':
        return '💬';
      case 'calendar':
        return '📅';
      case 'contacts':
        return '👤';
      default:
        return '📌';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{document.title}</DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{document.source.platform.toUpperCase()}</Badge>
                <Badge variant="secondary">{document.type}</Badge>
                {document.source.date && (
                  <span className="text-sm text-slate-500">
                    {formatDate(document.source.date)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Relevance Score */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Relevance:</span>
            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                style={{ width: `${document.relevanceScore}%` }}
              />
            </div>
            <span className="text-sm font-medium">{document.relevanceScore}%</span>
          </div>

          {/* Excerpt */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {document.excerpt}
              </p>
            </CardContent>
          </Card>

          {/* Related Entities */}
          {(document.relatedEntities?.people?.length ||
            document.relatedEntities?.events?.length ||
            document.relatedEntities?.vendors?.length ||
            document.relatedEntities?.tags?.length) && (
            <div className="space-y-3">
              <h4 className="font-semibold">Related Information</h4>

              {document.relatedEntities?.people && document.relatedEntities.people.length > 0 && (
                <div>
                  <p className="text-sm text-slate-600 mb-2">People:</p>
                  <div className="flex flex-wrap gap-2">
                    {document.relatedEntities.people.map((person) => (
                      <Badge key={person} variant="secondary">
                        {person}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {document.relatedEntities?.events && document.relatedEntities.events.length > 0 && (
                <div>
                  <p className="text-sm text-slate-600 mb-2">Events:</p>
                  <div className="flex flex-wrap gap-2">
                    {document.relatedEntities.events.map((event) => (
                      <Badge key={event} variant="outline">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {document.relatedEntities?.vendors && document.relatedEntities.vendors.length > 0 && (
                <div>
                  <p className="text-sm text-slate-600 mb-2">Vendors:</p>
                  <div className="flex flex-wrap gap-2">
                    {document.relatedEntities.vendors.map((vendor) => (
                      <Badge key={vendor} variant="outline">
                        {vendor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {document.relatedEntities?.tags && document.relatedEntities.tags.length > 0 && (
                <div>
                  <p className="text-sm text-slate-600 mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {document.relatedEntities.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            {document.url ? (
              <>
                <Button onClick={handleOpenSource} className="flex-1 gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open Source
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyUrl}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </>
            ) : (
              <p className="text-sm text-slate-500 italic">No source link available</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
