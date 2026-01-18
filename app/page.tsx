import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  HelpCircle,
  Users,
  RotateCw,
  Link2,
  Brain,
  Search,
  Calendar,
  Mail,
  FileText,
  MessageSquare,
  Instagram,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="mb-4">
            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
              Unify
            </h1>
            <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 font-medium">
              Institutional memory that never graduates
            </p>
          </div>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            When your entire committee changes annually, institutional knowledge
            shouldn't vanish. Unify preserves what matters—automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup/organisation">
                Create Organisation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/signup/member">Join Organisation</Link>
            </Button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/signin" className="text-cyan-600 hover:underline dark:text-cyan-400">
              Sign in
            </Link>
          </p>
        </div>

        {/* Visual Mockup Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto">
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-cyan-50 dark:from-slate-800 dark:to-cyan-950 flex items-center justify-center">
                <Calendar className="h-24 w-24 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white dark:bg-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-slate-900 dark:text-slate-50">
            The Institutional Amnesia Crisis
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  "How did we run Charity Week?"
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  New committees rediscover solutions to solved problems
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  "Who do I contact?"
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Critical vendor/partner relationships lost when people graduate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <RotateCw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  "Why do we do it this way?"
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Decisions and reasoning forgotten, same debates repeated annually
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-slate-900 dark:text-slate-50">
            How Unify Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1: Connect */}
            <Card className="relative">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0">
                    <Link2 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                      Step 1
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                      Connect
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  One-click integration with Google Workspace, Slack, Outlook
                </p>
                <div className="flex gap-2 pt-2">
                  <Mail className="h-6 w-6 text-slate-400" />
                  <MessageSquare className="h-6 w-6 text-slate-400" />
                  <FileText className="h-6 w-6 text-slate-400" />
                </div>
              </CardContent>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-slate-300 dark:text-slate-700" />
              </div>
            </Card>

            {/* Step 2: Extract */}
            <Card className="relative">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      Step 2
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                      Extract
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  AI analyses emails, docs, messages to extract events, decisions,
                  patterns
                </p>
                <div className="text-sm text-slate-500 dark:text-slate-500 font-mono">
                  Documents → AI → Structured data
                </div>
              </CardContent>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-slate-300 dark:text-slate-700" />
              </div>
            </Card>

            {/* Step 3: Discover */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center flex-shrink-0">
                    <Search className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                      Step 3
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                      Discover
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Search anything, explore timeline, get role-specific briefings
                </p>
                <div className="pt-2">
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 to-cyan-950 dark:from-slate-950 dark:to-cyan-950 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Start preserving your institutional memory
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            5 minutes to set up • Built for student organisations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/signup/organisation">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-slate-50">
                Unify
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Institutional memory that never graduates
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-slate-900 dark:text-slate-50">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-slate-900 dark:text-slate-50">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-slate-900 dark:text-slate-50">
                Connect
              </h4>
              <div className="flex gap-4">
                <Link
                  href="https://instagram.com/unify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://tiktok.com/@unify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  aria-label="TikTok"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} Unify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
