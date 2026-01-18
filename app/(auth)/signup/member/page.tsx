import { SignUp } from '@clerk/nextjs';

export default function SignUpMemberPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Join Your Organisation
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sign up to join an existing organisation on Unify
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
          path="/signup/member"
          signInUrl="/signin"
          afterSignUpUrl="/onboarding?type=member"
        />

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200 text-center">
            ⚠️ Your request will be sent to the President for approval
          </p>
        </div>
      </div>
    </div>
  );
}
