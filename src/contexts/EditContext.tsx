
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

  const toggleEditMode = () => {
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

  const updateContent = (key: string, value: string) => {
    if (!isEditMode) return;
    
    setContentChanges(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast.info(`Updated "${key}" content. Don't forget to save!`);
  };

  const updateImage = async (path: string, file: File): Promise<string> => {
    if (!isEditMode) return '';

    // In the future, this would upload to Supabase
    // For now, just store the file reference
    setImageChanges(prev => ({
      ...prev,
      [path]: file
    }));

    toast.info(`Updated image at "${path}". Don't forget to save!`);
    return URL.createObjectURL(file);
  };

  const saveChanges = async () => {
    toast.promise(
      async () => {
        // In the future, this code would upload all images to Supabase Storage
        // and save all content changes to the database
        
        // Simulate saving delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Reset changes after successful save
        setContentChanges({});
        setImageChanges({});
        
        setIsEditMode(false);
      },
      {
        loading: 'Saving changes...',
        success: 'All changes saved successfully!',
        error: 'Failed to save changes. Please try again.',
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
