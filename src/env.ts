import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		CLERK_SECRET_KEY: z.string().min(1),
		DATABASE_URL: z.string().url(),
		DATABASE_TOKEN: z.string().min(1),
		UPLOADTHING_APP_ID: z.string().min(1),
		UPLOADTHING_SECRET: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
	},
	runtimeEnv: {
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		DATABASE_TOKEN: process.env.DATABASE_TOKEN,
		UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
		UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	},
});
