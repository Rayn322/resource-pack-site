import { uploadPack } from '@/server/upload';
import UploadForm from './UploadForm';

export default function Upload() {
	return (
		<>
			<h1 className="text-3xl">Upload</h1>
			<UploadForm uploadPack={uploadPack}></UploadForm>
		</>
	);
}
