'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
import type { Organisation } from '@/backend/src/types';

interface OrganisationContextType {
  currentOrganisation: Organisation | null;
  userOrganisations: Organisation[];
  setCurrentOrganisation: (org: Organisation | null) => void;
  loadingOrganisations: boolean;
  error: string | null;
}

const OrganisationContext = createContext<OrganisationContextType | undefined>(
  undefined
);

export function OrganisationProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const [currentOrganisation, setCurrentOrganisation] = useState<Organisation | null>(null);
  const [userOrganisations, setUserOrganisations] = useState<Organisation[]>([]);
  const [loadingOrganisations, setLoadingOrganisations] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user's organisations when user is authenticated
  useEffect(() => {
    if (!isLoaded || !user?.id) {
      return;
    }

    const loadOrganisations = async () => {
      setLoadingOrganisations(true);
      setError(null);

      try {
        const response = await fetch(`/api/organisations?userId=${user.id}`);

        if (!response.ok) {
          throw new Error('Failed to load organisations');
        }

        const organisations = await response.json();
        setUserOrganisations(organisations);

        // Try to restore last selected organisation from localStorage
        const savedOrgId = localStorage.getItem('currentOrganisationId');
        if (savedOrgId && organisations.length > 0) {
          const saved = organisations.find((org: Organisation) => org.id === savedOrgId);
          if (saved) {
            setCurrentOrganisation(saved);
            return;
          }
        }

        // If no saved organisation, set first one
        if (organisations.length > 0) {
          setCurrentOrganisation(organisations[0]);
          localStorage.setItem('currentOrganisationId', organisations[0].id);
        }
      } catch (err) {
        console.error('Error loading organisations:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load organisations'
        );
      } finally {
        setLoadingOrganisations(false);
      }
    };

    loadOrganisations();
  }, [isLoaded, user?.id]);

  const handleSetCurrentOrganisation = (org: Organisation | null) => {
    setCurrentOrganisation(org);
    if (org) {
      localStorage.setItem('currentOrganisationId', org.id);
    } else {
      localStorage.removeItem('currentOrganisationId');
    }
  };

  return (
    <OrganisationContext.Provider
      value={{
        currentOrganisation,
        userOrganisations,
        setCurrentOrganisation: handleSetCurrentOrganisation,
        loadingOrganisations,
        error,
      }}
    >
      {children}
    </OrganisationContext.Provider>
  );
}

export function useOrganisation() {
  const context = useContext(OrganisationContext);
  if (context === undefined) {
    throw new Error('useOrganisation must be used within OrganisationProvider');
  }
  return context;
}
