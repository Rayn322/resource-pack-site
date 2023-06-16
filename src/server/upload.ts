'use server';

import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function uploadPack(formData: FormData) {
	const { userId } = await auth();

	if (!userId) {
		return { error: 'You must be signed in to add an item to your cart' };
	}

	const name = formData.get('name');
	const description = formData.get('description');

	const stringSchema = z.string().nonempty();
	const nameResult = stringSchema.safeParse(name);
	const descriptionResult = stringSchema.safeParse(description);

	if (!nameResult.success) {
		return { error: 'Name is required' };
	}

	if (!descriptionResult.success) {
		return { error: 'Description is required' };
	}

	let query = await db.insert(packs).values({
		name: nameResult.data,
		description: descriptionResult.data,
		userId: userId,
	});

	redirect(`/packs/${query.insertId}`);
}

export type uploadPackType = typeof uploadPack;
