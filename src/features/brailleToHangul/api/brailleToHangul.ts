import { BACKEND_URL } from '@env';

export async function translate(image: {
  fileName: string;
  type: string;
  uri: string;
}) {
  const formData = new FormData();
  formData.append('file', {
    name: image.fileName,
    type: image.type,
    uri: image.uri,
  });

  const response = await fetch(`${BACKEND_URL}/inference`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload an image.');
  }

  return response.json() as Promise<{
    srcText: string;
    translatedText: string;
  }>;
}
