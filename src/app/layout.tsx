import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Resource Packs',
	description: 'Store and download Minecraft resource packs',
};

function SignInButton() {
	return (
		<>
			<SignedIn>
				<UserButton
					// doesn't show sign in button after signing out so just redirect for now
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: 'w-10 h-10',
						},
					}}
				/>
			</SignedIn>
			<SignedOut>
				<Link
					href={'/sign-in'}
					className="rounded-lg border-2 border-white p-2"
				>
					Sign In
				</Link>
			</SignedOut>
		</>
	);
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<ClerkProvider
				appearance={{
					variables: {
						colorPrimary: '#10B981',
					},
				}}
			>
				<body className={inter.className}>
					<div className="flex items-center justify-between bg-emerald-500 p-4 text-white">
						<div>
							<Link href={'/'} className="text-xl">
								Resource Packs
							</Link>
						</div>
						<div className="flex items-center gap-4">
							<Link
								href={'/packs'}
								className="rounded-lg border-2 border-white p-2"
							>
								Packs
							</Link>
							<Link
								href={'/upload'}
								className="rounded-lg border-2 border-white p-2"
							>
								Upload
							</Link>
							<SignInButton />
						</div>
					</div>
					<main className="flex flex-col items-center justify-between gap-8 p-12">
						{children}
					</main>
				</body>
			</ClerkProvider>
		</html>
	);
}
