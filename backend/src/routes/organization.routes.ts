import express from 'express';
import { DatabaseService } from '../services/database.service';
import { OrganisationType } from '../types';

const router = express.Router();

// Get organisation by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const organisation = await DatabaseService.getOrganisation(id);

    if (!organisation) {
      return res.status(404).json({ error: 'Organisation not found' });
    }

    res.json(organisation);
  } catch (error) {
    console.error('Error fetching organisation:', error);
    res.status(500).json({ error: 'Failed to fetch organisation' });
  }
});

// Create new organisation
router.post('/', async (req, res) => {
  try {
    const { userId, name, type } = req.body;

    if (!userId || !name || !type) {
      return res.status(400).json({
        error: 'Missing required fields: userId, name, type'
      });
    }

    // Validate organisation type
    const validTypes = [
      'student-isoc-msa',
      'student-society',
      'consulting-firm',
      'marketing-agency',
      'creative-agency',
      'nonprofit',
      'restaurant',
      'retail-store',
      'franchise',
      'sales-team',
      'other'
    ];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid organisation type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    console.log(`🏢 Creating organisation: ${name} (type: ${type})`);

    const organisation = await DatabaseService.createOrganisation(
      userId,
      name,
      type as OrganisationType
    );

    if (!organisation) {
      return res.status(500).json({ error: 'Failed to create organisation' });
    }

    console.log(`✅ Organisation created: ${organisation.id}`);
    res.status(201).json(organisation);
  } catch (error) {
    console.error('Error creating organisation:', error);
    res.status(500).json({ error: 'Failed to create organisation' });
  }
});

// Get all organisations for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const organisations = await DatabaseService.getUserOrganisations(userId);

    res.json(organisations);
  } catch (error) {
    console.error('Error fetching user organisations:', error);
    res.status(500).json({ error: 'Failed to fetch organisations' });
  }
});

// Update organisation
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, metadata, terminology } = req.body;

    console.log(`📝 Updating organisation: ${id}`);

    const organisation = await DatabaseService.updateOrganisation(id, {
      name,
      metadata,
      terminology,
    });

    if (!organisation) {
      return res.status(404).json({ error: 'Organisation not found' });
    }

    console.log(`✅ Organisation updated: ${id}`);
    res.json(organisation);
  } catch (error) {
    console.error('Error updating organisation:', error);
    res.status(500).json({ error: 'Failed to update organisation' });
  }
});

export default router;
