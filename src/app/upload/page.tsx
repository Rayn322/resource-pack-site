'use client';

import { uploadPack } from '@/server/upload';
import { redirect } from 'next/navigation';
import { FormEvent } from 'react';
import { useZact } from 'zact/client';

export default function Upload() {
	const { mutate, data, isLoading, error } = useZact(uploadPack);

	if (data?.success) {
		redirect(`/packs/${data.id}`);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		await mutate({ name, description });
	}

	return (
		<div className="flex flex-col items-center justify-center gap-8 pt-12">
			<h1 className="text-3xl">Upload</h1>
			<form
				onSubmit={(event) => handleSubmit(event)}
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
					disabled={isLoading}
				>
					Submit
				</button>
			</form>
			{error && <p className="text-red-500">{error.message}</p>}
		</div>
	);
}
