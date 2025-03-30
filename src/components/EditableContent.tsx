
import React, { useState, useEffect, useRef } from 'react';
import { useEdit } from '@/contexts/EditContext';

type EditableContentProps = {
  initialValue: string;
  onSave?: (value: string) => void;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
};

const EditableContent = ({ 
  initialValue, 
  onSave,
  className = "", 
  as: Component = "div",
  id = `content-${Math.random().toString(36).substring(2, 9)}` // Generate a random ID if none provided
}: EditableContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialValue);
  const { isEditMode, updateContent } = useEdit();
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Place cursor at the end of the content
      const selection = window.getSelection();
      const range = document.createRange();
      if (selection && inputRef.current.childNodes.length > 0) {
        const lastNode = inputRef.current.childNodes[inputRef.current.childNodes.length - 1];
        range.setStartAfter(lastNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isEditing]);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      if (content !== initialValue) {
        if (onSave) {
          onSave(content);
        }
        updateContent(id, content);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setContent(initialValue); // Reset to initial content if ESC
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
      className={`${className} outline-dashed outline-2 outline-primary bg-primary/5 p-1 rounded`}
      aria-label="Edit content"
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
