'use client';

import { useUploadThing } from '@/utils/uploadthing';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UploadForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const { startUpload } = useUploadThing('packUploader', {
		onUploadProgress(p) {
			console.log(p);
		},
		onClientUploadComplete([file]) {
			if (!file) {
				setError('Error uploading file');
				return;
			}

			router.push(`/packs/${file.serverData.id}`);
		},
	});

	const submitForm = async (formData: FormData) => {
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
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

			// TODO: use some zod schema here
			if (!name || !description) {
				setError('Name and description required');
				return;
			}

			await startUpload([newFile], {
				name,
				description,
			});
		}
	};

	return (
		<>
			<form
				action={submitForm}
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
				>
					Submit
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
		</>
	);
}
