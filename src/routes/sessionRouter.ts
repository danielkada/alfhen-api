import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';

export const sessionRouter = Router();

sessionRouter.post('/sessions', SessionController.handle);
