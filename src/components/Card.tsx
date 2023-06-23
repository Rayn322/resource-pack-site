import Image from 'next/image';
import packPng from '@/static/pack.png';
import { Pack } from '@/db/schema';

export default function Card({ pack }: { pack: Pack }) {
	return (
		<a href={`/packs/${pack.id}`}>
			<div className="flex w-96 items-start overflow-hidden rounded border border-black p-2 shadow">
				<Image
					width={120}
					height={120}
					alt="Minecraft grass block"
					src={packPng}
					placeholder="blur"
					className="m-2 mt-3 shrink-0 grow-0 rounded shadow"
				/>
				<div className="p-2">
					<h3 className="text-xl">{pack.name}</h3>
					<p className="line-clamp-4">{pack.description}</p>
					{pack.id}
				</div>
			</div>
		</a>
	);
}
