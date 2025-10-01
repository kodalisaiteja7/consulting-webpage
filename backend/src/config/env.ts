import dotenv from 'dotenv';

dotenv.config();

export const env = {
	port: Number(process.env.PORT || 4000),
	nodeEnv: process.env.NODE_ENV || 'development',
	corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
	mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/consulting_site',
	jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
	jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
	smtp: {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
		from: process.env.SMTP_FROM || 'Consulting Site <noreply@example.com>'
	}
};
