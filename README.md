# Unify - Institutional Memory Management Platform

> **Institutional memory that never graduates**

Unify is a full-stack MVP for institutional memory management, designed specifically for student organisations (ISocs/MSAs) facing 100% annual committee turnover. The platform fetches historical data from Google Workspace, Slack, and other sources, uses AI to extract insights, and presents searchable, role-specific intelligence.

## Project Overview

**Target Users:** New committee members who need to instantly understand:
- What events ran before
- What worked (and what didn't)
- Who to contact
- How to succeed in their role

**Core Value Proposition:** Stop starting from scratch every year - transform scattered emails and documents into organised institutional intelligence.

## Tech Stack

### Frontend
- **Framework:** Next.js 15.2.3 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Auth:** Clerk
- **Visualisation:**
  - Recharts (timeline/analytics)
  - React Flow (knowledge graph)
- **Date Handling:** date-fns

### Backend (To Be Built)
- Node.js + TypeScript
- Express.js / Fastify
- PostgreSQL (Supabase)
- Vector DB (Pinecone / Supabase Vector)
- OpenAI / Anthropic APIs

## Current Implementation Status

### ✅ Completed Features

#### 1. **Landing Page** (`/`)
- Hero section with clear value proposition
- Problem section explaining institutional amnesia
- Solution section showing 3-step workflow
- CTA sections and footer
- Responsive design

#### 2. **Authentication** (`/signin`, `/signup`)
- Clerk integration for OAuth
- Google and Microsoft sign-in options
- Protected routes via middleware
- User management

#### 3. **Onboarding Flow** (`/onboarding`)
- Multi-step form (3 steps)
- Organisation setup (name, type, size, founded year)
- Role selection
- Option to connect data sources or skip

#### 4. **Connect Page** (`/connect`)
- Data source connection cards:
  - Google Workspace
  - Microsoft 365
  - Slack
  - WhatsApp (file upload)
- Connection status display
- Sync progress indicators
- Redirect to dashboard after setup

#### 5. **Dashboard Layout** (`/dashboard`)
- **Header Component:**
  - Organisation name and logo
  - Global search bar (Cmd+K trigger)
  - Notifications and settings icons
  - User profile menu (Clerk UserButton)

- **Sidebar Navigation:**
  - Timeline (default view)
  - Search
  - Knowledge Graph
  - Briefings
  - Contacts
  - Insights
  - Settings
  - Connect Sources button

#### 6. **Timeline View** (`/dashboard`)
- Event cards showing:
  - Title, date, type
  - Attendance, fundraising stats
  - Star ratings
  - Budget information
- Filters:
  - Year selector (2019-2025)
  - Event type filter
- Summary statistics (total events, avg attendance, total raised)
- **Event Detail Modal:**
  - 5 tabs: Overview, Budget, People, Resources, Insights
  - Detailed event information
  - What worked / Challenges
  - Budget breakdown
  - Organisers and vendors
  - Related documents
  - Advice for next time

### 🚧 Partially Implemented

#### 7. **Search Page** (`/dashboard/search`)
- Structure created
- Ready for semantic search integration
- AI summary section prepared
- Result cards template ready

### 📋 To Be Built

The following pages need to be implemented:

#### 8. **Knowledge Graph** (`/dashboard/graph`)
- React Flow integration
- Visual relationship mapping
- Node types: People, Events, Organisations, Documents
- Interactive filtering

#### 9. **Briefings** (`/dashboard/briefings`)
- Role-based briefing generation
- AI-powered onboarding documents
- PDF download functionality

#### 10. **Contacts** (`/dashboard/contacts`)
- Vendor/partner/speaker database
- Contact cards with ratings
- Usage tracking
- Event history per contact

#### 11. **Insights** (`/dashboard/insights`)
- Recharts analytics
- Event success trends
- Budget performance
- Attendance patterns
- Fundraising growth

#### 12. **Settings** (`/dashboard/settings`)
- Organisation management
- Data source configuration
- Team invitations
- Privacy & security
- Billing (if applicable)

## Project Structure

```
unify-frontend/
├── app/
│   ├── (auth)/
│   │   ├── signin/page.tsx         # Sign-in page
│   │   └── signup/page.tsx         # Sign-up page
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard layout (header + sidebar)
│   │   ├── page.tsx                # Timeline view (default)
│   │   ├── search/                 # Search page (to build)
│   │   ├── graph/                  # Knowledge graph (to build)
│   │   ├── briefings/              # Briefings (to build)
│   │   ├── contacts/               # Contacts (to build)
│   │   ├── insights/               # Insights (to build)
│   │   └── settings/               # Settings (to build)
│   ├── onboarding/page.tsx         # Onboarding flow
│   ├── connect/page.tsx            # Data source connections
│   ├── layout.tsx                  # Root layout (Clerk provider)
│   ├── page.tsx                    # Landing page
│   └── globals.css                 # Global styles
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── dashboard/
│   │   ├── Header.tsx              # Dashboard header
│   │   └── Sidebar.tsx             # Dashboard sidebar
│   └── [feature-specific components]
├── lib/
│   ├── api.ts                      # API client functions
│   └── utils.ts                    # Utility functions
├── types/
│   └── index.ts                    # TypeScript interfaces
├── middleware.ts                   # Clerk auth middleware
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Clerk account (for authentication)
- Backend API running (see backend setup docs)

### Installation

1. **Clone the repository:**
   ```bash
   cd "unify v2"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

   Update with your values:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # API Backend
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## Design System

### Colour Palette
- **Primary:** Slate-700 (`slate-700`)
- **Accent:** Cyan-600 (`cyan-600`)
- **Background:** Slate-50 (light) / Slate-900 (dark)
- **Success:** Emerald-600
- **Warning:** Amber-600
- **Error:** Red-600

### Typography
- **Font:** Inter (via next/font/google)
- **Headings:** font-semibold
- **Body:** font-normal text-base
- **Code/data:** font-mono text-sm

### Code Standards
- All comments in UK English
- Variable/function names in UK English (e.g., `organisationData`, `colour`)
- Strict TypeScript (no `any` types)
- ARIA labels for accessibility
- Semantic HTML
- Keyboard navigation support

## API Integration

The frontend communicates with the backend via the `/lib/api.ts` client. All API functions are typed and handle authentication automatically.

### Example Usage

```typescript
import { api } from '@/lib/api';

// Fetch events
const events = await api.getTimelineEvents(2024);

// Search knowledge
const results = await api.searchKnowledge('How to book venues?');

// Generate briefing
const briefing = await api.generateBriefing('President');
```

## Authentication Flow

1. User visits `/` (landing page)
2. Click "Get Started Free" → `/signup`
3. Clerk OAuth (Google/Microsoft) or email signup
4. Redirect to `/onboarding`
5. Complete 3-step onboarding
6. Redirect to `/connect` (optional)
7. Finally to `/dashboard`

Protected routes require authentication via Clerk middleware.

## Development Notes

### Mock Data
Currently, the application uses mock data for development. Once the backend is ready:
1. Replace mock data in components with API calls
2. Update the API client with proper auth tokens
3. Handle loading and error states

### Pending Integrations
- [ ] Backend API connection
- [ ] Clerk auth token integration in API client
- [ ] Real data from backend
- [ ] OAuth callback handling for data sources
- [ ] File upload for WhatsApp chats
- [ ] Global search modal (Cmd+K) functionality

## Next Steps

### Immediate Priorities
1. **Build Backend API** - See backend prompt documentation
2. **Complete Search Page** - Semantic search + AI summaries
3. **Implement Contacts Page** - Vendor/partner management
4. **Build Briefings Generator** - AI-powered onboarding docs
5. **Add Insights Dashboard** - Recharts analytics

### Future Enhancements
- Knowledge Graph visualization
- Mobile responsiveness improvements
- Dark mode toggle
- Real-time sync status
- Notification system
- Team collaboration features
- Export functionality (PDF briefings, data exports)

## Troubleshooting

### Development Server Issues
If port 3000 is in use, Next.js will automatically try 3001. Check the console output for the actual port.

### Clerk Auth Issues
Ensure your Clerk publishable key is correctly set in `.env.local`. Check the Clerk dashboard for API key status.

### TypeScript Errors
Run `npm run build` to catch TypeScript errors before runtime.

## Contributing

This is an MVP project. Key areas for contribution:
- Complete remaining dashboard pages
- Add comprehensive error handling
- Improve loading states
- Add unit tests
- Enhance mobile responsiveness

## License

[Your License Here]

## Contact

For questions or support, please contact [your contact info].

---

**Built with ❤️ for student organisations everywhere**
