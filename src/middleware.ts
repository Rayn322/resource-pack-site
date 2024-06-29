import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/create(.*)']);

export default clerkMiddleware((auth, request) => {
	if (isProtectedRoute(request)) {
		auth().protect();
	}

	return NextResponse.next();
});

/*
export default authMiddleware({
	publicRoutes: [
		'/',
		'/packs',
		'/packs/:id',
		'/sign-in',
		'/sign-up',
		'/api/(.*)',
	],
	*/

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets.
	// stolen from Clerk docs
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
