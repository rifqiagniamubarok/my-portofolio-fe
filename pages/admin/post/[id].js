import AdminLayout from '@/components/Templates/AdminLayout';
import PostLayout from '@/components/Templates/PostLayout';
import axiosInstance from '@/utils/axiosInstance';
import { Button, Card, Divider } from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { useState } from 'react';

const DetailPost = ({ post: data }) => {
  const [post, setPost] = useState(data);

  const router = useRouter();
  const id = router.query.id;

  const publishPost = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post(`/post/publish/${id}`);
      setPost(data);
    } catch (error) {
      console.error({ error });
    }
  };

  const handlePublish = async () => {
    await publishPost();
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-7 gap-4">
        <Card className="col-span-5 relative overflow-hidden">
          <div className="w-full h-52 relative">
            <Image src={post.thumbnail} alt={post.slug + '-thumb'} fill className="object-cover" />
          </div>
          <div className="px-4 py-8">
            <div>
              <p className="text-3xl font-semibold">{post.title}</p>
              <p className="text-base">{dayjs(post.createdAt).format('DD MMMM YYYY')}</p>
            </div>
            <Divider className="my-4" />
            <div></div>
            <article
              className="prose dark:prose-headings:text-white dark:prose-li:text-white dark:prose-ul:text-white dark:text-white lg:prose-xl "
              dangerouslySetInnerHTML={{ __html: post.body }}
            ></article>
          </div>
        </Card>
        <div className="col-span-2">
          <Card className="p-4 ">
            <div>
              <p>Slug :</p>
              <p>{post.slug}</p>
              <p>View :</p>
              <p>{post.view}</p>
              <p>Like :</p>
              <p>{post.like}</p>
              <p>Status:</p>
              <p>{post.is_publish ? 'publish' : 'draft'}</p>
              <div className="mt-10 space-y-2">
                <Button color="primary" variant="solid" className="w-full" onClick={handlePublish}>
                  {post.is_publish ? 'Publish' : 'unPublish'}
                </Button>
                <Button color="danger" className="w-full">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
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
    } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`, {
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
      props: { post: [] },
    };
  }
}

export default DetailPost;
