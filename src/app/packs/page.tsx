import Card from '@/components/Card';

export default function Packs() {
	return (
		<main className="flex flex-col items-center justify-between gap-8 p-12">
			<h1 className="text-3xl">Resource Packs</h1>
			<div className="mx-32 flex flex-wrap justify-center gap-4">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</main>
	);
}
