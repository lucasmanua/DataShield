import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { register, login } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { registerSchema, loginSchema } from '../schemas/validation.schemas.js';

const router = Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, please try again later.' }
});

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);

export default router;