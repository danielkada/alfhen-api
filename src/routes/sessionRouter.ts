import { Router } from 'express';

export const sessionRouter = Router();

sessionRouter.post('/sessions', ((req, res) => {
  res.json('Ola');
}));
