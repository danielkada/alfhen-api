import { Router } from 'express';

import UserController from '../app/controllers/UserController';

import ensureAuthenticate from '../app/middlewares/ensureAuthenticate';

export const userRouter = Router();

userRouter.post('/users', UserController.store);

userRouter.get('/users', ensureAuthenticate, UserController.index);

userRouter.get('/users/:id', ensureAuthenticate, UserController.show);

userRouter.put('/users', ensureAuthenticate, UserController.update);

userRouter.delete('/users', ensureAuthenticate, UserController.delete);
