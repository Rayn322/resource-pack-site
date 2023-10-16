import type { Config } from 'drizzle-kit';
import { env } from '@/env.mjs';

export default {
	schema: './src/db/schema.ts',
	driver: 'mysql2',
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
} satisfies Config;
