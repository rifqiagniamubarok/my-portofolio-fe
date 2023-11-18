import { Divider } from '@nextui-org/react';
import dayjs from 'dayjs';
import React from 'react';

const Footer = () => {
  return (
    <>
      <Divider className="mt-20" />
      <footer class=" md:container md:mx-auto lg:px-32 bg-white dark:bg-darkcard py-20">
        <div class="text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">&copy; {dayjs(new Date()).format('YYYY')}. Rifqi Agnia Mubarok. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
