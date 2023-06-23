import { currentUser } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// would it be bad if i just used upload thing input instead of the other call...
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

export type OurFileRouter = typeof ourFileRouter;
