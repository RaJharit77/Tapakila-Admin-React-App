import { useState, ChangeEvent } from 'react';
import { useInput, useNotify } from 'react-admin';

interface CloudinaryUploadProps {
  source: string;
}

const CloudinaryUpload = ({ source }: CloudinaryUploadProps) => {
  const notify = useNotify();
  const { field } = useInput({ source });
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }

      const data = await response.json();
      setImageUrl(data.secure_url);
      field.onChange(data.secure_url);
      notify('Image uploadée avec succès', { type: 'success' });
    } catch (error) {
      notify('Échec de l\'upload de l\'image', { type: 'error' });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} accept="image/*" />

      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <img
            src={imageUrl}
            alt="Aperçu de l'image"
            style={{ width: '300px', borderRadius: '8px', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;