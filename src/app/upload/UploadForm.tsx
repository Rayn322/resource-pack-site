'use client';

import type { uploadPackType } from '@/server/upload';
import { useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function UploadForm({
	uploadPack,
}: {
	uploadPack: uploadPackType;
}) {
	const { pending } = useFormStatus();
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			<form
				action={async (formData) => {
					let data = await uploadPack(formData);
					if (data.error) {
						setError(data.error);
					} else {
						setError(null);
					}
				}}
				className="flex flex-col gap-2 rounded border-2 border-black p-4 shadow"
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
				<button
					type="submit"
					className="rounded border-2 border-emerald-500 p-2"
					disabled={pending}
				>
					Submit
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
		</>
	);
}
