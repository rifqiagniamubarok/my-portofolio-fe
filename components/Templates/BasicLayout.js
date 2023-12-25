import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import Footer from '../Organisms/Footer';
import { Button } from '@nextui-org/react';

const BasicLayout = ({ footer = false, children, container = true }) => {
  const getPath = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const pathLIst = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Blog',
      path: '/blog',
    },
    // {
    //   name: 'Project',
    //   path: '/project',
    // },
    {
      name: 'About',
      path: '/about',
    },
  ];

  const basicLayRef = useRef(null);

  const handleDarkMode = () => {
    const { classList } = basicLayRef.current;
    if (!isDarkMode) {
      classList.add('dark');
    } else {
      classList.remove('dark');
    }

    setIsDarkMode(!isDarkMode);
  };

  const pathActive = 'text-base md:text-lg bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text font-medium';
  const pathNotActive = 'text-base md:text-lg text-gray-600 dark:text-white';

  return (
    <div ref={basicLayRef} className="dark">
      <div className="min-h-screen bg-[#fff] dark:bg-darkcard  ">
        <div className="absolute top-0 z-50">
          <div className="w-screen h-1.5  bg-gradient-to-r from-primary to-light-primary"></div>
          <div className="md:container md:mx-auto px-8 lg:px-32">
            <div className="flex justify-between items-center  ">
              <div className="flex gap-4 text-darkcard py-3 ">
                {pathLIst.map(({ name, path }, index) => (
                  <div className={classNames(path !== '/' && getPath.includes(path) ? pathActive : path === '/' && getPath === '/' ? pathActive : pathNotActive)} key={index}>
                    <Link href={path}>
                      <p className="">{name}</p>
                    </Link>
                  </div>
                ))}
              </div>
              {/* <Button onClick={handleDarkMode}>Dark</Button> */}
            </div>
          </div>
        </div>
        <div className={classNames(container ? 'mx-8 md:container md:mx-auto lg:px-32' : '')}>{children}</div>
        {footer && <Footer />}
      </div>
    </div>
  );
};

export default BasicLayout;
