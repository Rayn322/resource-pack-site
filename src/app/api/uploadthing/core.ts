import { db } from '@/db/db';
import { versions } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UTApi, UploadThingError } from 'uploadthing/server';
import { z } from 'zod';

const f = createUploadthing();

export const ourFileRouter = {
	packUploader: f({
		'application/zip': { maxFileCount: 1, maxFileSize: '64MB' },
	})
		.input(
			z.object({
				packId: z.number(),
				version: z.string().min(1),
				mcVersion: z.string().min(1),
				changelog: z.string().min(1),
			}),
		)
		.middleware(async ({ input }) => {
			const { userId } = auth();

			if (!userId) throw new UploadThingError('Unauthorized');

			return { userId: userId, ...input };
		})
		.onUploadComplete(async ({ file, metadata }) => {
			await db.insert(versions).values({
				packId: metadata.packId,
				version: metadata.version,
				mcVersion: metadata.mcVersion,
				changelog: metadata.changelog,
				fileKey: file.key,
				downloadUrl: file.url,
			});

			revalidatePath(`/packs/${metadata.packId}`);
			revalidatePath(`/api/pack/${metadata.packId}`);
			revalidatePath(`/api/pack/${metadata.packId}/download`);
		}),
} satisfies FileRouter;

export const utapi = new UTApi();

export type OurFileRouter = typeof ourFileRouter;
