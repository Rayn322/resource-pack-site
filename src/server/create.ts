'use server';

import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { actionClient } from './safe-action';

export const createPack = actionClient
	.schema(
		z.object({
			name: z.string().min(1, 'Name is required'),
			description: z.string().min(1, 'Description is required'),
		}),
	)
	.action(async ({ parsedInput: { name, description }, ctx: { userId } }) => {
		const [data] = await db
			.insert(packs)
			.values({
				name,
				description,
				userId,
			})
			.returning({ insertedId: packs.id });

		revalidatePath('/packs');
		revalidatePath(`/packs/${data?.insertedId}`);
		revalidatePath(`/api/pack/${data?.insertedId}`);

		redirect(`/packs/${data?.insertedId}`);
	});
