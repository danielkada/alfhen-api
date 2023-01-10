import express from 'express';

import { router } from './router';

const app = express();

app.use(router);

const port = 3001;

app.listen(3001, () => {
  console.log(`🔥 Server started at http://localhost:${port}`);
});
