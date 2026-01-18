'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Search,
  Star,
  Mail,
  Phone,
  Globe,
  Calendar,
  Plus,
  Building2,
  Mic,
  Handshake,
  GraduationCap,
  Users as UsersIcon,
} from 'lucide-react';
import { mockContacts } from '@/lib/mockData';

export default function ContactsPage() {
  const [contacts, setContacts] = useState(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || contact.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vendor':
        return Building2;
      case 'speaker':
        return Mic;
      case 'partner':
        return Handshake;
      case 'alumni':
        return GraduationCap;
      default:
        return UsersIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vendor':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400';
      case 'speaker':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400';
      case 'partner':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400';
      case 'alumni':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-400';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Contacts</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Centralised database of all organisational contacts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="vendor">Vendors</TabsTrigger>
            <TabsTrigger value="speaker">Speakers</TabsTrigger>
            <TabsTrigger value="partner">Partners</TabsTrigger>
            <TabsTrigger value="alumni">Alumni</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => {
          const TypeIcon = getTypeIcon(contact.type);
          const typeColor = getTypeColor(contact.type);

          return (
            <Dialog key={contact.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`h-12 w-12 rounded-lg ${typeColor} flex items-center justify-center`}>
                        <TypeIcon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {contact.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-3">{contact.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {contact.description}
                    </p>

                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: contact.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">
                        {contact.rating}.0
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">
                      Used in {contact.eventsUsed.length} events
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* Contact Detail Modal */}
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className={`h-16 w-16 rounded-lg ${typeColor} flex items-center justify-center`}>
                      <TypeIcon className="h-8 w-8" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{contact.name}</DialogTitle>
                      <Badge variant="outline" className="mt-1 capitalize">
                        {contact.type}
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      {contact.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-slate-500" />
                          <a href={`mailto:${contact.email}`} className="text-cyan-600 hover:underline">
                            {contact.email}
                          </a>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-500" />
                          <a href={`tel:${contact.phone}`} className="text-cyan-600 hover:underline">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                      {contact.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-slate-500" />
                          <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">
                            {contact.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {contact.description}
                    </p>
                  </div>

                  {/* Notes */}
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {contact.notes}
                    </p>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-semibold mb-2">Rating</h3>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: contact.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {contact.rating}.0 ({contact.relationshipStrength} relationship)
                      </span>
                    </div>
                  </div>

                  {/* Event History */}
                  <div>
                    <h3 className="font-semibold mb-2">Event History</h3>
                    <div className="space-y-2">
                      {contact.eventsUsed.map((event, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800"
                        >
                          <span className="text-sm">{event}</span>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {contact.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Last Contacted */}
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    Last contacted: {new Date(contact.lastContactedAt).toLocaleDateString('en-GB')}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Contact
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Edit Contact
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-slate-500">No contacts found for the selected filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
