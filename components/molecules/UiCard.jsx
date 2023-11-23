import { Card } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UiCard = ({ image, title, ...others }) => {
  return (
    <Link href={'#'} {...others}>
      <Card className="relative overflow-hidden shadow-lg shadow-primary cursor-pointer">
        <div className="relative w-full h-60 z-10 ">
          <div className="p-4 z-20 bg-gradient-to-t from-darkcard to-transparent text center absolute bottom-0 w-full ">
            <p className="text-base lg:text-lg font-semibold text-center hover:pb-4 hover:text-xl transition-all delay-100 ">UI For website</p>
          </div>
          <Image src={'/dummy/contohUi.png'} alt="images" fill className="object-cover" />
        </div>
      </Card>
    </Link>
  );
};

export default UiCard;
