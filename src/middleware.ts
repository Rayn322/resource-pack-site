import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
	publicRoutes: [
		'/',
		'/packs',
		'/packs/:id',
		'/sign-in',
		'/sign-up',
		'/api/(.*)',
	],
	afterAuth: (auth, req) => {
		if (!auth.sessionId && !auth.isPublicRoute) {
			const url = req.nextUrl.clone();
			url.pathname = '/sign-in';
			return NextResponse.redirect(url);
		}
	},
});

export const config = {
	// matcher: ['/((?!.*\\..*|_next).*)', '/'],
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
