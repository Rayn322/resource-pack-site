'use client';

import { deleteVersion } from '@/server/delete';

export default function DeleteButton({
	packId,
	versionId,
}: {
	packId: number;
	versionId: number;
}) {
	return (
		<button
			className="rounded border-2 border-red-700 p-2 text-red-700"
			onClick={() => deleteVersion({ packId, versionId })}
		>
			Delete
		</button>
	);
}
