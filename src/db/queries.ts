import { desc, eq } from 'drizzle-orm';
import { db } from './db';
import { packs, versions } from './schema';

export async function getPackWithVersions(id: number) {
	const data = await db.query.packs.findFirst({
		where: eq(packs.id, id),
		with: {
			versions: true,
		},
	});

	return data;
}

export async function getLatestDownloadUrl(id: number) {
	const version = await db.query.versions.findFirst({
		where: eq(versions.packId, id),
		columns: { downloadUrl: true },
		orderBy: desc(versions.id),
	});

	return version?.downloadUrl;
}
