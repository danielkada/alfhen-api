import { Router } from 'express';

import { sessionRouter } from './sessionRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use(userRouter);
router.use(sessionRouter);
