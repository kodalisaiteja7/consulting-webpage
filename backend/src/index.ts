import app from './app';
import { connectToDatabase } from './config/db';
import { env } from './config/env';

async function bootstrap() {
	await connectToDatabase();
	app.listen(env.port, () => {
		console.log(`Server running on http://localhost:${env.port}`);
	});
}

bootstrap();
