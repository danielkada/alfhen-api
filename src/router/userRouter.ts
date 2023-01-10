import { Router } from 'express';

export const userRouter = Router();

userRouter.get('/users/:userId', (request, response) => {
  return response.json({ message: 'create!'});
});

userRouter.put('/users', (request, response) => {
  return response.json({ message: 'update'});
});

userRouter.delete('/users', (request, response) => {
  return response.json({ message: 'delete'});
});
