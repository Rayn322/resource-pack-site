import { auth } from '@clerk/nextjs/server';
import {
	DEFAULT_SERVER_ERROR_MESSAGE,
	createSafeActionClient,
} from 'next-safe-action';

export const actionClient = createSafeActionClient({
	handleServerError(e) {
		if (e instanceof Error) {
			return e.message;
		}

		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
}).use(async ({ next }) => {
	const { userId } = auth();

	if (!userId) {
		throw new Error('User is not authenticated');
	}

	return next({ ctx: { userId } });
});
