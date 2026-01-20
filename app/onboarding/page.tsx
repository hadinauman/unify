'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { organisationPresets } from '@/lib/organisationPresets';
import type { OrganisationType } from '@/backend/src/types';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const signupType = searchParams.get('type'); // 'organisation' or 'member'
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: '',
    orgSubtype: '',
    membersCount: '',
    foundedYear: new Date().getFullYear().toString(),
    yourRole: signupType === 'organisation' ? 'president' : '',
    committeeYear: '',
    selectedOrg: '', // For member signup
  });

  useEffect(() => {
    // If signing up as member, skip step 1 (org creation)
    if (signupType === 'member') {
      setStep(2);
    }
  }, [signupType]);

  const handleSubmit = async () => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Determine final organisation type
      const finalOrgType = formData.orgSubtype || (formData.orgType as OrganisationType);

      // Create organisation in database
      // Note: The backend will add type-specific metadata automatically
      const response = await fetch('/api/organisations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          name: formData.orgName,
          type: finalOrgType,
          foundedYear: parseInt(formData.foundedYear),
          periodYear: formData.committeeYear, // Can be academic year, fiscal year, etc
          initialCount: parseInt(formData.membersCount) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create organisation');
      }

      const organisation = await response.json();

      // Save organisation ID to localStorage for dashboard context
      localStorage.setItem('currentOrganisationId', organisation.id);

      // Redirect to connect or dashboard
      router.push('/connect');
    } catch (err) {
      console.error('Error creating organisation:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to create organisation'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Unify</CardTitle>
          <p className="text-slate-600 dark:text-slate-400">
            {signupType === 'organisation'
              ? "Let's set up your organisation"
              : "Let's get you connected to your organisation"}
          </p>
          <div className="flex gap-2 mt-4">
            <div
              className={`h-2 flex-1 rounded ${
                step >= 1 ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
            <div
              className={`h-2 flex-1 rounded ${
                step >= 2 ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
            <div
              className={`h-2 flex-1 rounded ${
                step >= 3 ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
              <p className="text-sm text-red-900 dark:text-red-200">{error}</p>
            </div>
          )}

          {step === 1 && signupType === 'organisation' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="orgName">Organisation Name</Label>
                <Input
                  id="orgName"
                  placeholder="e.g., TCD MSA"
                  value={formData.orgName}
                  onChange={(e) =>
                    setFormData({ ...formData, orgName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="orgType">Organisation Type</Label>
                <Select
                  value={formData.orgType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, orgType: value, orgSubtype: '' })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(organisationPresets).map(([key, preset]) => (
                      <SelectItem key={key} value={key}>
                        {preset.icon} {preset.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.orgType && organisationPresets[formData.orgType as OrganisationType] && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {organisationPresets[formData.orgType as OrganisationType].description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="membersCount">Estimated Members</Label>
                <Input
                  id="membersCount"
                  type="number"
                  placeholder="e.g., 180"
                  value={formData.membersCount}
                  onChange={(e) =>
                    setFormData({ ...formData, membersCount: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  placeholder="e.g., 1997"
                  value={formData.foundedYear}
                  onChange={(e) =>
                    setFormData({ ...formData, foundedYear: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full"
                disabled={!formData.orgName || !formData.orgType}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {signupType === 'member' && (
                <div>
                  <Label htmlFor="selectedOrg">Select Organisation</Label>
                  <Select
                    value={formData.selectedOrg}
                    onValueChange={(value) =>
                      setFormData({ ...formData, selectedOrg: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose your organisation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tcd-msa">TCD MSA</SelectItem>
                      <SelectItem value="ucd-msa">UCD MSA</SelectItem>
                      <SelectItem value="dcu-isoc">DCU Islamic Society</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="yourRole">Your Committee Role</Label>
                <Select
                  value={formData.yourRole}
                  onValueChange={(value) =>
                    setFormData({ ...formData, yourRole: value })
                  }
                  disabled={signupType === 'organisation'}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {signupType === 'organisation' && (
                      <SelectItem value="president">President</SelectItem>
                    )}
                    {signupType === 'member' && (
                      <>
                        <SelectItem value="treasurer">Treasurer</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="events">Events Coordinator</SelectItem>
                        <SelectItem value="social">Social Secretary</SelectItem>
                        <SelectItem value="publicity">Publicity Officer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {signupType === 'organisation' && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    As organisation creator, you are automatically assigned as President
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="committeeYear">Committee Year</Label>
                <Input
                  id="committeeYear"
                  placeholder="2025-2026"
                  value={formData.committeeYear}
                  onChange={(e) =>
                    setFormData({ ...formData, committeeYear: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {signupType === 'member' && (
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    ⚠️ Your join request will be sent to the President for approval
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {signupType === 'organisation' && (
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                <Button
                  onClick={() => setStep(3)}
                  className={signupType === 'organisation' ? 'flex-1' : 'w-full'}
                  disabled={
                    !formData.yourRole ||
                    (signupType === 'member' && !formData.selectedOrg)
                  }
                >
                  {signupType === 'member' ? 'Send Request' : 'Continue'}{' '}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">All set!</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  You can connect your data sources now or skip and do it later.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => router.push('/dashboard')}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Skip for now
                </Button>
                <Button onClick={handleSubmit} className="flex-1" disabled={loading}>
                  {loading ? 'Creating...' : 'Connect Data Sources'}{' '}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-12 text-center">
            <p className="text-slate-500">Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
