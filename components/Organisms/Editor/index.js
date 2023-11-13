import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Toolbar from './Toolbar';

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Type something...',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none max-w-full mx-auto h-full',
      },
    },
  });
  return (
    <div className="p-3 bg-white transition">
      <Toolbar editor={editor} />
      <div className="h-[1px] w-full bg-gray-400 my-3"></div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
