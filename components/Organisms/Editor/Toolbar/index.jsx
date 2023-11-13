import { AiFillCaretDown } from 'react-icons/ai';
import { BsBraces, BsCode, BsListOl, BsListUl, BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsTypeUnderline } from 'react-icons/bs';
import { RiDoubleQuotesL } from 'react-icons/ri';

import { getFocusedEditor } from '../EditorUtils';
import Button from './Button';
import DropdownOptions from './DropdownOptions';

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const options = [
    {
      label: 'Paragraph',
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    { label: 'Heading 1', onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run() },
    { label: 'Heading 2', onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run() },
    { label: 'Heading 3', onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run() },
  ];

  const getLabel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3';

    return 'Paragraph';
  };
  return (
    <div className="flex items-center">
      {/* Paragraph */}
      <DropdownOptions
        options={options}
        head={
          <div className="flex items-center space-x-2 text-black">
            <p>{getLabel()}</p>
            <AiFillCaretDown />
          </div>
        }
      />

      <div className="h-4 w-[1px] bg-primary mx-8" />
      <div className="flex items-center space-x-2">
        <Button active={editor.isActive('bold')} onClick={() => getFocusedEditor(editor).toggleBold().run()}>
          <BsTypeBold />
        </Button>
        <Button active={editor.isActive('italic')} onClick={() => getFocusedEditor(editor).toggleItalic().run()}>
          <BsTypeItalic />
        </Button>
        <Button active={editor.isActive('underline')} onClick={() => getFocusedEditor(editor).toggleUnderline().run()}>
          <BsTypeUnderline />
        </Button>
        <Button active={editor.isActive('strike')} onClick={() => getFocusedEditor(editor).toggleStrike().run()}>
          <BsTypeStrikethrough />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-primary mx-8" />
      <div className="flex items-center space-x-2">
        <Button active={editor.isActive('blockquote')} onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}>
          <RiDoubleQuotesL />
        </Button>
        <Button active={editor.isActive('code')} onClick={() => getFocusedEditor(editor).toggleCode().run()}>
          <BsCode />
        </Button>
        <Button active={editor.isActive('codeBlock')} onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}>
          <BsBraces />
        </Button>

        <Button active={editor.isActive('orderedList')} onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}>
          <BsListOl />
        </Button>
        <Button active={editor.isActive('bulletList')} onClick={() => getFocusedEditor(editor).toggleBulletList().run()}>
          <BsListUl />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
