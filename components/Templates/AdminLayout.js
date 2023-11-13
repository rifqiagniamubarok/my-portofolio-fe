'use client';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button, Switch } from '@nextui-org/react';
import { HiViewList } from 'react-icons/hi';
import { BiSolidLeftArrow } from 'react-icons/bi';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import React from 'react';
import Sidebar from '../Organisms/Sidebar';

const AdminLayout = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const sideBarRef = useRef(null);
  const mainRef = useRef(null);
  const pathname = usePathname();

  const handleToggleSideBar = () => {
    const { classList } = sideBarRef.current;
    if (!isNavOpen) {
      classList.remove('md:inline-block');
      classList.remove('hidden');
      setIsNavOpen(!isNavOpen);
    } else {
      classList.add('md:inline-block');
      classList.add('hidden');
      setIsNavOpen(!isNavOpen);
    }
  };

  const handleDarkMode = () => {
    const { classList } = mainRef.current;
    if (!isDarkMode) {
      classList.add('dark');
    } else {
      classList.remove('dark');
    }

    setIsDarkMode(!isDarkMode);
  };

  const pathList = [
    {
      name: 'Dashboard',
      path: '/admin',
    },
    {
      name: 'Profile',
      path: '/admin/profile',
    },
    {
      name: 'Social',
      path: '/admin/social',
    },
    {
      name: 'Post',
      path: '/admin/post',
    },
    {
      name: 'Create Post',
      path: '/admin/post/create',
    },
    {
      name: 'Tag',
      path: '/admin/post/tag',
    },
    {
      name: 'Photos',
      path: '/admin/photos',
    },
    {
      name: 'Icons',
      path: '/admin/icons',
    },
    {
      name: 'Experiences',
      path: '/admin/experiences',
    },
    {
      name: 'Work',
      path: '/admin/experiences/work',
    },
    {
      name: 'Education',
      path: '/admin/experiences/education',
    },
  ];

  const currentPath = pathList.find((path) => path.path == pathname);
  const currentPageName = currentPath?.name || 'No detect';

  return (
    <div className="" ref={mainRef}>
      <div className="bg-white dark:bg-gray-600  min-h-screen flex h-screen">
        <div className="hidden md:inline-block z-50" ref={sideBarRef}>
          <Sidebar path={pathname} />
        </div>
        <div className="overflow-auto w-full ">
          <div className="shadow px-2 py-1 md:px-5 md:py-2 dark:bg-darkcard flex justify-between">
            <div className="flex gap-2">
              <Button isIconOnly size="sm" className="md:hidden" onClick={handleToggleSideBar}>
                {isNavOpen ? <BiSolidLeftArrow /> : <HiViewList />}
              </Button>
              <p className="text-2xl font-semibold text-primary">{currentPageName}</p>{' '}
            </div>
            <Switch onValueChange={handleDarkMode} isSelected={isDarkMode} startContent={<BsFillSunFill />} endContent={<BsFillMoonFill />} size="sm"></Switch>
          </div>
          <div className="m-2 md:m-5">
            <main className="">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
