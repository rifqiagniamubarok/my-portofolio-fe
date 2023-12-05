import EditorProject from '@/components/Organisms/EditorProject';
import AdminLayout from '@/components/Templates/AdminLayout';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

const CreateProject = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <div className="space-y-4">
        <Breadcrumbs>
          <BreadcrumbItem onPress={() => router.push('/admin/project')}>Project</BreadcrumbItem>
          <BreadcrumbItem>Create</BreadcrumbItem>
        </Breadcrumbs>
        <EditorProject />
      </div>
    </AdminLayout>
  );
};

export default CreateProject;
