import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { z } from 'zod';

const f = createUploadthing({
	errorFormatter: (err) => {
		return {
			message: err.message,
			zodError: err.cause instanceof z.ZodError ? err.cause.flatten() : null,
		};
	},
});

export const ourFileRouter = {
	packUploader: f({
		'application/zip': { maxFileCount: 1, maxFileSize: '64MB' },
	})
		.input(
			z.object({
				name: z.string().nonempty('Must have a name'),
				description: z.string().nonempty('Must have a description'),
			}),
		)
		.middleware(async ({ input, req }) => {
			const user = await currentUser();

			if (!user) {
				throw new Error('You must be signed in to upload a texture pack');
			}

			return { userId: user.id, input };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const query = await db.insert(packs).values({
				name: metadata.input.name,
				description: metadata.input.description,
				userId: metadata.userId,
				downloadUrl: file.url,
			});

			console.log('Created pack with id', query.insertId);
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
