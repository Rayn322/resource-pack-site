'use client';

import { useUploadThing } from '@/utils/uploadthing';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function UploadForm() {
	const [error, setError] = useState<string | null>(null);
	const { isUploading, startUpload } = useUploadThing('packUploader', {
		onUploadProgress(p) {
			console.log(p);
		},
		onClientUploadComplete() {
			redirect('/packs');
		},
		onUploadError(error) {
			const fieldErrors = error.data?.zodError?.fieldErrors;

			setError(
				fieldErrors?.name?.at(0) ??
					fieldErrors?.description?.at(0) ??
					'Unknown error',
			);
		},
	});

	return (
		<>
			<form
				action={async (formData) => {
					const file = formData.get('file') as File;

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

						await startUpload([newFile], {
							name: formData.get('name') as string,
							description: formData.get('description') as string,
						});
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
					disabled={isUploading} // TODO: fix this (it's not working)
				>
					Submit
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
		</>
	);
}
