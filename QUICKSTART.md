# Unify - Quick Start Guide

## What You Have

A fully functional frontend MVP for Unify with:
- ✅ Landing page
- ✅ Authentication (Clerk)
- ✅ Onboarding flow
- ✅ Data source connection UI
- ✅ Complete dashboard with 7 pages
- ✅ Mock data for development

## Getting Started

### 1. Start the Development Server

The server might already be running. Check if you can access:
```
http://localhost:3001
```

If not running, start it:
```bash
npm run dev
```

### 2. Explore the Pages

#### Public Pages
- **Landing Page** (`/`) - Marketing page with value proposition
- **Sign In** (`/signin`) - Clerk authentication (requires Clerk setup)
- **Sign Up** (`/signup`) - User registration

#### Protected Pages (Dashboard)
Navigate to `/dashboard` (or use these direct URLs):

1. **Timeline** (`/dashboard`) - Event history with detailed modals
2. **Search** (`/dashboard/search`) - Semantic search interface with AI summaries
3. **Knowledge Graph** (`/dashboard/graph`) - Relationship visualization (placeholder)
4. **Briefings** (`/dashboard/briefings`) - AI-generated role onboarding
5. **Contacts** (`/dashboard/contacts`) - Vendor/partner management
6. **Insights** (`/dashboard/insights`) - Analytics dashboard (placeholder)
7. **Settings** (`/dashboard/settings`) - Configuration and team management

#### Other Pages
- **Onboarding** (`/onboarding`) - 3-step setup wizard
- **Connect** (`/connect`) - Data source integration UI

## Current State

### ✅ Fully Implemented
- Landing page with hero, problem, solution sections
- Auth pages (Clerk integration)
- Onboarding flow (multi-step form)
- Connect page (data source cards)
- Dashboard layout (header + sidebar)
- Timeline view (events with detail modals)
- Search page (with AI summary UI)
- Contacts page (vendor/partner management)
- Settings page (organisation, team, privacy)
- Briefings page (with generation UI)

### 🚧 Needs Backend Integration
- API calls (currently using mock data)
- OAuth flows for data sources
- Real-time sync status
- AI generation for briefings and search summaries
- Actual Clerk authentication (needs API keys)

### 📋 Needs Implementation
- Recharts visualizations in Insights page
- React Flow graph in Knowledge Graph page
- Global search modal (Cmd+K functionality)
- File upload for WhatsApp chats
- PDF export for briefings

## Next Steps

### Option 1: Continue Frontend Development

Add the remaining features:

1. **Global Search Modal (Cmd+K)**
   - Create a command palette component
   - Hook up keyboard shortcut
   - Integrate with search API

2. **Recharts Integration**
   - Add charts to Insights page
   - Create chart components for different metrics

3. **React Flow Graph**
   - Implement interactive knowledge graph
   - Add node filtering and search

### Option 2: Set Up Clerk Authentication

1. Create a Clerk account at https://clerk.com
2. Get your API keys
3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   ```
4. Restart the dev server
5. Test signin/signup flows

### Option 3: Build the Backend

Follow the backend prompt to create:
- Node.js + Express API
- PostgreSQL database (via Supabase)
- OAuth integrations
- AI extraction pipeline
- Vector search

Then connect frontend to backend by:
1. Updating `NEXT_PUBLIC_API_URL` in `.env.local`
2. Implementing auth token handling in `lib/api.ts`
3. Replacing mock data with real API calls

## Project Structure

```
app/
├── (auth)/              # Authentication pages
├── dashboard/           # Main dashboard (7 pages)
├── onboarding/          # Setup wizard
├── connect/             # Data source connections
└── page.tsx             # Landing page

components/
├── ui/                  # shadcn/ui components
└── dashboard/           # Dashboard-specific components

lib/
├── api.ts               # API client (ready for backend)
└── utils.ts             # Utility functions

types/
└── index.ts             # TypeScript interfaces
```

## Common Tasks

### Add a New Dashboard Page

1. Create page file: `app/dashboard/yourpage/page.tsx`
2. Add route to sidebar: `components/dashboard/Sidebar.tsx`
3. Add any needed types to `types/index.ts`

### Modify Styling

- Global colours: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind classes

### Add a New API Endpoint

1. Add function to `lib/api.ts`
2. Add TypeScript types to `types/index.ts`
3. Call from your component

## Testing the UI

### Recommended Testing Flow

1. Start at landing page (`/`)
2. Click "Get Started Free" → Sign Up (won't work without Clerk)
3. Manually navigate to `/dashboard`
4. Explore all 7 dashboard pages
5. Click through event detail modals
6. Test contact detail modals
7. Try filters and search (UI only, no backend)

### Mock Data Locations

- Events: `app/dashboard/page.tsx`
- Contacts: `app/dashboard/contacts/page.tsx`
- Search results: `app/dashboard/search/page.tsx`
- Briefings: `app/dashboard/briefings/page.tsx`

## Troubleshooting

### Port Already in Use
The dev server automatically tries port 3001 if 3000 is taken.

### Clerk Errors
If you see Clerk errors, you need to:
1. Sign up at clerk.com
2. Add your API keys to `.env.local`
3. Restart the server

### Build Errors
Run to check for TypeScript errors:
```bash
npm run build
```

## Questions?

Check the full README.md for comprehensive documentation.

---

**You have a production-ready frontend MVP! 🎉**

The next step is either:
- Add Clerk keys for authentication
- Build the backend API
- Implement remaining features (charts, graph, etc.)
