
import React, { useState, useRef, useEffect } from 'react';
import { useEdit } from '@/contexts/EditContext';
import { Camera, Loader2, Image } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

type EditableImageProps = {
  src: string;
  alt: string;
  className?: string;
  onSave?: (file: File) => Promise<string>;
  id?: string;
};

const EditableImage = ({ 
  src, 
  alt, 
  className = "",
  onSave,
  id = `image-${Math.random().toString(36).substring(2, 9)}`
}: EditableImageProps) => {
  const { isEditMode, updateImage } = useEdit();
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load image from Supabase on first render
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await supabase
          .from('images')
          .select('path')
          .eq('key', id)
          .maybeSingle();
        
        if (data && data.path) {
          setCurrentSrc(data.path);
        }
      } catch (error) {
        console.error(`Error fetching image for ${id}:`, error);
      }
    };

    fetchImage();
  }, [id]);

  const handleImageClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Create a preview for immediate feedback
      const objectUrl = URL.createObjectURL(file);
      setCurrentSrc(objectUrl);
      
      // Save the image through the context
      const newUrl = await updateImage(id, file);
      
      // If onSave prop is provided, also call that
      if (onSave) {
        await onSave(file);
      }
      
      // Update to the real URL if different from the temp one
      if (newUrl && newUrl !== objectUrl) {
        setCurrentSrc(newUrl);
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
    <div 
      className="relative group" 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload image"
      />
      <img 
        src={currentSrc} 
        alt={alt} 
        className={`${className} ${isEditMode ? 'cursor-pointer transition-opacity' : ''} ${isHovering ? 'opacity-75' : ''}`} 
        onClick={handleImageClick} 
      />
      {isEditMode && !isUploading && (
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleImageClick}
        >
          <div className="bg-black/60 rounded-full p-3 transform scale-90 hover:scale-100 transition-transform">
            <Camera className="text-white h-8 w-8" />
          </div>
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="text-white h-8 w-8 animate-spin" />
            <p className="text-white text-sm">Uploading...</p>
          </div>
        </div>
      )}
      {!currentSrc && isEditMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 border-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-2">
            <Image className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-500">Click to add image</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableImage;
