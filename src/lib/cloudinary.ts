declare global {
  interface Window {
    cloudinary: {
      config: (config: { cloud_name: string; api_key: string; api_secret: string }) => void;
      uploader: {
        upload: (file: string, options: { folder?: string; resource_type?: string }, callback: (error: Error | undefined, result: unknown) => void) => void;
      };
    };
  }
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
    formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '');

    fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          console.error('Cloudinary upload failed:', {
            status: response.status,
            statusText: response.statusText,
            body: text
          });
          throw new Error(`Upload failed: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data.secure_url) {
          console.error('Invalid response from Cloudinary:', data);
          throw new Error('Invalid response from Cloudinary');
        }
        resolve(data.secure_url);
      })
      .catch(error => {
        console.error('Error uploading to Cloudinary:', error);
        reject(error);
      });
  });
};