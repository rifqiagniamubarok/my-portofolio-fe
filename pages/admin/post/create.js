import Editor from '@/components/Organisms/Editor';
import Gallery from '@/components/Organisms/Gallery';
import AdminLayout from '@/components/Templates/AdminLayout';
import { BreadcrumbItem, Breadcrumbs, Button, Card, Chip, Input, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';

const Create = () => {
  const router = useRouter();
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const handleThumbnail = (path) => {
    setThumbnail(path);
    console.log(path);
  };
  return (
    <AdminLayout>
      <Gallery isOpen={isOpenGallery} onClose={() => setIsOpenGallery(!isOpenGallery)} onChange={handleThumbnail} />
      <div className="space-y-4">
        <Breadcrumbs>
          <BreadcrumbItem onPress={() => router.push('/admin/post')}>Post</BreadcrumbItem>
          <BreadcrumbItem>Create</BreadcrumbItem>
        </Breadcrumbs>
        <Card className="p-4 ">
          <div className="flex gap-4">
            {/* Image */}
            <div className="">
              {!thumbnail ? (
                <div className="h-52 aspect-video bg-primary rounded-md" onClick={() => setIsOpenGallery(true)}></div>
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
              <Input label="Title" variant="bordered" className="text-bold" />
              <div className="flex gap-x-2">
                <p className="w-20 ">Slug </p>
                <p>:</p>
                <p className="font-medium italic">rumus-matematika-dasar</p>
              </div>
              <div className="flex gap-x-2">
                <p className="w-20">Tags </p>
                <p>:</p>
                <div className="flex gap-2">
                  <Chip onClose={() => console.log('close')}>Chip</Chip>
                  <Chip onClose={() => console.log('close')}>Chip</Chip>
                  <Chip onClose={() => console.log('close')}>Chip</Chip>
                  <Chip onClose={() => console.log('close')}>Chip</Chip>
                </div>
              </div>
              <Textarea label="Description" variant="bordered" placeholder="Enter your description" className="w-full" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="pb-52">
            <Editor />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Create;
