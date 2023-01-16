import { Router } from 'express';
import { readingRouter } from './readingRouter';

import { sessionRouter } from './sessionRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use(userRouter);
router.use(sessionRouter);
router.use(readingRouter);
