import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { clerkClient } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/dist/types/server';
import { eq } from 'drizzle-orm';
import Image from 'next/image';

export default async function PackPage({ params }: { params: { id: string } }) {
	function toRelativeTime(date: Date) {
		const diff = Date.now() - date.getTime();
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (seconds < 60) {
			return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
		} else if (minutes < 60) {
			return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
		} else if (hours < 24) {
			return `${hours} hour${hours === 1 ? '' : 's'} ago`;
		} else if (days < 7) {
			return `${days} day${days === 1 ? '' : 's'} ago`;
		} else if (weeks < 4) {
			return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
		} else if (months < 12) {
			return `${months} month${months === 1 ? '' : 's'} ago`;
		} else {
			return `${years} year${years === 1 ? '' : 's'} ago`;
		}
	}

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
					<p>Date: {toRelativeTime(pack.createdAt)}</p>
					{user && (
						<>
							<p>Uploaded by: {user.firstName}</p>
							<Image
								className="rounded"
								src={user.imageUrl}
								alt="profile"
								width={64}
								height={64}
								priority
							/>
						</>
					)}
					<a
						href={pack.downloadUrl}
						className="mt-2 inline-block rounded border-2 border-emerald-500 p-2"
					>
						Download
					</a>
				</div>
			)}
		</>
	);
}
