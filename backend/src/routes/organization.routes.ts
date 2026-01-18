import express from 'express';
import { demoOrganization } from '../services/demoData';

const router = express.Router();

// Get organization details
router.get('/', (req, res) => {
  res.json(demoOrganization);
});

// Update organization (demo - returns merged data)
router.patch('/', (req, res) => {
  const updatedOrg = {
    ...demoOrganization,
    ...req.body,
  };

  console.log('🏢 Organization updated (demo mode):', updatedOrg.name);
  res.json(updatedOrg);
});

export default router;
