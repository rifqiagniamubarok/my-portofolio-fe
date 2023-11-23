import { Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';

const ImageCustom = ({ ...others }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = (e) => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Skeleton className="w-full h-full" />} <Image onLoad={handleLoading} {...others} />
    </>
  );
};

export default ImageCustom;
