import express from 'express';
import { AppDataSource } from './database/data-source';

import { router } from './router';

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(router);

    app.listen(process.env.PORT, () => {
      console.log(`🔥 Server started at http://localhost:${process.env.PORT}`);
    });
  });
