'use server';

import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { action } from './safe-action';

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
});

export const createPack = action(schema, async ({ name, description }) => {
	const user = await currentUser();

	if (!user) {
		return { error: 'Not logged in' };
	}

	const { insertId } = await db.insert(packs).values({
		name,
		description,
		userId: user.id,
	});

	redirect(`/packs/${insertId}`);
});
