import { Router } from 'express';
import BookController from '../app/service/controllers/BookController';

export const bookRouter = Router();

bookRouter.get('/books/id/:id', BookController.findById);
