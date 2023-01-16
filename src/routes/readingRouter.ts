import { Router } from 'express';
import ReadingController from '../app/controllers/ReadingController';
import ensureAuthenticate from '../app/middlewares/ensureAuthenticate';

export const readingRouter = Router();

readingRouter.get('/readings', ensureAuthenticate, ReadingController.index);

readingRouter.get('/readings/:id', ensureAuthenticate, ReadingController.show);

readingRouter.post('/readings', ensureAuthenticate, ReadingController.store);

readingRouter.patch('/readings/:id', ensureAuthenticate, ReadingController.update);

readingRouter.delete('/readings/:id', ensureAuthenticate, ReadingController.delete);
