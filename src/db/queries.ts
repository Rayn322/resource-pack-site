import { eq } from 'drizzle-orm';
import { cache } from 'react';
import { db } from './db';
import { packs } from './schema';

export const getPackWithVersions = cache(async (id: number) => {
	return await db.query.packs.findFirst({
		where: eq(packs.id, id),
		with: {
			versions: true,
		},
	});
});
