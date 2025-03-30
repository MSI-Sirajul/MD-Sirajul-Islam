
import React, { useState, useEffect, useRef } from 'react';
import { useEdit } from '@/contexts/EditContext';

type EditableContentProps = {
  initialValue: string;
  onSave?: (value: string) => void;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

const EditableContent = ({ 
  initialValue, 
  onSave, 
  className = "", 
  as: Component = "div" 
}: EditableContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialValue);
  const { isEditMode } = useEdit();
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleClick = () => {
    if (isEditMode) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onSave && content !== initialValue) {
      onSave(content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{content}</Component>;
  }

  return isEditing ? (
    <div
      ref={inputRef}
      contentEditable
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      dangerouslySetInnerHTML={{ __html: content }}
      onInput={(e) => setContent(e.currentTarget.textContent || '')}
      className={`${className} outline-dashed outline-2 outline-primary bg-primary/5 p-1`}
    />
  ) : (
    <Component 
      className={`${className} cursor-pointer hover:bg-primary/10 hover:outline-dashed hover:outline-1 hover:outline-primary transition-all`} 
      onClick={handleClick}
    >
      {content}
    </Component>
  );
};

export default EditableContent;
