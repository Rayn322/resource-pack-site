'use server';

import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { action } from './safe-action';

export const uploadPack = action(
	z.object({
		name: z.string().min(1),
		description: z.string().min(1),
		url: z.string().url(),
	}),
	async ({ name, description, url }) => {
		const { userId } = auth();

		if (!userId) {
			return { error: 'You must be signed in to upload a texture pack' };
		}

		const query = await db.insert(packs).values({
			name: name,
			description: description,
			userId: userId,
			downloadUrl: url,
		});

		redirect(`/packs/${query.insertId}`);
	},
);

export type uploadPackType = typeof uploadPack;
