import { SignUp } from '@clerk/nextjs/app-beta';

export default function Page() {
	return (
		<div className="flex justify-center pt-12">
			<SignUp signInUrl="/sign-in" />
		</div>
	);
}
