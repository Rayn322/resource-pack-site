import type { Config } from 'drizzle-kit';
// t3 env doesn't seem to work here
import 'dotenv/config';

export default {
	out: './drizzle',
	schema: './src/db/schema.ts',
	driver: 'mysql2',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL ?? '',
	},
} satisfies Config;
