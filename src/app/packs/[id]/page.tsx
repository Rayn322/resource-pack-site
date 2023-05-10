export default function PackPage({ params }: { params: { id: string } }) {
	return (
		<div className="flex flex-col items-center justify-between gap-8 p-12">
			<h1 className="text-3xl">Pack {params.id}</h1>
		</div>
	);
}
