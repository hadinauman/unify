'use client';

import { useContext } from 'react';
import type { OrganisationTerminology } from '@/backend/src/types';

// Context would be provided by OrganisationProvider
// For now, we export a hook that returns default terminology

export function useTerminology(): OrganisationTerminology {
  // TODO: Get from context/organisation provider
  // For now, return defaults

  return {
    teamLabel: 'Team',
    memberLabel: 'Member',
    leaderLabel: 'Leader',
    eventLabel: 'Event',
    periodLabel: 'Year',
  };
}

export function useTerminologyForType(type: string): OrganisationTerminology {
  // Map organisation type to terminology
  const terminologyMap: Record<string, OrganisationTerminology> = {
    'student-isoc-msa': {
      teamLabel: 'Committee',
      memberLabel: 'Member',
      leaderLabel: 'President',
      eventLabel: 'Event',
      periodLabel: 'Academic Year',
    },
    'student-society': {
      teamLabel: 'Committee',
      memberLabel: 'Member',
      leaderLabel: 'President',
      eventLabel: 'Event',
      periodLabel: 'Academic Year',
    },
    'consulting-firm': {
      teamLabel: 'Team',
      memberLabel: 'Consultant',
      leaderLabel: 'Partner',
      eventLabel: 'Project',
      periodLabel: 'Fiscal Year',
    },
    'marketing-agency': {
      teamLabel: 'Team',
      memberLabel: 'Team Member',
      leaderLabel: 'Creative Director',
      eventLabel: 'Campaign',
      periodLabel: 'Year',
    },
    'creative-agency': {
      teamLabel: 'Studio',
      memberLabel: 'Creative',
      leaderLabel: 'Creative Director',
      eventLabel: 'Project',
      periodLabel: 'Year',
    },
    'nonprofit': {
      teamLabel: 'Team',
      memberLabel: 'Staff Member',
      leaderLabel: 'Executive Director',
      eventLabel: 'Programme',
      periodLabel: 'Year',
    },
    'restaurant': {
      teamLabel: 'Staff',
      memberLabel: 'Staff Member',
      leaderLabel: 'Manager',
      eventLabel: 'Service',
      periodLabel: 'Year',
    },
    'retail-store': {
      teamLabel: 'Team',
      memberLabel: 'Staff Member',
      leaderLabel: 'Store Manager',
      eventLabel: 'Campaign',
      periodLabel: 'Year',
    },
    'franchise': {
      teamLabel: 'Network',
      memberLabel: 'Franchisee',
      leaderLabel: 'Franchise Director',
      eventLabel: 'Initiative',
      periodLabel: 'Year',
    },
    'sales-team': {
      teamLabel: 'Team',
      memberLabel: 'Sales Representative',
      leaderLabel: 'Sales Manager',
      eventLabel: 'Campaign',
      periodLabel: 'Quarter',
    },
  };

  return (
    terminologyMap[type] || {
      teamLabel: 'Team',
      memberLabel: 'Member',
      leaderLabel: 'Leader',
      eventLabel: 'Event',
      periodLabel: 'Year',
    }
  );
}
