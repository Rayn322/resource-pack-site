'use server';

import { utapi } from '@/app/api/uploadthing/core';
import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function deletePack(id: number) {
	const pack = await db.query.packs.findFirst({
		where: eq(packs.id, id),
	});

	if (pack) {
		const url = new URL(pack.downloadUrl);
		const key = url.pathname.split('/').at(-1);

		if (key) {
			const { success } = await utapi.deleteFiles(key);
			if (success) {
				const result = await db.delete(packs).where(eq(packs.id, id));
			}
			console.log('Deleted pack:', pack.downloadUrl, 'success:', success);
		}
	}

	redirect('/packs');
}
