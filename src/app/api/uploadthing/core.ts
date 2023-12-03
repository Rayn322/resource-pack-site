import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UTApi } from 'uploadthing/server';
import { z } from 'zod';

const f = createUploadthing();

export const ourFileRouter = {
	packUploader: f({
		'application/zip': { maxFileCount: 1, maxFileSize: '64MB' },
	})
		.input(
			z.object({
				name: z.string().min(1),
				description: z.string().min(1),
			}),
		)
		.middleware(async ({ input }) => {
			const user = await currentUser();

			if (!user) throw new Error('Unauthorized');

			return { userId: user.id, ...input };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);

			const query = await db.insert(packs).values({
				name: metadata.name,
				description: metadata.description,
				userId: metadata.userId,
				downloadUrl: file.url,
			});

			return { id: query.insertId };
		}),
} satisfies FileRouter;

export const utapi = new UTApi();

export type OurFileRouter = typeof ourFileRouter;
