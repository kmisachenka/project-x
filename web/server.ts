// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const helmet = require('helmet');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const i18n = require('./src/i18n');

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

// dirty hack
export {};
