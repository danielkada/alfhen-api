import { Router } from 'express';
import { bookRouter } from './bookRouter';
import { readingRouter } from './readingRouter';

import { sessionRouter } from './sessionRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use(userRouter);
router.use(sessionRouter);
router.use(readingRouter);
router.use(bookRouter);
