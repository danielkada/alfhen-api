import { Router } from 'express';
import BookController from '../app/service/controllers/APIBookGoogle';

export const bookRouter = Router();

bookRouter.get('/books/id/:id', BookController.findById);
