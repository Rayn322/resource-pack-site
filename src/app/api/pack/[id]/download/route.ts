import { getLatestDownloadUrl } from '@/db/queries';
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

	const url = await getLatestDownloadUrl(id);

	if (!url) {
		return NextResponse.json(
			{ error: 'Download not found', url: null },
			{ status: 404 },
		);
	}

	return NextResponse.json({ error: null, url }, { status: 200 });

	// return NextResponse.redirect(url);
}
