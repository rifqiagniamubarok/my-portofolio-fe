import BasicLayout from '@/components/Templates/BasicLayout';
import BlogCard from '@/components/molecules/BlogCard';
import { Card, Chip, Input, Pagination } from '@nextui-org/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Post = ({ posts: data, page_info }) => {
  const [posts, setPosts] = useState(data);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <BasicLayout>
      <section className="space-y-8 pt-20 dark pb-40">
        <div data-aos="fade-up" data-aos-duration="500">
          <p className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Blogs</p>
        </div>
        <div className="dark:text-white" data-aos="fade-up" data-aos-duration="1000">
          <Input label="Search" color="primary" variant="bordered" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-aos="fade-up" data-aos-duration="1500">
          {posts.map(({ thumbnail, title, slug, meta_description, tags: unclearTags }, index) => {
            const tags = unclearTags.map(({ name }) => name);
            return <BlogCard key={index} title={title} tags={tags} thumbnail={thumbnail} slug={slug} description={meta_description} />;
          })}
        </div>
        <div className={classNames(page_info.total_pages > 1 ? 'flex justify-center' : 'hidden')} data-aos-duration="2000">
          <Pagination showControls total={page_info.total_pages} initialPage={1} size="lg" />
        </div>
      </section>
    </BasicLayout>
  );
};

export async function getServerSideProps(context) {
  try {
    const {
      data: {
        data: { data, page_info },
      },
    } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/post`, {
      params: { page: 1, page_size: 9 },
    });

    const posts = data;
    return {
      props: { posts, page_info },
    };
  } catch (error) {
    return {
      props: { posts: [], page_info: {} },
    };
  }
}

export default Post;
