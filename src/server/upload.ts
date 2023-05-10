'use server';

import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { zact } from 'zact/server';
import { z } from 'zod';

export const uploadPack = zact(
	z.object({ name: z.string().nonempty(), description: z.string().nonempty() })
)(async ({ name, description }) => {
	let query = await db.insert(packs).values({
		name: name,
		description: description,
		userId: '1',
	});

	return { success: true, id: query.insertId };
});
