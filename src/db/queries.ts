import { eq } from 'drizzle-orm';
import { db } from './db';
import { packs } from './schema';

export async function getPackWithVersions(id: number) {
	const data = await db.query.packs.findFirst({
		where: eq(packs.id, id),
		with: {
			versions: true,
		},
	});

	return data;
}
