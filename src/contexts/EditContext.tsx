
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from "sonner";

type EditContextType = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  saveChanges: () => void;
};

const EditContext = createContext<EditContextType | undefined>(undefined);

export const EditProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    if (!isEditMode) {
      toast.info("Edit mode enabled. Click on text to edit.");
    } else {
      toast("Edit mode disabled.");
    }
  };

  const saveChanges = () => {
    // In the future, this will save to Supabase
    toast.success("Changes saved successfully!");
    setIsEditMode(false);
  };

  return (
    <EditContext.Provider value={{ isEditMode, toggleEditMode, saveChanges }}>
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
