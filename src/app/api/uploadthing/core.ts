import { db } from '@/db/db';
import { versions } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
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
			const user = await currentUser();

			if (!user) throw new UploadThingError('Unauthorized');

			return { userId: user.id, ...input };
		})
		.onUploadComplete(async ({ file, metadata }) => {
			console.log('Upload complete for userId:', metadata.userId);

			await db.insert(versions).values({
				packId: metadata.packId,
				version: metadata.version,
				mcVersion: metadata.mcVersion,
				changelog: metadata.changelog,
				fileKey: file.key,
				downloadUrl: file.url,
			});

			revalidatePath(`/packs/${metadata.packId}`);
		}),
} satisfies FileRouter;

export const utapi = new UTApi();

export type OurFileRouter = typeof ourFileRouter;
