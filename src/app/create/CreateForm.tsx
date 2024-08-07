'use client';

import { createPack } from '@/server/create';
import { flattenValidationErrors } from 'next-safe-action';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function UploadForm() {
	const [error, setError] = useState<string | null>(null);

	const submitForm = async (formData: FormData) => {
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		const result = await createPack({ name, description });

		if (result?.validationErrors) {
			const flattened = flattenValidationErrors(result?.validationErrors);

			setError(
				flattened.fieldErrors.name?.at(0) ||
					flattened.fieldErrors.description?.at(0) ||
					null,
			);
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
					<input type="text" name="name" id="name" className="rounded" />
				</div>

				<div className="flex items-center justify-between gap-2">
					<label htmlFor="description" className="w-full text-center">
						Description
					</label>
					<input
						type="text"
						name="description"
						id="description"
						className="rounded"
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
