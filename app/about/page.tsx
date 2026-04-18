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
  title: 'About Unify - Institutional Memory Management',
  description:
    'Unify eliminates knowledge fragmentation by centralising your organisation\'s institutional memory in one searchable hub.',
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
            Institutional memory management for organisations facing knowledge fragmentation and turnover.
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
              Organisations lose critical knowledge daily. Important decisions, relationships, project details, and hard-won lessons get trapped in scattered emails, Slack threads, Google Docs, and departed team members' memories.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              When someone asks "Why did we choose this approach?", "Who handled this vendor last time?", or "What worked for our last campaign?"—the answers exist somewhere, but finding them wastes hours or becomes impossible.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              This isn't just a handover problem. It's an everyday productivity drain that costs teams time, money, and momentum.
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
              Unify acts as your organisation's institutional memory by connecting to the tools you already use (Gmail, Google Drive, Slack) and using AI to extract, organise, and surface knowledge instantly—so your team can find answers, learn from the past, and make informed decisions without reinventing the wheel.
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
                  Visual chronological history showing what happened, who was involved, budgets, outcomes, and lessons learnt. Track progress and patterns over time.
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
                  Ask natural questions like "How did we handle the venue issue last quarter?" or "What vendors did we use for catering?" and get instant answers with full context.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Contact & Vendor Database
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Centralised directory of vendors, partners, speakers, and stakeholders with interaction history, ratings, notes, and recommendations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Automated Briefings & Insights
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  AI-generated summaries of projects, decisions, and outcomes. Get role-specific context or project overviews without digging through archives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Interactive Data Visualisation
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Dynamic graphs and charts revealing spending patterns, engagement trends, project timelines, and organisational relationships. Understand your data at a glance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Analytics Dashboard
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Track key metrics across projects, budgets, attendance, and outcomes. Identify what's working and spot patterns to improve future planning.
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
                <span>Student organisations with frequent leadership changes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                </div>
                <span>Nonprofits and community groups managing volunteers and committees</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                </div>
                <span>Small teams and startups where everyone wears multiple hats</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                </div>
                <span>Any organisation where knowledge gets lost in communication silos</span>
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
                    One-click integration with Google Workspace, Slack, or Outlook. Unify securely accesses your emails, documents, and messages.
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
                    Our AI analyses your data to extract events, decisions, contacts, budgets, patterns, and relationships automatically.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Search, Visualise & Discover
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Team members search anything, explore interactive timelines, visualise relationships and trends, and surface insights instantly—no more digging through old threads.
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
            Ready to unlock your organisation's collective knowledge?
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Join organisations using Unify to eliminate knowledge loss, reduce time spent searching, and make better decisions based on institutional memory.
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
            © {new Date().getFullYear()} Unify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
