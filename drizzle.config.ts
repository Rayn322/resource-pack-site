import type { Config } from 'drizzle-kit';
// t3 env doesn't seem to work here
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // file name when using vercel env pull

export default {
	out: './drizzle',
	schema: './src/db/schema.ts',
	driver: 'mysql2',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL ?? '',
	},
} satisfies Config;
