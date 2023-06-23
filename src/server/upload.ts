'use server';

import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function uploadPack(formData: FormData) {
	const { userId } = auth();

	if (!userId) {
		return { error: 'You must be signed in to upload a texture pack' };
	}

	const name = formData.get('name');
	const description = formData.get('description');
	const url = formData.get('url');

	const stringSchema = z.string().nonempty();
	const nameResult = stringSchema.safeParse(name);
	const descriptionResult = stringSchema.safeParse(description);
	const urlResult = z.string().url().nonempty().safeParse(url);

	if (!nameResult.success) {
		return { error: 'Name is required' };
	}

	if (!descriptionResult.success) {
		return { error: 'Description is required' };
	}

	if (!urlResult.success) {
		return { error: 'File is required' };
	}

	const query = await db.insert(packs).values({
		name: nameResult.data,
		description: descriptionResult.data,
		userId: userId,
		downloadUrl: urlResult.data,
	});

	redirect(`/packs/${query.insertId}`);
}

export type uploadPackType = typeof uploadPack;
