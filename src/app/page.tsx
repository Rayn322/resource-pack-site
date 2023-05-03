import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between p-24">
			<h1 className="text-3xl">Hello</h1>
		</main>
	);
}
