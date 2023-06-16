import Image from 'next/image';
import packPng from '@/static/pack.png';

export default function Card() {
	return (
		<a href="/packs/1">
			<div className="flex w-96 overflow-hidden rounded border border-black p-2 shadow">
				<Image
					width={160}
					height={160}
					alt="Minecraft grass block"
					src={packPng}
					placeholder="blur"
					className="rounded shadow"
				/>
				<div className="p-4">
					<h3 className="text-xl">Name</h3>
					<p>A description with multiple lines.</p>
				</div>
			</div>
		</a>
	);
}
