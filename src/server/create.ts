'use server';

import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { action } from './safe-action';
import { revalidatePath } from 'next/cache';

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
});

export const createPack = action(schema, async ({ name, description }) => {
	const { userId } = auth();

	if (!userId) {
		return { error: 'Not logged in' };
	}

	const [data] = await db
		.insert(packs)
		.values({
			name,
			description,
			userId,
		})
		.returning({ insertedId: packs.id });

	revalidatePath(`/packs/${data?.insertedId}`);
	redirect(`/packs/${data?.insertedId}`);
});
