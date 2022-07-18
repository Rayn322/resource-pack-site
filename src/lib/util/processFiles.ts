import JSZip from 'jszip';

export async function processZip(file: File) {
	const zip = new JSZip();
	let name = file.name;
	let description = '';
	let imageBlob: Blob = new Blob();
	let imageBase64 = '';

	name = name.slice(0, name.lastIndexOf('.'));
	console.log(name);

	await zip.loadAsync(file).then(async (zip) => {
		const meta = await zip.file('pack.mcmeta')?.async('text');
		if (meta) {
			const json = JSON.parse(meta);
			description = json.pack.description;
		} else {
			console.log('no pack.mcmeta');
		}

		const imageFile = zip.file('pack.png');
		if (imageFile) {
			imageBlob = await imageFile?.async('blob');
			imageBase64 = 'data:image/png;base64,' + (await imageFile?.async('base64'));
		}
	});

	return {
		name,
		description,
		imageBlob,
		imageBase64
	};
}
