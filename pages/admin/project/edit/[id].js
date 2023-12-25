import EditorProject from '@/components/Organisms/EditorProject';
import AdminLayout from '@/components/Templates/AdminLayout';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import React from 'react';

const EditProject = ({ project: data }) => {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <Breadcrumbs>
          <BreadcrumbItem onClick={() => router.push('/admin/post')}>Post</BreadcrumbItem>
          <BreadcrumbItem>Edit</BreadcrumbItem>
        </Breadcrumbs>
        <EditorProject isEditPost initialValue={data} />
      </div>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  const cookie = parse(context.req.headers.cookie || '');
  const isToken = cookie.token || false;

  if (!isToken)
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login',
      },
    };

  const { id } = context.query;

  try {
    const {
      data: { data },
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/project/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    const project = data;
    return {
      props: { project },
    };
  } catch (error) {
    return {
      props: { project: {} },
    };
  }
}

export default EditProject;
