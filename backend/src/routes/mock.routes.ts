import { Router } from 'express';
import { getMockJobs, getMockJobById, submitMockApplication } from '../controllers/mock.controller';

const router = Router();

// Mock job routes (works without database)
router.get('/jobs', getMockJobs);
router.get('/jobs/:id', getMockJobById);
router.post('/applications', submitMockApplication);

export default router;
