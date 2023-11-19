import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Toolbar from './Toolbar';
import TagInput from '@/components/molecules/TagInput';
import Gallery from '@/components/Organisms/Gallery';
import TiptapImage from '@tiptap/extension-image';

import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiFillCloseCircle, AiFillEdit, AiFillFileImage } from 'react-icons/ai';
import slugify from 'slugify';
import axiosInstance from '@/utils/axiosInstance';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import markdown from 'highlight.js/lib/languages/markdown';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

const lowlight = createLowlight({ js });

const Editor = ({ isEditPost = false, initialValue }) => {
  // lowlight.register('html', html);
  // lowlight.register('css', css);
  // lowlight.register('js', js);
  // lowlight.register('ts', ts);
  const router = useRouter();
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [isOpenGalleryEditor, setIsOpenGalleryEditor] = useState(false);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState([]);
  const [metaDescription, setMetaDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnail = ({ path, detail }) => {
    setThumbnail(path);
  };

  const handleAddTags = (tag) => {
    if (!tag) return;
    const check = tags?.find(({ id }) => id === tag?.id);
    if (!check) return setTags([...tags, tag]);
  };

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value);
    setSlug(slugify(value.toLowerCase()));
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Type something...',
      }),
      TiptapImage.configure({
        HTMLAttributes: {
          class: 'mx-auto',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
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
  const editData = async (payload, id) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.patch(`/post/${id}`, payload);
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
      let newData;
      if (isEditPost) {
        const { data: getData } = await editData(payload, initialValue.id);
        newData = getData;
      } else {
        const { data: getData } = await addData(payload);
        newData = getData;
      }
      localStorage.removeItem(!isEditPost ? 'new-post' : `edit-post-${initialValue.id}`);
      router.push(`/admin/post/${newData.id}`);
    } catch (error) {
      console.error({ error });
    }
  };

  const handleDraft = async () => {
    const payload = {
      thumbnail,
      title,
      slug,
      meta_description: metaDescription,
      body: editor.getHTML(),
      tags: tags,
    };

    localStorage.setItem(!isEditPost ? 'new-post' : `edit-post-${initialValue.id}`, JSON.stringify(payload));
    router.push('/admin/post');
  };

  const [draftData, setDraftData] = useState(null);
  useEffect(() => {
    const draftLocalStorage = localStorage.getItem(!isEditPost ? 'new-post' : `edit-post-${initialValue.id}`);
    if (draftLocalStorage) {
      const draftState = JSON.parse(draftLocalStorage);
      setDraftData(draftState);
      onOpenModalDraft();
    }
  }, []);

  const { isOpen: isOpenModalDraft, onOpen: onOpenModalDraft, onOpenChange: onOpenChangeModalDraft, onClose: onCLoseModalDraft } = useDisclosure();

  const handleUseDraft = () => {
    console.log(draftData);
    let { thumbnail, body, title, slug, meta_description, tags } = draftData;
    editor?.commands.setContent(body);
    setThumbnail(thumbnail);
    setTitle(title);
    setSlug(slug);
    setMetaDescription(meta_description);
    setTags(tags);
    onCLoseModalDraft();
  };

  useEffect(() => {
    if (initialValue && isEditPost) {
      let { id, thumbnail, title, slug, meta_description, body, tags } = initialValue;
      let newTags = tags?.map(({ id, name, about, createdAt, updatedAt }) => {
        return { id, name, about, createdAt, updatedAt };
      });
      setThumbnail(thumbnail);
      setTitle(title);
      setSlug(slug);
      setMetaDescription(meta_description);
      setTags(newTags || []);
      editor?.commands.setContent(body);
    }
  }, [editor]);

  const handleInputImage = ({ path, detail }) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: path, alt: slugify(detail.name) })
      .run();
    // console.log({ path, name: slugify(detail.name) });

    setIsOpenGalleryEditor(false);
  };

  return (
    <div className="space-y-4">
      <Modal isOpen={isOpenModalDraft} onOpenChange={onOpenChangeModalDraft}>
        <ModalContent className="text-black dark:text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">Draft available</ModalHeader>
              <ModalBody className="text-center">Want to use draft</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onClick={handleUseDraft}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Gallery isOpen={isOpenGalleryEditor} onClose={() => setIsOpenGalleryEditor(!isOpenGalleryEditor)} onChange={handleInputImage} />
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
            <div className="flex gap-2 items-center">
              {/* <Switch>Publish</Switch> */}
              <Button color="primary" onClick={handleSave} isLoading={isLoading}>
                Save
              </Button>
              <Button color="primary" variant="bordered" onClick={handleDraft} isLoading={isLoading}>
                Save as draft
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="p-3 bg-white transition">
          <div className="">
            <Toolbar editor={editor} onClickImage={() => setIsOpenGalleryEditor(true)} />
          </div>
          <div className="h-[1px] w-full bg-gray-400 my-3"></div>
          <EditorContent editor={editor} className="min-h-[200px]" />
        </div>
      </Card>
    </div>
  );
};

export default Editor;
