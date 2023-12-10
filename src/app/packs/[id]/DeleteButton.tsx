'use client';

import { deletePack } from '@/server/delete';

export default function DeleteButton({ id }: { id: number }) {
	return (
		<button
			onClick={async () => {
				if (confirm('Are you sure you want to delete this pack?')) {
					await deletePack(id);
				}
			}}
		>
			Delete
		</button>
	);
}
