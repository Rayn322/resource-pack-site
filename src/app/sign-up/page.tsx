import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className="flex justify-center pt-12">
			<SignUp signInUrl="/sign-in" />
		</div>
	);
}
