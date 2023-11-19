import { useEffect, useRef } from 'react';
import BasicLayout from './BasicLayout';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ProjectLayout = ({ children }) => {
  const dividerStyle = 'w-1 h-10 bg-gray-400';
  const itemsStyle = 'text-5xl leading-none text-gray-400 cursor-pointer hover:text-white hover:scale-110 ease-in-out duration-300 uppercase	';

  const menuRef = useRef(null);
  const currentPath = usePathname();

  const itemList = [
    {
      name: 'ui',
      path: '/project/ui',
    },
    {
      name: 'ux',
      path: '/project/ux',
    },
    {
      name: 'fe',
      path: '/project/fe',
    },
    {
      name: 'be',
      path: '/project/be',
    },
  ];

  useEffect(() => {
    if (currentPath != '/project') {
      let { current } = menuRef;
      if (!current) return;
      const { classList } = current;
      classList.remove('mt-52');
      //   classList.remove('transition-margin');
      //   classList.add('transition-justify');
      //   classList.remove('justify-center');
    }
  }, [currentPath]);

  return (
    <BasicLayout>
      <section className="pt-20 space-y-4 dark min-h-screen">
        <div data-aos="fade-up" data-aos-duration="500">
          <p className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Projects</p>
        </div>
        <div>
          <div className=" w-full flex text-white justify-center gap-8 items-center mt-52 transition-margin ease-in-out duration-500" ref={menuRef}>
            {itemList.map(({ name, path }, index) => (
              <>
                <div key={name}>
                  <Link href={path}>
                    <p className={classNames(itemsStyle)}>{name}</p>
                  </Link>
                </div>
                <div className={classNames(dividerStyle, index === itemList.length - 1 && 'hidden')}></div>
              </>
            ))}
          </div>
        </div>
        <div>{children}</div>
      </section>
    </BasicLayout>
  );
};

export default ProjectLayout;
