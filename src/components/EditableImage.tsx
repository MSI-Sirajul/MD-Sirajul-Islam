
import React, { useState, useRef } from 'react';
import { useEdit } from '@/contexts/EditContext';
import { Camera, Loader2 } from 'lucide-react';

type EditableImageProps = {
  src: string;
  alt: string;
  className?: string;
  onSave?: (file: File) => Promise<string>;
};

const EditableImage = ({ src, alt, className = "", onSave }: EditableImageProps) => {
  const { isEditMode } = useEdit();
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For now, we're just showing a preview without actual upload
    // In a future implementation, this will upload to Supabase
    setIsUploading(true);
    
    try {
      const objectUrl = URL.createObjectURL(file);
      setCurrentSrc(objectUrl);
      
      if (onSave) {
        // This is where we'd actually upload and save the URL
        await onSave(file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isEditMode) {
    return <img src={currentSrc} alt={alt} className={className} />;
  }

  return (
    <div className="relative group">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      <img 
        src={currentSrc} 
        alt={alt} 
        className={`${className} ${isEditMode ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}`} 
        onClick={handleImageClick} 
      />
      {isEditMode && !isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="text-white h-8 w-8" />
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="text-white h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default EditableImage;
