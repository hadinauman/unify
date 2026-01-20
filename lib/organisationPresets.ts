import type { OrganisationType, OrganisationTerminology } from '@/backend/src/types';

export interface OrganisationPreset {
  displayName: string;
  description: string;
  icon: string;  // emoji or icon name
  terminology: OrganisationTerminology;
  defaultRoles: string[];
  eventTypes: string[];
}

export const organisationPresets: Record<OrganisationType, OrganisationPreset> = {
  'student-isoc-msa': {
    displayName: 'Student Society',
    description: 'Student clubs and societies (including ISocs, MSAs, and general clubs)',
    icon: '🎓',
    terminology: {
      teamLabel: 'Committee',
      memberLabel: 'Member',
      leaderLabel: 'President',
      eventLabel: 'Event',
      periodLabel: 'Academic Year',
    },
    defaultRoles: [
      'President',
      'Vice President',
      'Treasurer',
      'Secretary',
      'Events Co-ordinator',
      'Social Secretary',
      'Publicity Officer',
    ],
    eventTypes: [
      'social',
      'educational',
      'religious',
      'fundraiser',
      'outreach',
      'competition',
      'weekly-meeting',
    ],
  },

  'student-society': {
    displayName: 'Student Society',
    description: 'General student clubs and societies',
    icon: '🎓',
    terminology: {
      teamLabel: 'Committee',
      memberLabel: 'Member',
      leaderLabel: 'President',
      eventLabel: 'Event',
      periodLabel: 'Academic Year',
    },
    defaultRoles: [
      'President',
      'Vice President',
      'Treasurer',
      'Secretary',
      'Events Officer',
    ],
    eventTypes: [
      'social',
      'educational',
      'fundraiser',
      'competition',
      'meeting',
    ],
  },

  'consulting-firm': {
    displayName: 'Consulting Firm',
    description: 'Professional services and consulting companies',
    icon: '💼',
    terminology: {
      teamLabel: 'Team',
      memberLabel: 'Consultant',
      leaderLabel: 'Partner',
      eventLabel: 'Project',
      periodLabel: 'Fiscal Year',
    },
    defaultRoles: [
      'Managing Partner',
      'Partner',
      'Senior Consultant',
      'Consultant',
      'Analyst',
      'Project Manager',
    ],
    eventTypes: [
      'client-project',
      'proposal',
      'workshop',
      'research',
      'internal-training',
    ],
  },

  'marketing-agency': {
    displayName: 'Marketing/Creative Agency',
    description: 'Advertising, marketing, and creative agencies',
    icon: '📢',
    terminology: {
      teamLabel: 'Team',
      memberLabel: 'Team Member',
      leaderLabel: 'Creative Director',
      eventLabel: 'Campaign',
      periodLabel: 'Year',
    },
    defaultRoles: [
      'Creative Director',
      'Account Manager',
      'Copywriter',
      'Designer',
      'Strategist',
      'Media Planner',
    ],
    eventTypes: [
      'campaign',
      'pitch',
      'photoshoot',
      'client-presentation',
      'brand-launch',
    ],
  },

  'creative-agency': {
    displayName: 'Creative Agency',
    description: 'Design, development, and creative studios',
    icon: '🎨',
    terminology: {
      teamLabel: 'Studio',
      memberLabel: 'Creative',
      leaderLabel: 'Creative Director',
      eventLabel: 'Project',
      periodLabel: 'Year',
    },
    defaultRoles: [
      'Creative Director',
      'Lead Designer',
      'Designer',
      'Developer',
      'Project Manager',
    ],
    eventTypes: [
      'project',
      'client-delivery',
      'pitch',
      'workshop',
      'design-sprint',
    ],
  },

  'nonprofit': {
    displayName: 'Nonprofit Organisation',
    description: 'Charitable organisations and NGOs',
    icon: '❤️',
    terminology: {
      teamLabel: 'Team',
      memberLabel: 'Staff Member',
      leaderLabel: 'Executive Director',
      eventLabel: 'Programme',
      periodLabel: 'Year',
    },
    defaultRoles: [
      'Executive Director',
      'Programme Director',
      'Development Director',
      'Volunteer Co-ordinator',
      'Grant Writer',
    ],
    eventTypes: [
      'fundraiser',
      'programme',
      'outreach',
      'volunteer-event',
      'gala',
    ],
  },

  'restaurant': {
    displayName: 'Restaurant/Hospitality',
    description: 'Restaurants, cafes, and hospitality businesses',
    icon: '🍽️',
    terminology: {
      teamLabel: 'Staff',
      memberLabel: 'Staff Member',
      leaderLabel: 'Manager',
      eventLabel: 'Service',
      periodLabel: 'Year',
    },
    defaultRoles: [
      'General Manager',
      'Head Chef',
      'Sous Chef',
      'Front of House Manager',
      'Server',
      'Kitchen Staff',
    ],
    eventTypes: [
      'service',
      'special-event',
      'catering',
      'menu-change',
      'training',
    ],
  },

  'retail-store': {
    displayName: 'Retail Store',
    description: 'Retail shops and boutiques',
    icon: '🛍️',
    terminology: {
      teamLabel: 'Team',
      memberLabel: 'Staff Member',
      leaderLabel: 'Store Manager',
      eventLabel: 'Campaign',
      periodLabel: 'Year',
    },
    defaultRoles: [
      'Store Manager',
      'Assistant Manager',
      'Department Lead',
      'Sales Associate',
      'Stock Team',
    ],
    eventTypes: [
      'promotion',
      'inventory-event',
      'training',
      'store-event',
      'seasonal-campaign',
    ],
  },

  'franchise': {
    displayName: 'Franchise Network',
    description: 'Franchise businesses and networks',
    icon: '🏢',
    terminology: {
      teamLabel: 'Network',
      memberLabel: 'Franchisee',
      leaderLabel: 'Franchise Director',
      eventLabel: 'Initiative',
      periodLabel: 'Year',
    },
    defaultRoles: [
      'Franchise Director',
      'Regional Manager',
      'Franchisee',
      'Support Manager',
    ],
    eventTypes: [
      'franchise-event',
      'training-session',
      'regional-meeting',
      'new-location',
    ],
  },

  'sales-team': {
    displayName: 'Sales Organisation',
    description: 'Sales departments and teams',
    icon: '📈',
    terminology: {
      teamLabel: 'Team',
      memberLabel: 'Sales Representative',
      leaderLabel: 'Sales Manager',
      eventLabel: 'Campaign',
      periodLabel: 'Quarter',
    },
    defaultRoles: [
      'Sales Manager',
      'Account Executive',
      'Sales Representative',
      'Business Development Manager',
    ],
    eventTypes: [
      'campaign',
      'client-meeting',
      'pitch',
      'training',
      'conference',
    ],
  },

  'other': {
    displayName: 'Other Organisation',
    description: 'Generic organisation type',
    icon: '🏛️',
    terminology: {
      teamLabel: 'Team',
      memberLabel: 'Member',
      leaderLabel: 'Leader',
      eventLabel: 'Event',
      periodLabel: 'Year',
    },
    defaultRoles: ['Leader', 'Member'],
    eventTypes: ['event', 'meeting', 'project'],
  },
};

export function getOrganisationPreset(type: OrganisationType): OrganisationPreset {
  return organisationPresets[type] || organisationPresets.other;
}

export function getAllOrganisationTypes(): Array<{
  type: OrganisationType;
  preset: OrganisationPreset;
}> {
  return Object.entries(organisationPresets).map(([type, preset]) => ({
    type: type as OrganisationType,
    preset,
  }));
}
