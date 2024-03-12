import type { Config } from 'drizzle-kit';
import { env } from '@/env';

export default {
	schema: './src/db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: env.DATABASE_URL,
		authToken: env.DATABASE_TOKEN,
	},
} satisfies Config;
