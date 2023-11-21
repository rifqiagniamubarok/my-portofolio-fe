import Editor from '@/components/Organisms/Editor';
import AdminLayout from '@/components/Templates/AdminLayout';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import { useRouter } from 'next/navigation';
import React from 'react';

const EditPost = ({ post }) => {
  const router = useRouter();
  return (
    <AdminLayout>
      <div className="space-y-4">
        <Breadcrumbs>
          <BreadcrumbItem onClick={() => router.push('/admin/post')}>Post</BreadcrumbItem>
          <BreadcrumbItem>Create</BreadcrumbItem>
        </Breadcrumbs>
        <Editor isEditPost initialValue={post} />
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
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    const post = data;
    return {
      props: { post },
    };
  } catch (error) {
    return {
      props: { post: {} },
    };
  }
}

export default EditPost;
