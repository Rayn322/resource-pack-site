'use client';

import { useUploadThing } from '@/utils/uploadthing';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function UploadForm({ packId }: { packId: number }) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const { startUpload } = useUploadThing('packUploader', {
		onClientUploadComplete([file]) {
			if (!file) {
				setError('Error uploading file');
				return;
			}

			router.push(`/packs/${packId}`);
			router.refresh();
		},
	});

	const submitForm = async (formData: FormData) => {
		const version = formData.get('version') as string;
		const mcVersion = formData.get('mcVersion') as string;
		const changelog = formData.get('changelog') as string;
		const file = formData.get('file') as File;

		if (!version || version === '') {
			setError('Version is required');
		} else if (!changelog || changelog === '') {
			setError('Changelog is required');
		} else if (!mcVersion || mcVersion === '') {
			setError('Minecraft version is required');
		} else if (!file || file.size === 0) {
			setError('No file selected');
		} else {
			setError(null);
		}

		// shenanigans to get the mime type to be application/zip
		if (
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
				version,
				mcVersion,
				changelog,
				packId,
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
					<label htmlFor="version" className="w-full text-center">
						Version
					</label>
					<input type="text" name="version" id="version" className="rounded" />
				</div>

				<div className="flex items-center justify-between gap-2">
					<label htmlFor="mcVersion" className="w-full text-center">
						Minecraft Version
					</label>
					<input
						type="text"
						name="mcVersion"
						id="mcVersion"
						className="rounded"
					/>
				</div>

				<div className="flex items-center justify-between gap-2">
					<label htmlFor="changelog" className="w-full text-center">
						Changelog
					</label>
					<input
						type="text"
						name="changelog"
						id="changelog"
						className="rounded"
					/>
				</div>

				<div className="flex items-center justify-between gap-2">
					<input
						type="file"
						name="file"
						accept=".zip"
						className="rounded border border-gray-500 p-2 file:rounded file:border file:border-solid file:border-black file:bg-transparent"
					/>
				</div>

				<SubmitButton />
			</form>
			{error && <p className="text-red-500">{error}</p>}
		</>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className={`rounded border-2 border-emerald-500 p-2 disabled:bg-gray-200`}
		>
			Submit
		</button>
	);
}
