import { Router } from 'express';
import UserController from '../app/controllers/UserController';

export const userRouter = Router();

userRouter.get('/users', UserController.index);

userRouter.post('/users', UserController.store);

userRouter.get('/users/:id', UserController.show);

userRouter.put('/users/:id', UserController.update);

userRouter.delete('/users/:id', UserController.delete);
