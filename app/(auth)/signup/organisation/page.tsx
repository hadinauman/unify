import { SignUp } from '@clerk/nextjs';

export default function SignUpOrganisationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Create Your Organisation
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sign up as President to create a new organisation on Unify
          </p>
        </div>

        <SignUp
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-lg',
            },
          }}
          routing="path"
          path="/signup/organisation"
          signInUrl="/signin"
          afterSignUpUrl="/onboarding?type=organisation"
        />

        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-6">
          As President, you'll have full administrative access to manage your organisation.
        </p>
      </div>
    </div>
  );
}
