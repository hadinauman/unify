import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Search,
  Calendar,
  MessageSquare,
} from 'lucide-react';

export const metadata = {
  title: 'About Unify - Institutional Memory for Student Organisations',
  description:
    'Learn how Unify helps student organisations preserve institutional knowledge across annual leadership turnover.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 mb-8 inline-block"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
            About Unify
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Institutional memory management for student organisations with high
            leadership turnover.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              The Problem
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Student organisations like ISocs and MSAs face 100% committee
              turnover annually. When new leadership takes over, critical
              institutional knowledge vanishes—event planning details, vendor
              relationships, budget strategies, and hard-won lessons learned are
              lost.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Every year, new committees ask the same questions: "How did we run
              Charity Week?", "Who's our reliable caterer?", "What budget worked
              for Ramadan iftars?". The answers exist somewhere in old emails,
              scattered Google Docs, and graduated students' memories—but they're
              impossible to find.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Our Solution
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Unify preserves your organisation's institutional memory by
              connecting to the tools you already use (Gmail, Google Drive, Slack)
              and using AI to extract, organize, and present knowledge so new
              committee members can instantly understand what happened before, what
              worked, and how to succeed.
            </p>
          </div>

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Timeline of Events
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Visual chronological history showing what happened, who was
                  involved, budgets, attendance, and lessons learned.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
                  <Search className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  AI-Powered Search
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ask natural questions like "How did we book venues last year?"
                  and get instant answers with context.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Contact Database
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Vendors, speakers, partners with ratings, notes, and event
                  history so you know who to contact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Role-Specific Briefings
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Auto-generated onboarding docs for each committee role with
                  relevant context and advice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Budget & Analytics
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  See what budgets worked, attendance patterns, and fundraising
                  trends over time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Seamless Handover
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Transfer presidency with one click while preserving all
                  institutional knowledge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Built For Section */}
      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
              Built For
            </h2>
            <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                </div>
                <span>Islamic Societies (ISocs) and Muslim Students Associations (MSAs)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                </div>
                <span>Student organisations with annual leadership changes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                </div>
                <span>Community groups and nonprofit chapters</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-8">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Connect Your Tools
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    One-click integration with Google Workspace, Slack, or Outlook.
                    Unify securely accesses your emails, documents, and messages.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    AI Extracts Knowledge
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Our AI analyzes your data to extract events, decisions,
                    contacts, budgets, and patterns automatically.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Search & Discover
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    New committee members can search anything, explore the timeline,
                    and get role-specific briefings instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 to-cyan-950 dark:from-slate-950 dark:to-cyan-950 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Ready to preserve your organisation's knowledge?
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Join student organisations using Unify to maintain institutional memory
            across leadership changes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/signup/organisation">
                Create Organisation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-slate-900" asChild>
              <Link href="/signup/member">Join Organisation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} Unify. Built for student organisations.
          </p>
        </div>
      </footer>
    </div>
  );
}
