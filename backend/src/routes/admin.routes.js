import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validateReport, getAllReports } from '../controllers/admin.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { validateReportSchema, adminReportsQuerySchema } from '../schemas/validation.schemas.js';

const router = Router();
router.use(authenticate);
router.use(authorize('ADMIN', 'MODERATOR'));

router.put('/reports/:id/validate', validate(validateReportSchema), validateReport);
router.get('/reports', validate(adminReportsQuerySchema, 'query'), getAllReports);

export default router;