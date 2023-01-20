import { Router } from 'express';

import BooksAPIController from '../service/controllers/BooksAPIController';

export const bookRouter = Router();

bookRouter.get('/books/id/:id', BooksAPIController.findById);
bookRouter.get('/books/name/:title', BooksAPIController.findByName);
