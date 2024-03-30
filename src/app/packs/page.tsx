import Card from '@/components/Card';
import { db } from '@/db/db';
import { packs } from '@/db/schema';

export default async function Packs() {
	const stuff = await db.select().from(packs).limit(20);
	console.log('found ', stuff.length, ' packs');

	return (
		<>
			<h1 className="text-3xl">Resource Packs</h1>
			<div className="mx-32 flex flex-wrap justify-center gap-4">
				{stuff.length > 0 ? (
					stuff.map((pack) => <Card key={pack.id} pack={pack} />)
				) : (
					<p>No packs found</p>
				)}
			</div>
		</>
	);
}
