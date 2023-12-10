import { notFound } from 'next/navigation';
import NewVersionForm from './NewVersionForm';

export default async function NewVersion({
	params,
}: {
	params: { id: string };
}) {
	const id = parseInt(params.id);

	if (isNaN(id)) {
		notFound();
	}

	return (
		<>
			<h1 className="text-3xl">New Version</h1>
			<NewVersionForm packId={id} />
		</>
	);
}
