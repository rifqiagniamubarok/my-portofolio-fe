import { Card, Chip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogCard = ({ thumbnail, title, tags, description = '', slug = '' }) => {
  const maxLengthDescription = 120;
  const shortenedDescription = description.slice(0, maxLengthDescription);
  const displayDescription = description.length > maxLengthDescription ? `${shortenedDescription} ...` : description;

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="relative overflow-hidden shadow-lg shadow-primary cursor-pointer">
        <div className="relative w-full h-40  z-10 ">
          <div className="absolute bottom-2 right-2 flex z-20 gap-1">
            {tags.map((tag, index) => (
              <Chip size="sm" key={index}>
                {tag}
              </Chip>
            ))}
          </div>
          <Image src={thumbnail} alt="images" fill className="object-cover" />
        </div>
        <div className=" p-4 z-20 bg-darkcard">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-base bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text font-semibold">Nov 30, 2023</p>
          <p className="text-sm text-justify text-gray-50">{displayDescription}</p>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
