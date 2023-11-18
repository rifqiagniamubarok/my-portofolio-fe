import BasicLayout from '@/components/Templates/BasicLayout';
import { Divider } from '@nextui-org/react';
import axios from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const DetailBlog = ({ post: data }) => {
  const [post, setPost] = useState(data);
  const [activeHeading, setActiveHeading] = useState(null);

  const parse = new DOMParser();

  const doc = parse.parseFromString(post.body, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h2, h3, h4, h5, h6'));

  const toc = headings.map((heading, index) => {
    const headingText = heading.textContent;
    const headingId = `heading-${index}`;

    // Tambahkan anchor link ke heading
    heading.setAttribute('id', headingId);

    return {
      text: headingText,
      id: headingId,
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((heading) => {
        const targetElement = document.getElementById(heading.id);
        const { top } = targetElement.getBoundingClientRect();
        return {
          id: heading.id,
          offsetTop: top,
        };
      });

      const currentHeading = headingElements.filter((heading) => heading.offsetTop > 0);

      if (currentHeading && activeHeading !== currentHeading[0]?.id) {
        setActiveHeading(currentHeading[0]?.id);
      }
    };

    // Tambahkan event listener untuk scroll

    window.addEventListener('scroll', handleScroll);

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeHeading, headings]);

  return (
    <BasicLayout footer>
      <section className="pt-20 space-y-4 dark">
        <div className="relative w-full h-32 md:h-60 overflow-hidden rounded-md" data-aos="fade-up" data-aos-duration="500">
          <Image src={post.thumbnail} alt={post.slug + '-image'} fill className="object-cover" />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <p className="text-2xl md:text-4xl font-semibold text-white">{post.title}</p>
          <p className="text-base md:text-base text-gray-400 ">Written on {dayjs(post.createdAt).format('MMM DD, YYYY')} by Rifqi Agnia M.</p>
          <p className="text-base md:text-base text-gray-200 mt-2">{post.meta_description}</p>
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <div className="w-full h-0.5 bg-gradient-to-r from-primary to-light-primary"></div>
        </div>
        <div data-aos="fade-up" data-aos-duration="2000" className="grid grid-cols-1 md:grid-cols-4 gap-x-6 relative">
          <div className="md:col-span-3">
            <article
              className="prose dark:prose-invert prose-headings:text-xl prose-headings:pt-1 prose-p:text-base lg:prose-xl prose-code:text-base prose-ol:text-base prose-ul:text-base prose-li:text-base prose-pre:text-base"
              dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
            ></article>
          </div>
          <div className="hidden md:inline-block md:relative">
            <div className="sticky top-4">
              <p className="text-2xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Table of content</p>
              <div className="space-y-2">
                {toc.map((item) => (
                  <div key={item.id}>
                    <a href={`#${item.id}`} className={classNames(item.id === activeHeading ? 'text-white' : 'text-gray-400', 'text-base')}>
                      {item.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  try {
    const {
      data: { data },
    } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/post/${slug}`);

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

export default DetailBlog;
