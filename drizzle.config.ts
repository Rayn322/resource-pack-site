import type { Config } from 'drizzle-kit';
// t3 env doesn't seem to work here
import 'dotenv/config';

const config = {
	out: './drizzle',
	schema: './src/db/schema.ts',
	connectionString: process.env.DATABASE_URL,
} satisfies Config;

export default config;
