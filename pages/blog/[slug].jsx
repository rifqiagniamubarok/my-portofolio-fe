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
  // Import library untuk parsing HTML (gunakan DOMParser untuk lingkungan browser)

  const parse = new DOMParser();

  const doc = parse.parseFromString(post.body, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h2, h3, h4, h5, h6'));

  console.log({ headings });

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

  const [activeHeading, setActiveHeading] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((heading) => ({
        id: heading.id,
        offsetTop: document.getElementById(heading.id).offsetTop,
      }));

      const scrollPosition = window.scrollY + 150; // Sesuaikan offset sesuai dengan kebutuhan

      const currentHeading = headingElements.filter((heading) => scrollPosition >= heading.offsetTop);

      if (currentHeading && activeHeading !== currentHeading[currentHeading.length - 1].id) {
        setActiveHeading(currentHeading[currentHeading.length - 1].id);
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
    <BasicLayout>
      <section className="pt-20 space-y-4 dark">
        <div className="relative w-full h-60 overflow-hidden rounded-md" data-aos="fade-up" data-aos-duration="500">
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
        <div data-aos="fade-up" data-aos-duration="2000" className="grid grid-cols-4 gap-x-6 relative">
          <div className="col-span-3">
            <article
              className="prose dark:prose-invert prose-headings:text-xl prose-headings:pt-1 prose-p:text-base lg:prose-xl prose-code:text-base prose-ol:text-base prose-ul:text-base prose-li:text-base prose-pre:text-base"
              dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
            ></article>
          </div>
          <div className="relative">
            <div className="sticky top-4">
              <p className="text-2xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Table of content</p>
              <div className="space-y-2">
                {toc.map((item) => (
                  <div key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setActiveHeading(item.id)}
                      className={classNames(item.id === activeHeading ? 'text-white' : 'text-gray-400', 'text-base')}
                    >
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
