import { db } from '@/db/db';
import { packs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	context: { params: { id: string } },
) {
	const id = parseInt(context.params.id);

	if (isNaN(id)) {
		return NextResponse.json(
			{ error: 'Error parsing pack id' },
			{ status: 400 },
		);
	}

	const pack = await db.query.packs.findFirst({
		where: eq(packs.id, id),
	});

	if (!pack) {
		return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
	}

	return NextResponse.json(pack);
}
