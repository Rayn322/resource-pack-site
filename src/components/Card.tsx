import { Pack } from '@/db/schema';
import packPng from '@/static/pack.png';
import { clerkClient } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/dist/types/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function Card({ pack }: { pack: Pack }) {
	let user: User | undefined;

	try {
		user = await clerkClient.users.getUser(pack.userId);
	} catch {}

	return (
		<Link prefetch={true} href={`/packs/${pack.id}`}>
			<div className="flex h-full w-96 gap-4 overflow-hidden rounded border border-black p-4 shadow">
				<Image
					width={120}
					height={120}
					alt="Default Minecraft texture pack image"
					src={packPng}
					placeholder="blur"
					className="shrink-0 grow-0 rounded shadow"
				/>
				<div className="flex flex-col justify-between">
					<div>
						<h3 className="text-xl">{pack.name}</h3>
						<p className="line-clamp-4">{pack.description}</p>
					</div>
					{user && <p>Uploaded by {user.username}</p>}
				</div>
			</div>
		</Link>
	);
}
