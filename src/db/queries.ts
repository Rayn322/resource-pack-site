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

	console.log('RAN WITH DATA', data);
	console.log(new Date().toISOString());

	return data;
}

// export const getPackWithVersions = cache(async (id: number) => {
// 	return await db.query.packs.findFirst({
// 		where: eq(packs.id, id),
// 		with: {
// 			versions: true,
// 		},
// 	});
// });
