'use client';

import type { uploadPackType } from '@/server/upload';
import { uploadFiles } from '@/utils/uploadthing';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function UploadForm({
	uploadPack,
}: {
	uploadPack: uploadPackType;
}) {
	const [error, setError] = useState<string | null>(null);
	const { pending } = useFormStatus();

	return (
		<>
			<form
				action={async (formData) => {
					/*
						Consider using the useUploadThing hook instead of this and calling
						the server action on onClientUploadComplete.
						Also improves error handling.
					*/
					const file = formData.get('file') as File;
					formData.delete('file');

					if (!file || file.size === 0) {
						setError('No file selected');
					} else if (
						file.type !== 'application/zip' &&
						file.type !== 'application/x-zip-compressed'
					) {
						setError('File must be a zip');
					} else {
						setError(null);

						const newFile = new File([file], file.name, {
							type: 'application/zip',
						});

						const [res] = await uploadFiles({
							files: [newFile],
							endpoint: 'packUploader',
						});

						formData.append('url', res.fileUrl);
						const data = await uploadPack(formData);

						if (data.error) {
							setError(data.error);
						}
					}
				}}
				className="flex flex-col gap-2 rounded border border-black p-4 shadow"
			>
				<div className="flex items-center justify-between gap-2">
					<label htmlFor="name" className="w-full text-center">
						Name
					</label>
					<input type="text" name="name" className="rounded" />
				</div>
				<div className="flex items-center justify-between gap-2">
					<label htmlFor="description" className="w-full text-center">
						Description
					</label>
					<input type="text" name="description" className="rounded" />
				</div>
				{/* ugly for now whatever */}
				<div className="flex items-center justify-between gap-2">
					<input
						type="file"
						name="file"
						accept=".zip"
						className="rounded border border-gray-500 p-2 file:rounded file:border file:border-solid file:border-black file:bg-transparent"
					/>
				</div>

				<button
					type="submit"
					className="rounded border-2 border-emerald-500 p-2 disabled:bg-gray-200"
					disabled={pending}
				>
					Submit
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
		</>
	);
}
