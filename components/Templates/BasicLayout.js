import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BasicLayout = ({ children }) => {
  const getPath = usePathname();
  const pathLIst = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
  ];

  const pathActive = 'text-base md:text-lg bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text font-medium';
  const pathNotActive = 'text-base md:text-lg text-white';
  return (
    <div className="min-h-screen bg-darkcard ">
      <div className="absolute top-0">
        <div className="w-screen h-1.5  bg-gradient-to-r from-primary to-light-primary"></div>
        <div className="flex gap-4 mx-8 md:container md:mx-auto py-3 ">
          {pathLIst.map(({ name, path }, index) => (
            <div className={classNames(path == getPath ? pathActive : pathNotActive)} key={index}>
              <Link href={path}>
                <p>{name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-8 md:container md:mx-auto">{children}</div>
    </div>
  );
};

export default BasicLayout;
