
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from './AuthContext';

type EditContextType = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  saveChanges: () => void;
  updateContent: (key: string, value: string) => void;
  updateImage: (path: string, file: File) => Promise<string>;
  contentChanges: Record<string, string>;
};

const EditContext = createContext<EditContextType | undefined>(undefined);

export const EditProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [contentChanges, setContentChanges] = useState<Record<string, string>>({});
  const [imageChanges, setImageChanges] = useState<Record<string, File>>({});
  const { user } = useAuth();

  const toggleEditMode = () => {
    // Only allow logged-in users to enter edit mode
    if (!user && !isEditMode) {
      toast.error("Access denied", {
        description: "You must be logged in as an administrator to edit this site."
      });
      return;
    }
    
    setIsEditMode(prev => !prev);
    if (!isEditMode) {
      toast.info("Edit mode enabled. Click on text or images to edit.");
    } else {
      if (Object.keys(contentChanges).length > 0 || Object.keys(imageChanges).length > 0) {
        const confirmExit = window.confirm("You have unsaved changes. Are you sure you want to exit edit mode?");
        if (!confirmExit) {
          return;
        }
        // Reset changes if confirmed
        setContentChanges({});
        setImageChanges({});
      }
      toast("Edit mode disabled.");
    }
  };

  // Save content change to Supabase and update local state
  const updateContent = async (key: string, value: string) => {
    if (!isEditMode) return;
    
    setContentChanges(prev => ({
      ...prev,
      [key]: value
    }));
    
    try {
      // Check if the content already exists
      const { data: existingContent } = await supabase
        .from('content')
        .select('*')
        .eq('key', key)
        .single();
      
      if (existingContent) {
        // Update existing content
        await supabase
          .from('content')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('key', key);
      } else {
        // Insert new content
        await supabase
          .from('content')
          .insert({ key, value });
      }
      
      toast.success(`Updated "${key}" content.`);
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error(`Failed to save "${key}" content. It will be saved when you click "Save All".`);
    }
  };

  // Upload image to Supabase Storage and update database record
  const updateImage = async (path: string, file: File): Promise<string> => {
    if (!isEditMode) return '';

    // Store file in imageChanges for bulk saving later if needed
    setImageChanges(prev => ({
      ...prev,
      [path]: file
    }));

    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${path.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: publicURL } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      // Update or insert record in the images table
      const { data: existingImage } = await supabase
        .from('images')
        .select('*')
        .eq('key', path)
        .single();

      if (existingImage) {
        await supabase
          .from('images')
          .update({ 
            path: publicURL.publicUrl,
            updated_at: new Date().toISOString() 
          })
          .eq('key', path);
      } else {
        await supabase
          .from('images')
          .insert({ 
            key: path, 
            path: publicURL.publicUrl 
          });
      }

      toast.success(`Uploaded image "${path}".`);
      return publicURL.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(`Failed to upload image. It will be saved when you click "Save All".`);
      
      // Return a temporary URL for preview
      return URL.createObjectURL(file);
    }
  };

  const saveChanges = async () => {
    toast.promise(
      async () => {
        // Process any remaining content changes
        const contentPromises = Object.entries(contentChanges).map(async ([key, value]) => {
          // Check if content exists
          const { data: existingContent } = await supabase
            .from('content')
            .select('*')
            .eq('key', key)
            .maybeSingle();
          
          if (existingContent) {
            // Update existing content
            return supabase
              .from('content')
              .update({ value, updated_at: new Date().toISOString() })
              .eq('key', key);
          } else {
            // Insert new content
            return supabase
              .from('content')
              .insert({ key, value });
          }
        });

        // Process any remaining image changes
        const imagePromises = Object.entries(imageChanges).map(async ([path, file]) => {
          // Generate a unique filename
          const fileExt = file.name.split('.').pop();
          const fileName = `${path.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;
          
          // Upload the file to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('website-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: true
            });

          if (uploadError) throw uploadError;

          // Get the public URL
          const { data: publicURL } = supabase.storage
            .from('website-images')
            .getPublicUrl(filePath);

          // Update or insert record in the images table
          const { data: existingImage } = await supabase
            .from('images')
            .select('*')
            .eq('key', path)
            .maybeSingle();

          if (existingImage) {
            return supabase
              .from('images')
              .update({ 
                path: publicURL.publicUrl,
                updated_at: new Date().toISOString() 
              })
              .eq('key', path);
          } else {
            return supabase
              .from('images')
              .insert({ 
                key: path, 
                path: publicURL.publicUrl 
              });
          }
        });

        // Wait for all promises to resolve
        await Promise.all([...contentPromises, ...imagePromises]);

        // Reset changes after successful save
        setContentChanges({});
        setImageChanges({});
        
        setIsEditMode(false);
      },
      {
        loading: 'Saving all changes...',
        success: 'All changes saved successfully to Supabase!',
        error: 'Failed to save some changes. Please try again.',
      }
    );
  };

  return (
    <EditContext.Provider value={{ 
      isEditMode, 
      toggleEditMode, 
      saveChanges, 
      updateContent,
      updateImage,
      contentChanges
    }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = (): EditContextType => {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
};
