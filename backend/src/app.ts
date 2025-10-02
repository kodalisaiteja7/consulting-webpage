import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { env } from './config/env';
import { jobsRouter } from './routes/jobs.routes';
import { applicationsRouter } from './routes/applications.routes';
import { adminRouter } from './routes/admin.routes';
import mockRoutes from './routes/mock.routes';
import { errorHandler } from './middleware/errorHandler';
import { requireDbReady } from './middleware/dbReady';

const app = express();

app.set('trust proxy', 1);

app.use(cors({ 
	origin: env.corsOrigin ? [env.corsOrigin, 'http://localhost:5173', 'http://localhost:5174'] : ['http://localhost:5173', 'http://localhost:5174'], 
	credentials: true 
}));
app.use(helmet());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 });
app.use('/api', limiter);

app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

// Mock routes (work without DB)
app.use('/api/mock', mockRoutes);

// Routes (require DB connection)
app.use('/api', requireDbReady);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/admin', adminRouter);

app.use((req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

export default app;
