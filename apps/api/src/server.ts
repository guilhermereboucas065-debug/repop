import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { authRoutes } from './modules/auth/routes.js';
import { formsRoutes } from './modules/forms/routes.js';
import { responsesRoutes } from './modules/responses/routes.js';

const app = express();

app.use(cors({ origin: env.frontendUrl }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/auth', authRoutes);
app.use('/forms', formsRoutes);
app.use('/', responsesRoutes);

app.listen(env.port, () => {
  console.log(`API running on port ${env.port}`);
});
