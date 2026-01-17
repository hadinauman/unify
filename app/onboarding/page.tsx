'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: '',
    membersCount: '',
    foundedYear: new Date().getFullYear().toString(),
    yourRole: '',
    committeeYear: '',
  });

  const handleSubmit = () => {
    // TODO: Save organisation data to backend
    // For now, redirect to connect page
    router.push('/connect');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Unify</CardTitle>
          <p className="text-slate-600 dark:text-slate-400">
            Let's set up your organisation
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
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="orgName">Organisation Name</Label>
                <Input
                  id="orgName"
                  placeholder="Trinity College Dublin ISoc"
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
                    setFormData({ ...formData, orgType: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="isoc">ISoc</SelectItem>
                    <SelectItem value="msa">MSA</SelectItem>
                    <SelectItem value="student-org">Student Organisation</SelectItem>
                    <SelectItem value="nonprofit">Nonprofit Chapter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="membersCount">Estimated Members</Label>
                <Select
                  value={formData.membersCount}
                  onValueChange={(value) =>
                    setFormData({ ...formData, membersCount: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<50">&lt; 50</SelectItem>
                    <SelectItem value="50-100">50-100</SelectItem>
                    <SelectItem value="100-200">100-200</SelectItem>
                    <SelectItem value="200+">200+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  placeholder="2020"
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
              <div>
                <Label htmlFor="yourRole">Your Committee Role</Label>
                <Select
                  value={formData.yourRole}
                  onValueChange={(value) =>
                    setFormData({ ...formData, yourRole: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="president">President</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="events">Events Coordinator</SelectItem>
                    <SelectItem value="social">Social Secretary</SelectItem>
                    <SelectItem value="publicity">Publicity Officer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="committeeYear">Committee Year</Label>
                <Input
                  id="committeeYear"
                  placeholder="2024-2025"
                  value={formData.committeeYear}
                  onChange={(e) =>
                    setFormData({ ...formData, committeeYear: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1"
                  disabled={!formData.yourRole}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
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
                >
                  Skip for now
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Connect Data Sources <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
