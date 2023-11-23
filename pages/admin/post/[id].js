import Article from '@/components/Organisms/Article';
import AdminLayout from '@/components/Templates/AdminLayout';
import PostLayout from '@/components/Templates/PostLayout';
import axiosInstance from '@/utils/axiosInstance';
import { Button, Card, Divider, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { AiFillLike, AiOutlineSelect, AiOutlineSend } from 'react-icons/ai';
import { FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import { MdPublish, MdUnarchive, MdModeEditOutline } from 'react-icons/md';

const DetailPost = ({ post: data }) => {
  const [post, setPost] = useState(data);

  const router = useRouter();
  const id = router.query.id;

  const publishPost = async () => {
    try {
      let newData;
      if (post.is_publish) {
        const {
          data: { data },
        } = await axiosInstance.post(`/post/unpublish/${id}`);
        newData = data;
      } else {
        const {
          data: { data },
        } = await axiosInstance.post(`/post/publish/${id}`);
        newData = data;
      }
      setPost(newData);
    } catch (error) {
      console.error({ error });
    }
  };

  const handlePublish = async () => {
    await publishPost();
  };

  return (
    <AdminLayout>
      <div className=" space-y-4">
        <Card className="p-4  ">
          <div className="w-full flex justify-between items-end">
            <div>
              <p className="text-base text-slate-400">Slug:</p>
              <p className="text-lg font-semibold">{post.slug}</p>
            </div>
            <div>
              <Link target="_blank" href={`/blog/${post.slug}`}>
                <Button className="" isIconOnly color="primary" variant="faded" disabled={!post.is_publish}>
                  <FaExternalLinkAlt />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-primary font-semibold">
              <FaEye className="fill-primary" />
              <p>{post.view}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 font-semibold">
              <AiFillLike className="" />
              <p>{post.like}</p>
            </div>
          </div>
        </Card>
        <div className="fixed bottom-4 right-4 z-40">
          <Card className="p-2 ">
            <div className="space-x-2">
              <Tooltip content={post.is_publish ? 'Archive' : 'Publish'} color={!post.is_publish ? 'primary' : 'warning'}>
                <Button color={!post.is_publish ? 'primary' : 'warning'} variant="faded" isIconOnly onClick={handlePublish}>
                  {!post.is_publish ? <MdPublish /> : <MdUnarchive />}
                </Button>
              </Tooltip>
              <Tooltip content={'Edit'} color={'primary'}>
                <Link href={`/admin/post/edit/${post.id}`}>
                  <Button color={'primary'} variant="faded" isIconOnly onClick={handlePublish}>
                    <MdModeEditOutline />
                  </Button>
                </Link>
              </Tooltip>
            </div>
          </Card>
        </div>
        <Card className="relative overflow-hidden">
          <div className="w-full h-52 relative">
            <Image src={post.thumbnail} alt={post.slug + '-thumb'} fill className="object-cover" />
          </div>
          <div className="px-4 py-8">
            <div>
              <p className="text-3xl font-semibold">{post.title}</p>
              <p className="text-base text-primary font-semibold">{dayjs(post.createdAt).format('DD MMMM YYYY')}</p>
              <p className="text-base">{post.meta_description}</p>
            </div>
            <Divider className="my-4" />
            <div></div>

            <Article body={post.body} />
          </div>
        </Card>
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

export default DetailPost;
