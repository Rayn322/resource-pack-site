import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { clerkClient } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/dist/types/server';
import { eq } from 'drizzle-orm';
import Image from 'next/image';

export default async function PackPage({ params }: { params: { id: string } }) {
	const id = parseInt(params.id);

	if (isNaN(id)) {
		return <div>Invalid pack id</div>;
	}

	const pack = await db.query.packs.findFirst({
		where: eq(packs.id, id),
	});

	let user: User | undefined;

	if (pack) {
		try {
			user = await clerkClient.users.getUser(pack.userId);
		} catch (e) {}
	}

	return (
		<>
			<h1 className="text-3xl">Pack {params.id}</h1>
			{pack && (
				<div>
					<p>Name: {pack.name}</p>
					<p>Description: {pack.description}</p>
					{user && (
						<>
							<p>Uploaded by: {user.firstName}</p>
							<Image
								className="rounded"
								src={user.imageUrl}
								alt="profile"
								width={64}
								height={64}
							/>
						</>
					)}
				</div>
			)}
		</>
	);
}
