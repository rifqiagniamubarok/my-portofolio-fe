import { Editor } from '@tiptap/react';

export const getFocusedEditor = (editor) => {
  return editor.chain().focus();
};
