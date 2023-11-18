import Editor from '@/components/Organisms/Editor';
import Gallery from '@/components/Organisms/Gallery';
import AdminLayout from '@/components/Templates/AdminLayout';
import TagInput from '@/components/molecules/TagInput';
import { BreadcrumbItem, Breadcrumbs, Button, Card, Chip, Input, Switch, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillCloseCircle, AiFillEdit, AiFillFileImage } from 'react-icons/ai';
import slugify from 'slugify';

const Create = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <div className="space-y-4">
        <Breadcrumbs>
          <BreadcrumbItem onPress={() => router.push('/admin/post')}>Post</BreadcrumbItem>
          <BreadcrumbItem>Create</BreadcrumbItem>
        </Breadcrumbs>

        <Editor />
      </div>
    </AdminLayout>
  );
};

export default Create;
