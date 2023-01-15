import express from 'express';
import { AppDataSource } from './database/data-source';

import { router } from './routes';

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(router);

    app.listen(process.env.PORT, () => {
      console.log(`🔥 Server started at http://localhost:${process.env.PORT}`);
    });
  });
