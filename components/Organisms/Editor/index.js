import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Toolbar from './Toolbar';
import TagInput from '@/components/molecules/TagInput';
import Gallery from '@/components/Organisms/Gallery';
import { BreadcrumbItem, Breadcrumbs, Button, Card, Chip, Input, Switch, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiFillCloseCircle, AiFillEdit, AiFillFileImage } from 'react-icons/ai';
import slugify from 'slugify';
import axiosInstance from '@/utils/axiosInstance';

const Editor = () => {
  const router = useRouter();
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState([]);
  const [metaDescription, setMetaDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnail = (path) => {
    setThumbnail(path);
  };

  const handleAddTags = (tag) => {
    if (!tag) return;
    const check = tags?.find(({ id }) => id === tag?.id);
    if (!check) return setTags([...tags, tag]);
  };

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value);
    setSlug(slugify(value));
  };

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

  const addData = async (payload) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post('/post', payload);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const payload = {
      thumbnail,
      title,
      slug,
      meta_description: metaDescription,
      body: editor.getHTML(),
      tags: tags.map(({ id }) => id),
    };

    try {
      const data = await addData(payload);
      router.push('/admin/post');
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="space-y-4">
      <Gallery isOpen={isOpenGallery} onClose={() => setIsOpenGallery(!isOpenGallery)} onChange={handleThumbnail} />
      <Card className="p-4 ">
        <div className="flex gap-4">
          {/* Image */}
          <div className="space-y-4">
            {!thumbnail ? (
              <div className="h-52 aspect-video bg-primary rounded-md flex items-center justify-center" onClick={() => setIsOpenGallery(true)}>
                <AiFillFileImage className="w-36 h-36 text-white" />
              </div>
            ) : (
              <div className="h-52 aspect-video relative overflow-hidden rounded-md">
                <div className="absolute z-20 top-1 right-1 flex gap-2">
                  <Button isIconOnly radius="sm" size="sm" variant="flat" color="warning" onClick={() => setIsOpenGallery(true)} className="">
                    <AiFillEdit />
                  </Button>
                  <Button isIconOnly radius="sm" size="sm" variant="flat" color="danger" onClick={() => setThumbnail(null)} className="">
                    <AiFillCloseCircle />
                  </Button>
                </div>
                <Image src={thumbnail} alt="image" fill className="object-cover" />
              </div>
            )}
          </div>
          {/* Title */}
          <div className="w-full space-y-4">
            <Input value={title} onChange={handleTitleChange} label="Title" variant="bordered" className="text-bold" />
            <div className="flex gap-x-2">
              <p className="w-20 ">Slug </p>
              <p>:</p>
              <p className="font-medium italic">{slug}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="w-20">Tags </p>
              <p>:</p>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag, index) => (
                  <Chip onClose={() => setTags(tags.filter((realtag, _) => realtag !== tag))} key={index}>
                    {tag?.name}
                  </Chip>
                ))}
              </div>
            </div>
            <TagInput onChange={handleAddTags} />
            <Textarea
              label="Meta Description"
              variant="bordered"
              placeholder="Enter your meta description"
              className="w-full"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <Switch>Publish</Switch>
              <Button color="primary" onClick={handleSave} isLoading={isLoading}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="p-3 bg-white transition">
          <Toolbar editor={editor} />
          <div className="h-[1px] w-full bg-gray-400 my-3"></div>
          <EditorContent editor={editor} className="min-h-[200px]" />
        </div>
      </Card>
    </div>
  );
};

export default Editor;
