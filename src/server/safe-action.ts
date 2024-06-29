import { auth } from '@clerk/nextjs/server';
import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient();

// export const authActionClient = actionClient.use(async ({ next, ctx }) => {
// 	const { userId } = auth();

// 	if (!userId) {
// 		return { error: 'Not logged in' };
// 	}

// 	return next({ ctx: userId });
// });
