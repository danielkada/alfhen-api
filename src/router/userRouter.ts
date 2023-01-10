import { Router } from 'express';

export const userRouter = Router();

userRouter.get('/users/:userId', (request, response) => {
    return response.json({ message: 'Hello World!'});
});

userRouter.post('/users', (request, response) => {
    return response.json({ message: 'Hello World!'});
});
