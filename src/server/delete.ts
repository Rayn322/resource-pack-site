'use server';

import { utapi } from '@/app/api/uploadthing/core';
import { db } from '@/db/db';
import { packs, versions } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { actionClient } from './safe-action';

export const deleteVersion = actionClient
	.schema(
		z.object({
			packId: z.number(),
			versionId: z.number(),
		}),
	)
	.action(async ({ parsedInput: { packId, versionId } }) => {
		const { userId } = auth();

		if (!userId) {
			return;
		}

		const pack = await db.query.packs.findFirst({
			where: eq(packs.id, packId),
			with: { versions: true },
		});

		if (userId != pack?.userId) {
			return;
		}

		const version = pack.versions.find((v) => v.id === versionId);

		if (!version) {
			return;
		}

		const success = await utapi.deleteFiles([version.fileKey]);

		if (success) {
			await db.delete(versions).where(eq(versions.id, versionId));
			revalidatePath(`/packs/${pack.id}`);
		}
	});
