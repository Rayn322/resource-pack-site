import { SignIn, SignedOut, SignedIn } from '@clerk/nextjs';

export default function Page() {
	return <SignIn signUpUrl="/sign-up" />;
}
