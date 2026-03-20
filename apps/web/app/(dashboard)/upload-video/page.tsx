import { Metadata } from 'next';
import UploadVideoClient from './uploadVideoClient';

export const metadata: Metadata = {
	title: "Upload Video",
	description: "Upload New Jobs For Transcoding",
};

export default function page() {
	return (
		<UploadVideoClient />
	)
}
