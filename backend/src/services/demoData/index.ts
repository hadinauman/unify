import type { OrganisationType } from '../../types';
import { consultingFirmDemo } from './consultingFirmDemo';
import { marketingAgencyDemo } from './marketingAgencyDemo';
import { restaurantDemo } from './restaurantDemo';
import {
  demoOrganization,
  demoEvents,
  demoContacts,
  demoDocuments,
} from '../demoData';

export interface DemoDataSet {
  organisation: any;
  events: any[];
  contacts: any[];
  documents: any[];
}

// TCD MSA data from the main demoData.ts file
const tcdMsaDemo: DemoDataSet = {
  organisation: demoOrganization,
  events: demoEvents,
  contacts: demoContacts,
  documents: demoDocuments,
};

const demoDatSets: Record<OrganisationType, DemoDataSet> = {
  'student-isoc-msa': tcdMsaDemo,
  'student-society': tcdMsaDemo,
  'consulting-firm': consultingFirmDemo,
  'marketing-agency': marketingAgencyDemo,
  'creative-agency': marketingAgencyDemo, // Reuse marketing agency demo
  'nonprofit': tcdMsaDemo, // Use student org as base for nonprofit
  'restaurant': restaurantDemo,
  'retail-store': restaurantDemo, // Reuse restaurant demo
  'franchise': consultingFirmDemo, // Reuse consulting demo
  'sales-team': consultingFirmDemo, // Reuse consulting demo
  'other': tcdMsaDemo, // Default to student org
};

export function getDemoDataSet(orgType: OrganisationType): DemoDataSet {
  return demoDatSets[orgType] || tcdMsaDemo;
}

export function getAllDemoDataSets(): Record<OrganisationType, DemoDataSet> {
  return demoDatSets;
}

// Export all individual demo datasets
export { consultingFirmDemo } from './consultingFirmDemo';
export { marketingAgencyDemo } from './marketingAgencyDemo';
export { restaurantDemo } from './restaurantDemo';
