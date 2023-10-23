import { currentUser } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UTApi } from 'uploadthing/server';

const f = createUploadthing();

export const ourFileRouter = {
	packUploader: f({
		'application/zip': { maxFileCount: 1, maxFileSize: '64MB' },
	})
		.middleware(async () => {
			const user = await currentUser();

			if (!user) throw new Error('Unauthorized');

			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);

			console.log('file url', file.url);
		}),
} satisfies FileRouter;

export const utapi = new UTApi();

export type OurFileRouter = typeof ourFileRouter;
