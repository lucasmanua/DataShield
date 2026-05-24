import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { createReport, searchReports, publicSearch, getReport, getStats } from '../controllers/reports.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createReportSchema, searchReportsSchema } from '../schemas/validation.schemas.js';

const router = Router();

router.get('/stats', getStats);
router.get('/public/search', validate(searchReportsSchema, 'query'), publicSearch);

router.use(authenticate);

router.post('/', validate(createReportSchema), createReport);
router.get('/search', validate(searchReportsSchema, 'query'), searchReports);
router.get('/:id', getReport);

export default router;