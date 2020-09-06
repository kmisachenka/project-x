import express from 'express';
import helmet from 'helmet';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';

import { i18n } from './src/i18n';

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(helmet());
  server.use(nextI18NextMiddleware(i18n));

  server.get('*', (request, response) => handle(request, response));

  await server.listen(port);
  console.log(`🚀 web ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
