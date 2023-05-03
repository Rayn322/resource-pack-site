import Image from 'next/image';

export default function Card() {
	return (
		<div className="w-40 overflow-hidden rounded border border-black shadow">
			<Image
				width={160}
				height={160}
				alt="Minecraft grass block"
				src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/17/Grass_Block_%28graphics_fast%29_JE3.png/revision/latest?cb=20200831093828"
			/>
			<div className="p-4">
				<h3 className="text-xl">Name</h3>
				<p>A description with multiple lines.</p>
			</div>
		</div>
	);
}
