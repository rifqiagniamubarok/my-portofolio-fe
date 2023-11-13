import Editor from '@/components/Organisms/Editor';
import AdminLayout from '@/components/Templates/AdminLayout';
import { BreadcrumbItem, Breadcrumbs, Card } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Create = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <div className="space-y-4">
        <Breadcrumbs>
          <BreadcrumbItem onPress={() => router.push('/admin/post')}>Post</BreadcrumbItem>
          <BreadcrumbItem>Create</BreadcrumbItem>
        </Breadcrumbs>
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
