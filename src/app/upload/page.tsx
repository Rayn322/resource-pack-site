import { uploadPack } from '@/server/upload';
import UploadForm from './UploadForm';

export default function Upload() {
	return (
		<div className="flex flex-col items-center justify-center gap-8 pt-12">
			<h1 className="text-3xl">Upload</h1>
			<UploadForm uploadPack={uploadPack}></UploadForm>
		</div>
	);
}
